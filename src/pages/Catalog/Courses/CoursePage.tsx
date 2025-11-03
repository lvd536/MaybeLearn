import ModuleTitle from "../../../components/Catalog/ModuleTitle";
import NavItem from "../../../components/Catalog/Courses/NavItem";
import Text from "../../../components/Catalog/Text";
import HomeCode from "../../../assets/HomeCode.png";
import ParagraphTitle from "../../../components/Catalog/ParagraphTitle";

export default function CoursePage() {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col w-1/6 gap-4">
                <NavItem>Module 1: Introduction to Python</NavItem>
                <NavItem>Module 2: Data Structures</NavItem>
                <NavItem>Module 3: Algorithms</NavItem>
                <NavItem>Module 4: Object-Oriented Programming</NavItem>
            </div>
            <div className="flex flex-col w-5/6 gap-4">
                <ModuleTitle>Introduction to Python</ModuleTitle>
                <Text>
                    In this lesson, we'll cover the fundamental syntax of
                    Python, including indentation, comments, and basic
                    statements. Understanding these concepts is crucial for
                    writing clean and effective Python code.
                </Text>
                <img
                    src={HomeCode}
                    alt=""
                    className="rounded-xl w-120 self-start"
                />
                <ParagraphTitle>Indentation</ParagraphTitle>
                <Text>
                    Python uses indentation to define code blocks, instead of
                    curly braces or keywords. Consistent indentation is
                    essential for code readability and correct execution. Each
                    level of indentation typically consists of four spaces.
                </Text>
                <ParagraphTitle>Comments</ParagraphTitle>
                <Text>
                    Comments are used to explain code and are ignored by the
                    interpreter. In Python, comments start with the '#' symbol
                    and continue until the end of the line.
                </Text>
                <ParagraphTitle>Basic Statements</ParagraphTitle>
                <Text>
                    Basic statements in Python include variable assignments,
                    print statements, and simple expressions. These form the
                    building blocks of more complex programs.
                </Text>
                <ParagraphTitle>Quiz</ParagraphTitle>
                <Text>
                    Test your understanding of Python's basic syntax with the
                    following quiz.
                </Text>
            </div>
        </div>
    );
}
