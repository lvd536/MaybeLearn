import { useCallback, useEffect } from "react";
import { client } from "../services/supabase";
import { createOrUpdateProfile, setNewPassword } from "../utils/profile";
import { useAuthStore } from "../stores/useAuthStore";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useNotifyStore } from "../stores/useNotifyStore";

export function useAuthListener() {
    const {
        setUser,
        setProfile,
        setCompletedCourses: setCourses,
        setCompletedTests: setTests,
    } = useAuthStore();
    const addNotify = useNotifyStore((state) => state.addNotification);

    const fetchUserData = useCallback(
        async (userId: string) => {
            try {
                const { data: profile, error: profileError } = await client
                    .from("profiles")
                    .select("*")
                    .eq("id", userId)
                    .single();

                if (profileError || !profile) {
                    console.error("Profile fetch error:", profileError);
                    setProfile(null);
                    return;
                }

                setProfile(profile);

                const [lessonsResult, testsResult] = await Promise.all([
                    client
                        .from("read_lessons")
                        .select("id", { count: "exact", head: true })
                        .eq("user_id", profile.id),
                    client
                        .from("completed_tests")
                        .select("id", { count: "exact", head: true })
                        .eq("user_id", profile.id),
                ]);
                setCourses(lessonsResult.count ?? 0);
                setTests(testsResult.count ?? 0);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        },
        [setProfile, setCourses, setTests]
    );

    const handleAuthStateChange = useCallback(
        async (event: AuthChangeEvent, session: Session | null) => {
            const user = session?.user ?? null;
            setUser(user);

            if (event === "SIGNED_IN" && user) {
                try {
                    const profile = await createOrUpdateProfile(user);
                    setProfile(profile ?? null);

                    await fetchUserData(user.id);
                } catch (err) {
                    console.error("Profile upsert/fetch failed", err);
                }
            }

            if (event === "SIGNED_OUT") {
                client.auth.signOut();
                setProfile(null);
                setTests(0);
                setCourses(0);
                addNotify({
                    id: new Date().getSeconds(),
                    type: "success",
                    description: "Signed Out!",
                    title: "Auth Info",
                });
            }

            if (event == "PASSWORD_RECOVERY") {
                const newPassword = prompt(
                    "Enter your new password (min 8 chars):"
                );
                if (newPassword && newPassword.length >= 8) {
                    await setNewPassword(newPassword);
                    addNotify({
                        id: Date.now(),
                        type: "success",
                        description: "Password updated successfully",
                        title: "Auth Info",
                    });
                } else if (newPassword) {
                    alert("Password is too short (min 8 chars).");
                }
            }
        },
        [setUser, setProfile, addNotify, setCourses, setTests, fetchUserData]
    );

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            const { data } = await client.auth.getUser();
            if (mounted) {
                setUser(data?.user ?? null);
                if (data?.user) {
                    await fetchUserData(data.user.id);
                }
            }
        };

        initAuth();

        const {
            data: { subscription },
        } = client.auth.onAuthStateChange(handleAuthStateChange);

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [handleAuthStateChange, setUser, fetchUserData]);
}
