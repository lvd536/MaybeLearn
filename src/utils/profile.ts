import { client } from "../services/supabase";
import type { User } from "@supabase/supabase-js";
import type { IEditForm } from "../types";

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

export async function updateProfile(profile: IEditForm) {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;
    const avatar = await client
        .from("profiles")
        .update({
            avatar_url: profile.avatar_url,
        })
        .eq("id", userId);
    console.log(avatar);
    if (profile.display_name) {
        const user = await client.auth.getUser();
        if (!user) return;
        await client.auth.updateUser({
            data: {
                username: profile.display_name,
            },
        });
        const name = await client
            .from("profiles")
            .update({
                display_name: profile.display_name,
            })
            .eq("id", userId);
        console.log(name);
    }
    if (profile.bio) {
        const bio = await client
            .from("profiles")
            .update({
                bio: profile.bio,
            })
            .eq("id", userId);
        console.log(bio);
    }
}
