import { client } from "../services/supabase";
import { fetchCourses } from "../stores/Catalog/useCoursesStore";
import { useAuthStore } from "../stores/useAuthStore";
import type { ICompletedItem, ICourseData } from "../types";
import { setProfilePoints } from "./profile";

export async function sendCourseCompletionData(
    lesson_id: number,
    points: number
) {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    const { data: existingData } = await client
        .from("read_lessons")
        .select("*")
        .eq("user_id", userId)
        .eq("lesson_id", lesson_id)
        .single();

    if (existingData) return existingData;

    const { data, error } = await client
        .from("read_lessons")
        .insert({
            user_id: userId,
            lesson_id: lesson_id,
        })
        .select()
        .single();

    if (error) {
        console.error("sendCourseCompletionData error", error);
        throw error;
    }
    setProfilePoints(points);
    useAuthStore.getState().increaseCoursesCompletion(1);
    return data;
}

export async function getCourseCompletionData(): Promise<ICompletedItem[] | null> {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    const { data, error } = await client
        .from("read_lessons")
        .select("*")
        .eq("user_id", userId);

    if (error) console.error("getCourseCompletionData error", error);

    return data;
}

export async function updateCourseById(data: ICourseData, courseId: number) {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    await client
        .from("lessons")
        .update({ data: data })
        .eq("id", courseId)
        .then(() => fetchCourses());
}

export async function addNewCourse(data: ICourseData) {
    const userId = (await client.auth.getUser()).data.user?.id;
    if (!userId) return null;

    const result = await client
        .from("lessons")
        .insert({
            author_id: userId,
            data: data,
            created_at: new Date().toISOString(),
        })
        .then(() => fetchCourses());

    if (!result) console.warn("setNewCourseError!");
}
