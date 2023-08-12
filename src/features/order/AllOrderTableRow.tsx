import { useState } from "react";
import OrderDetailByName from "./OrderDetailByName";
import Heading from "../../ui/Heading";
import {
  convertDayVietNameseShort,
  convertOrderStatus,
  convertPhoneNumber,
} from "../../helper/helperFunctions";

interface OrderProps {
  id: number;
  created_at: any;
  totalPrice: number;
  status: string;
  note: string;
  phoneNumber: string;
  totalQuantity: number;
  address: string;
  name: string;
}
function AllOrderTableRow({
  order,
  index,
}: {
  order: OrderProps;
  index: number;
}) {
  const [showDetail, setShowDetail] = useState(false);

  function onClickHandler() {
    setShowDetail((show) => !show);
  }
  return (
    <div>
      <div className="grid  grid-cols-adminOrderTable border-2 border-t-0 border-blue-400 text-center">
        <Heading addStyle="w-full text-center" type="sub">
          {index}
        </Heading>
        <Heading type="sub">
          {convertDayVietNameseShort(order.created_at)}
        </Heading>
        <Heading type="sub">{convertOrderStatus(order.status)}</Heading>
        <Heading type="sub">
          <a
            href={`tel:${convertPhoneNumber(order.phoneNumber)}`}
            className="font-bold text-blue-700"
          >
            {order.phoneNumber}
          </a>{" "}
          /{" "}
          <a
            href={`https://zalo.me/${order.phoneNumber}`}
            className="font-bold text-blue-700"
            target="_blank"
          >
            Zalo
          </a>
        </Heading>
        <button
          className="text-lg font-bold uppercase text-blue-700"
          onClick={onClickHandler}
        >
          {!showDetail ? "Hiện" : "ẩn"}
        </button>
      </div>

      {showDetail && (
        <div className="mt-2 flex flex-col gap-2">
          <OrderDetailByName name={order.name} />
        </div>
      )}
    </div>
  );
}

export default AllOrderTableRow;
