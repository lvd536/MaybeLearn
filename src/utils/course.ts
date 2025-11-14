import { client } from "../services/supabase";
import { fetchCourses } from "../stores/Catalog/useCoursesStore";
import type { ICourseData } from "../types";
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

    setProfilePoints(points);

    if (error) {
        console.error("sendCourseCompletionData error", error);
        throw error;
    }
    return data;
}

export async function getCourseCompletionData() {
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

    if (result) console.log("good");
    else console.warn("setNewCourseError!");
}
