import FindOrderForm from "../features/findOrder/FindOrderForm";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import FindOrderList from "../features/findOrder/FindOrderList";
interface FindOrderContextProps {
  phoneNumber: string;
  setphoneNumber: Dispatch<SetStateAction<any>>;
}
export const FindOrderContext = createContext<FindOrderContextProps>({
  phoneNumber: "",
  setphoneNumber: () => undefined,
});

function FindOrder() {
  const [phoneNumber, setphoneNumber] = useState<string>("");
  const store = { phoneNumber, setphoneNumber };
  return (
    <FindOrderContext.Provider value={store}>
      <div className="container min-h-screen p-1">
        <FindOrderForm />
        <FindOrderList />
      </div>
    </FindOrderContext.Provider>
  );
}

export default FindOrder;
