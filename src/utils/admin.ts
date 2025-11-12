import { client } from "../services/supabase";
import type {
    IAdminInfo,
    IAPIError,
    ICourse,
    IProfileType,
    ITest,
} from "../types";

export async function getAdminInfo() {
    const {
        data: courses,
        error: coursesError,
    }: { data: ICourse[] | null; error: IAPIError | null } = await client
        .from("lessons")
        .select("*");

    const {
        data: tests,
        error: testsError,
    }: { data: ITest[] | null; error: IAPIError | null } = await client
        .from("tests")
        .select("*");

    const {
        data: users,
        error: usersError,
    }: { data: IProfileType[] | null; error: IAPIError | null } = await client
        .from("profiles")
        .select("*");
    if (coursesError || testsError || usersError) {
        console.error(
            "Error fetching data:",
            coursesError || testsError || usersError
        );
    }
    if (courses && tests && users) {
        const data: IAdminInfo = {
            courses: courses.length,
            tests: tests.length,
            users: users.length,
        };
        return data;
    }
}
