import { useEffect } from "react";
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
    const handleAuthStateChange = (
        event: AuthChangeEvent,
        session: Session | null
    ) => {
        const user = session?.user ?? null;
        setUser(user);

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

        if (event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
            [window.localStorage, window.sessionStorage].forEach((storage) => {
                Object.entries(storage).forEach(([key]) => {
                    storage.removeItem(key);
                });
            });
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
                "What would you like your new password to be?"
            );
            if (newPassword) {
                if (newPassword.length >= 8) {
                    setNewPassword(newPassword);
                    addNotify({
                        id: new Date().getSeconds(),
                        type: "success",
                        description: "Password Set! Your password updated",
                        title: "Auth Info",
                    });
                } else alert("Min password length = 8");
            } else alert("Password recovery failed. Please try again");
        }
    };

    const setUserProfile = async () => {
        const { data } = await client.auth.getUser();
        setUser(data?.user ?? null);
        if (data?.user) {
            const { data: profile } = await client
                .from("profiles")
                .select("*")
                .eq("id", data.user.id)
                .single();
            setProfile(profile ?? null);

            const { data: lessons } = await client
                .from("read_lessons")
                .select("id")
                .eq("user_id", profile.id);
            setCourses(lessons?.length ?? 0);

            const { data: tests } = await client
                .from("completed_tests")
                .select("id")
                .eq("user_id", profile.id);
            setTests(tests?.length ?? 0);
        }
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (mounted) {
                await setUserProfile();
                mounted = false;
            }
        })();

        const { data } = client.auth.onAuthStateChange((event, session) =>
            handleAuthStateChange(event, session)
        );

        return () => {
            data.subscription.unsubscribe();
        };
    });
}
