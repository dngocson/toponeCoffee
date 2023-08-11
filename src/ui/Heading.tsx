import { ReactNode } from "react";

const Heading = ({
  type,
  children,
  addStyle = "",
}: {
  type: string;
  addStyle?: string;
  children: ReactNode;
}) => {
  let style;
  if (type === "pri") style = "text-2xl font-bold";
  if (type === "sub") style = "text-lg uppercase";
  return <h2 className={`${style} ${addStyle}`}>{children}</h2>;
};

export default Heading;
