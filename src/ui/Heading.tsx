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
  let style: string = "";
  if (type === "pri") style = "text-3xl font-bold";
  if (type === "sub") style = "text-lg uppercase";
  return <h2 className={` ${style} ${addStyle}`}>{children}</h2>;
};

export default Heading;
