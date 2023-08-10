import { useParams } from "react-router-dom";
import { useGetOrderByName } from "./useGetOrderByName";
import Spinner from "../../ui/Spinner";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  convertOrderStatus,
  convertPhoneNumber,
} from "../../helper/helperFunctions";

const OrderDetailByName = () => {
  const { orderId } = useParams();
  const { isLoading, order, error } = useGetOrderByName(orderId!);
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center">
        Không thể lấy dữ liệu từ sever, hãy kiểm tra tên đơn hàng hoặc số điện
        thoại của bạn
      </h2>
    );
  const { orderData, orderedItemsData } = order as {
    orderData: any;
    orderedItemsData: any[];
  };
  const convertPhone = convertPhoneNumber(orderData.phoneNumber);
  const orderTime = format(
    new Date(orderData.created_at),
    "p EEE, 'ngày' dd MMM yyyy",
    {
      locale: vi,
    },
  );
  const h2Style = "text-lg uppercase";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <InformationRow label="Đơn hàng" value={orderData.name} />
        <span>/</span>
        <InformationRow
          label="Trạng thái"
          value={convertOrderStatus(orderData.status)}
        />
      </div>
      <InformationRow label="Thời gian đặt hàng" value={orderTime} />
      {orderData.address && (
        <InformationRow label="Địa chỉ giao hàng" value={orderData.address} />
      )}
      <h2 className={h2Style}>
        Số điện thoại:{" "}
        <a href={`tel:${convertPhone}`} className="font-bold text-blue-700">
          {orderData.phoneNumber}
        </a>{" "}
        /{" "}
        <a
          href={`https://zalo.me/${orderData.phoneNumber}`}
          className="font-bold text-blue-700"
          target="_blank"
        >
          Zalo
        </a>{" "}
      </h2>
    </div>
  );
};

export default OrderDetailByName;

function InformationRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <h2 className="text-lg uppercase">
        {label}: <span className="font-bold">{value}</span>
      </h2>
    </>
  );
}
