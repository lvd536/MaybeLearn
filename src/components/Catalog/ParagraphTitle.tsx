type ParagraphTitleProps = {
  children: React.ReactNode;
}

export default function ParagraphTitle({children}: ParagraphTitleProps) {
  return (
    <h2 className="font-bold text-xl">{children}</h2>
  )
}
