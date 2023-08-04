import { HiXMark } from "react-icons/hi2";
import { ModalOpenProps, ModalProps, ModalWindowProps } from "./type";
import {
  Dispatch,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { useOutsideClick } from "./useOutSideClick";
import { createPortal } from "react-dom";

interface ModalContextType {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
}

// Create a context object for the modal
const ModalContext = createContext<ModalContextType>({
  openName: "",
  close: () => undefined,
  open: () => undefined,
});

const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>

    // <div className="fixed left-0 top-0 z-50 h-screen w-full bg-[#FFFFFF1A] backdrop-blur-sm transition-all duration-500">
    //   <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#fff] p-12 shadow-lg transition-all duration-500">
    //     <button
    //       onClick={onClose}
    //       className="absolute right-7 top-5 translate-x-4 rounded-sm border-0 bg-transparent p-2 transition-all duration-200 hover:bg-gray-100"
    //     >
    //       <HiXMark size={25} />
    //     </button>
    //     {children}
    //   </div>
    // </div>
  );
};

function Open({ children, opens: opensWindowName }: ModalOpenProps) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: ModalWindowProps) {
  // Get the openName and close values from the ModalContext object
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);
  // If this Window component's name prop does not match the current value of openName, do not render anything
  if (name !== openName) return null;

  // Render the Window component by creating a portal that renders its content into a new DOM node that is appended to document.body
  return createPortal(
    <div className="fixed left-0 top-0 z-50 h-screen w-full bg-[#FFFFFF1A] backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#fff] p-12 shadow-lg transition-all duration-500"
        ref={ref}
      >
        <button onClick={close}>
          <HiXMark />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;