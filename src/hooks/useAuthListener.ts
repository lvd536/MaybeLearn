import { useCallback, useEffect } from "react";
import { client } from "../services/supabase";
import { createOrUpdateProfile, setNewPassword } from "../utils/profile";
import { useAuthStore } from "../stores/useAuthStore";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useNotifyStore } from "../stores/useNotifyStore";

export function useAuthListener() {
    const setUser = useAuthStore((s) => s.setUser);
    const setProfile = useAuthStore((s) => s.setProfile);
    const setCourses = useAuthStore((s) => s.setCompletedCourses);
    const setTests = useAuthStore((s) => s.setCompletedTests);
    const addNotify = useNotifyStore((state) => state.addNotification);
    const handleAuthStateChange = useCallback(
        (event: AuthChangeEvent, session: Session | null) => {
            const user = session?.user ?? null;
            setUser(user);
            const setUserProfile = async () => {
                const { data } = await client.auth.getUser();
                setUser(data?.user ?? null);
                if (data?.user) {
                    const { data: profile, error: profileError } = await client
                        .from("profiles")
                        .select("*")
                        .eq("id", data.user.id)
                        .single();

                    if (profileError || !profile) {
                        console.error("Profile fetch error:", profileError);
                        setProfile(null);
                        return;
                    }

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
                }
            };
            if (event === "SIGNED_IN" && user) {
                setTimeout(() => {
                    createOrUpdateProfile(user)
                        .then((profile) => {
                            setProfile(profile ?? null);
                        })
                        .catch((err) => {
                            console.error("profile upsert failed", err);
                        });
                }, 0);
            }

            if (event === "INITIAL_SESSION") {
                setTimeout(async () => {
                    await setUserProfile();
                }, 0);
            }

            if (event === "SIGNED_OUT") {
                setProfile(null);
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
                    setNewPassword(newPassword);
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
        [addNotify, setProfile, setUser, setCourses, setTests]
    );

    useEffect(() => {
        const { data } = client.auth.onAuthStateChange((event, session) =>
            handleAuthStateChange(event, session)
        );

        return () => {
            data.subscription.unsubscribe();
        };
    }, [handleAuthStateChange]);
}
