import { CodeBlock, dracula } from "react-code-blocks";

type CodeNodeProps = {
    code: string;
    language: string;
    showLineNumbers: boolean;
    startingLineNumber: number;
};

export default function CodeNode({
    code,
    language,
    showLineNumbers,
    startingLineNumber,
}: CodeNodeProps) {
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
