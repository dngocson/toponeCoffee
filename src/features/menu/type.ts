import { MenuItemProps } from "../../ui/type";

export interface MenuOptionProps {
  value: string;
  label: string;
  type: string;
  childrens?: MenuOptionProps[];
}

export interface MenuItemListProps {
  type: string;
  data: MenuItemProps[];
  subType: string;
  message:string
}
