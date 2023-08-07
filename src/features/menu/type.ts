import { MenuItemProps } from "../../ui/type";

export interface MenuOptionProps {
  value: string;
  label: string;
  type: string;
  childrens?: MenuOptionProps[];
}

export interface MenuItemListProps {
  type: string | null;
  subType: string | null;
  data: MenuItemProps[];
  message: string;
}
