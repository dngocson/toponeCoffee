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

const OrderDetailByName = ({
  name,
  viewer,
}: {
  name?: string;
  viewer?: string;
}) => {
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
    <div className=" flex min-w-[330px] flex-col gap-2">
      <h2 className="text-sm md:text-lg ">
        <span className="uppercase">Đơn hàng:</span>{" "}
        <span className="font-bold">{orderData.name}</span>
      </h2>
      {!name && (
        <InformationRow
          label="Trạng thái"
          value={convertOrderStatus(orderData.status)}
        />
      )}
      {
        <InformationRow
          label="Thời gian đặt hàng"
          value={convertDayVietNamese(orderData.created_at)}
        />
      }
      {orderData.address && (
        <InformationRow label="Địa chỉ giao hàng" value={orderData.address} />
      )}
      {hasLocation && name && viewer !== "customer" && (
        <a
          className="text-lg uppercase  text-blue-600"
          href={`https://www.google.com/maps/dir/?api=1&destination=${latNum},${lngNum}`}
          target="blank"
        >
          Tìm vị trí giao hàng
        </a>
      )}
      {
        <Heading addStyle="text-sm md:text-lg" type="sub">
          {viewer !== "customer" && (
            <div>
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
            </div>
          )}
          {viewer === "customer" && (
            <p>
              Số điện thoại:{" "}
              <span className="font-bold">{orderData.phoneNumber}</span>
            </p>
          )}
        </Heading>
      }
      {orderData.note && (
        <InformationRow label="Ghi chú" value={orderData.note} />
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
      <Heading addStyle="text-sm md:text-lg" type="sub">
        {label}: <span className="font-bold">{value}</span>
      </Heading>
    </>
  );
}
