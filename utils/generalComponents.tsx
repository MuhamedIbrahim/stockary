export const ProductTitle = ({
  children,
  wordCount = 0,
}: {
  children: string[];
  wordCount: number;
}) => {
  if (wordCount === 0) {
    return <>{children.join(" ")}</>;
  } else {
    return <>{children.filter((_, indx) => indx < wordCount).join(" ")}...</>;
  }
};
