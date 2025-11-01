import { useEffect } from "react";
import { client } from "../services/supabase";
import { createOrUpdateProfile } from "../utils/profile";
import { useAuthStore } from "../stores/useAuthStore";

export function useAuthListener() {
    const setUser = useAuthStore((s) => s.setUser);
    const setProfile = useAuthStore((s) => s.setProfile);

    useEffect(() => {
        (async () => {
            const { data } = await client.auth.getUser();
            setUser(data?.user ?? null);
            if (data?.user) {
                const { data: profile } = await client
                    .from("profiles")
                    .select("*")
                    .eq("id", data.user.id)
                    .single();
                setProfile(profile ?? null);
            }
        })();

        const { data } = client.auth.onAuthStateChange((event, session) => {
            const user = session?.user ?? null;
            setUser(user);

            if (event === "SIGNED_IN" && user) {
                setTimeout(() => {
                    createOrUpdateProfile(user)
                        .then((profile) => setProfile(profile ?? null))
                        .catch((err) => {
                            console.error("profile upsert failed", err);
                        });
                }, 0);
            }

            if (event === "SIGNED_OUT") {
                setProfile(null);
            }
        });

        return () => {
            data.subscription.unsubscribe();
        };
    }, [setUser, setProfile]);
}
