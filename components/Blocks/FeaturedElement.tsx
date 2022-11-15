type Props<ElementType> = {
  blockName: string
  list: ElementType[]
  element: (elProps: ElementType) => JSX.Element
}

export const FeaturedElement = <ElementType,>({
  blockName,
  list,
  element,
}: Props<ElementType>) => {
  return (
    <div className="w-full mb-6">
      <h2 className="font-bold text-xl md:text-2xl tracking-tight mb-6">
        {blockName}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {list.map((el) => element(el)).filter(Boolean)}
      </div>
    </div>
  )
}
