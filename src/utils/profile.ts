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

export async function setProfilePoints(value: number) {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    const { data, error } = await client.rpc("increment_points", {
        user_id: userId,
        value_to_add: value,
    });

    if (error) {
        console.error("setProfilePoints error:", error);
        return null;
    }

    return data;
}
