import { CodeBlock, dracula } from "react-code-blocks";
export default function CodeNode({
    code,
    language,
    showLineNumbers,
    startingLineNumber,
}: {
    code: string;
    language: string;
    showLineNumbers: boolean;
    startingLineNumber: number;
}) {
    return (
        <CodeBlock
            text={code}
            language={language}
            showLineNumbers={showLineNumbers}
            startingLineNumber={startingLineNumber}
            theme={dracula}
        />
    );
}
