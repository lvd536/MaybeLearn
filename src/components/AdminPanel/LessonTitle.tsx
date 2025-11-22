type LessonTitleProps = {
    children: React.ReactNode;
};

export default function LessonTitle({ children }: LessonTitleProps) {
    return (
        <h3 className="text-xs sm:text-base self-center mt-5">{children}</h3>
    );
}
