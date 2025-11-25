import { client } from "../services/supabase";
import { fetchTests } from "../stores/Catalog/useTestsStore";
import type { ICompletedItem, ITestData } from "../types";
import { setProfileElo } from "./profile";

export async function sendTestCompletionData(testId: number, elo: number) {
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
        console.error("sendTestCompletionData error", error);
        throw error;
    }
    setProfileElo(elo);
    return data;
}

export async function getTestCompletionData(): Promise<ICompletedItem[] | null> {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    const { data, error } = await client
        .from("completed_tests")
        .select("*")
        .eq("user_id", userId);

    if (error) console.error("getTestCompletionData error", error);

    return data;
}

export async function updateTestById(data: ITestData, testId: number) {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    await client
        .from("tests")
        .update({ data: data })
        .eq("id", testId)
        .then(() => fetchTests());
}

export async function addNewTest(data: ITestData) {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    const result = await client
        .from("tests")
        .insert({
            author_id: userId,
            data: data,
            created_at: new Date().toISOString(),
        })
        .then(() => fetchTests());

    if (result) console.log("good");
    else console.warn("setNewTestError!");
}
