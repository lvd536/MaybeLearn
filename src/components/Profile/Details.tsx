import CompletionSection from "./CompletionHistory/CompletionSection";
import Stats from "./Stats";

export default function Details() {
    return (
        <>
            <Stats />
            <CompletionSection type="course" key={"course"} />
            <CompletionSection type="test" key={"test"} />
        </>
    );
}
