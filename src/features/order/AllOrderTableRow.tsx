import OrderDetailByName from "./OrderDetailByName";
import Heading from "../../ui/Heading";
import {
  convertDayVietNameseShort,
  convertOrderStatus,
  convertPhoneNumber,
} from "../../helper/helperFunctions";
import Modal from "../../ui/Modal";
import UpdateOrderStatus from "./UpdateOrderStatus";

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
  return (
    <div>
      <div className="grid grid-cols-adminOrderTable border-2 border-t-0 border-blue-500 text-center">
        <Heading
          addStyle="w-full text-center text-xs md:text-base my-auto"
          type="sub"
        >
          {index}
        </Heading>
        <Heading type="sub" addStyle="text-xs md:text-base my-auto">
          {convertDayVietNameseShort(order.created_at)}
        </Heading>
        <Heading
          addStyle={`${
            order.status === "pending"
              ? "text-red-500"
              : order.status === "confirmed"
              ? "text-green-500"
              : "text-yellow-700"
          } text-xs md:text-base my-auto`}
          type="sub"
        >
          {convertOrderStatus(order.status)}
        </Heading>
        <Heading type="sub" addStyle="text-xs md:text-base my-auto">
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
        <Modal>
          <Modal.Open opens="order">
            <button className="my-auto  rounded-md text-xs font-bold uppercase text-blue-700 md:text-base">
              Hiện thông tin
            </button>
          </Modal.Open>
          <Modal.Window name="order">
            <OrderDetailByName name={order.name} />
          </Modal.Window>
          <Modal.Open opens="orderType">
            <button className="my-auto  rounded-md text-xs font-bold uppercase text-blue-700 md:text-base">
              Cập nhật
            </button>
          </Modal.Open>
          <Modal.Window name="orderType">
            <UpdateOrderStatus id={order.id} currentValue={order.status} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default AllOrderTableRow;
