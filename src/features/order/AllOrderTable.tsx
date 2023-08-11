import Heading from "../../ui/Heading";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import AllOrderTableRow from "./AllOrderTableRow";
import { useGetAllOrder } from "./useGetAllOrder";

const addedStyle = "w-full font-bold text-center";
function AllOrderTable() {
  const { isLoading, allOrder } = useGetAllOrder();
  if (isLoading) return <Spinner />;
  const { allOrderData } = allOrder;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-adminOrderTable border-2 border-blue-500">
        <Heading addStyle={addedStyle} type="sub">
          STT
        </Heading>
        <Heading addStyle={addedStyle} type="sub">
          Tạo lúc
        </Heading>
        <Heading addStyle={addedStyle} type="sub">
          Trạng thái
        </Heading>
        <Heading addStyle={addedStyle} type="sub">
          Số điện thoại
        </Heading>
        <Heading addStyle={addedStyle} type="sub">
          Xem chi tiết
        </Heading>
        <Heading addStyle={addedStyle} type="sub">
          Cập nhật
        </Heading>
      </div>
      {allOrderData.map((order, index) => (
        <div key={order.id}>
          <AllOrderTableRow index={index + 1} order={order} />
        </div>
      ))}
      <Pagination count={allOrder?.count || 0} />
    </div>
  );
}

export default AllOrderTable;
