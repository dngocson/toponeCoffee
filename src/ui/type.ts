import { ReactElement, ReactNode } from "react";

export interface CarouselProps {
  id: number;
  label: string;
  img: string;
}
export interface MenuItemProps {
  type: string;
  id?: number;
  price: number;
  name: string;
  description: string;
  promotion: string;
  image?: any;
}
// Type for Modal
export interface ModalProps {
  children?: ReactNode;
}

export interface ModalOpenProps {
  children: ReactElement;
  opens: string;
}

export interface ModalWindowProps {
  children: ReactElement;
  name: string;
}

export interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
