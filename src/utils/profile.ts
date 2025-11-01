import { client } from "../services/supabase";
import type { User } from "@supabase/supabase-js";

export async function createOrUpdateProfile(user: User) {
    if (!user?.id) return null;

    const profile = {
        id: user.id,
        display_name: user.user_metadata?.username ?? null,
    };

    const { data, error } = await client
        .from("profiles")
        .upsert(profile)
        .select()
        .single();

    if (error) {
        console.error("createOrUpdateProfile error", error);
        throw error;
    }
    return data;
}
