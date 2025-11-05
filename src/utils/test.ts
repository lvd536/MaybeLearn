import { client } from "../services/supabase";

export async function sendTestCompletionData(testId: number) {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    const { data: existingData } = await client
        .from("completed_tests")
        .select("*")
        .eq("user_id", userId)
        .eq("test_id", testId)
        .single();

    if (existingData) return existingData;

    const { data, error } = await client
        .from("completed_tests")
        .insert({
            user_id: userId,
            test_id: testId,
        })
        .select()
        .single();

    if (error) {
        console.error("createOrUpdateProfile error", error);
        throw error;
    }
    return data;
}
