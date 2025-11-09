type DescriptionProps = {
  children: string
}

export default function Description({children}: DescriptionProps) {
  return (
    <span className="font-normal text-sm text-card">{children}</span>
  )
}
