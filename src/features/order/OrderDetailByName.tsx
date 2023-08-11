import { useParams } from "react-router-dom";
import { useGetOrderByName } from "./useGetOrderByName";
import Spinner from "../../ui/Spinner";
import {
  convertDayVietNamese,
  convertOrderStatus,
  convertPhoneNumber,
  formatCurrencyNumber,
} from "../../helper/helperFunctions";
import { OrderByNameDetail } from "./OrderByNameDetail";
import Heading from "../../ui/Heading";

const OrderDetailByName = ({ name }: { name?: string }) => {
  let { orderId } = useParams();
  if (name) orderId = name;
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
  const [lat, lng] = orderData.location.split("-");
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  const hasLocation = latNum !== 0 && lngNum !== 0;
  return (
    <div className="flex flex-col gap-2">
      {!name && <InformationRow label="Đơn hàng" value={orderData.name} />}
      {!name && (
        <InformationRow
          label="Trạng thái"
          value={convertOrderStatus(orderData.status)}
        />
      )}
      {!name && (
        <InformationRow
          label="Thời gian đặt hàng"
          value={convertDayVietNamese(orderData.created_at)}
        />
      )}
      {orderData.address && (
        <InformationRow label="Địa chỉ giao hàng" value={orderData.address} />
      )}
      {hasLocation && (
        <a
          className="text-lg uppercase text-blue-600"
          href={`https://www.google.com/maps/dir/?api=1&destination=${latNum},${lngNum}`}
          target="blank"
        >
          Tìm vị trí giao hàng
        </a>
      )}
      {!name && (
        <Heading type="sub">
          Số điện thoại:{" "}
          <a
            href={`tel:${convertPhoneNumber(orderData.phoneNumber)}`}
            className="font-bold text-blue-700"
          >
            {orderData.phoneNumber}
          </a>{" "}
          /{" "}
          <a
            href={`https://zalo.me/${orderData.phoneNumber}`}
            className="font-bold text-blue-700"
            target="_blank"
          >
            Zalo
          </a>
        </Heading>
      )}
      <OrderByNameDetail
        items={orderedItemsData.sort((a, b) => b.quantity - a.quantity)}
      />
      <InformationRow
        label="Tổng hóa đơn"
        value={formatCurrencyNumber(orderData.totalPrice.toString())}
      />
    </div>
  );
};

export default OrderDetailByName;

function InformationRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <Heading type="sub">
        {label}: <span className="font-bold">{value}</span>
      </Heading>
    </>
  );
}