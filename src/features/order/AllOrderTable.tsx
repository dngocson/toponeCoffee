import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";
import Heading from "../../ui/Heading";
import Pagination, { PAGE_SIZE } from "../../ui/Pagination";
import SortBy from "../../ui/SortBy";
import Spinner from "../../ui/Spinner";
import AllOrderTableRow from "./AllOrderTableRow";
import { useGetAllOrder } from "./useGetAllOrder";

const addedStyle = "w-full font-bold text-center text-xs md:text-base";
function AllOrderTable() {
  const { isLoading, allOrder } = useGetAllOrder({
    admin: true,
    phoneNumber: null,
  });
  const [searchParams] = useSearchParams();
  let currentPage = searchParams.get("page") || "1";
  if (isLoading) return <Spinner />;
  const { allOrderData } = allOrder;

  return (
    <>
      <div className="my-8 flex items-center justify-between rounded-xl border border-blue-600">
        <Heading
          addStyle="uppercase ml-5 text-xs md:text-3xl hidden md:block"
          type="pri"
        >
          Tất cả đơn hàng
        </Heading>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Filter
              filterField="status"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "pending", label: "Chờ xác nhận" },
                { value: "confirmed", label: "Đã xác nhận" },
                { value: "completed", label: "Đã hoàn thành" },
              ]}
            />
          </div>

          <SortBy
            options={[
              { value: "created_at-desc", label: "ngày tạo(gần nhất trước)" },
              { value: "created_at-asc", label: "ngày tạo(xa nhất trước)" },
              {
                value: "totalPrice-desc",
                label: "Giá trị đơn(giảm dần)",
              },
              { value: "totalPrice-asc", label: "giá trị đơn(tăng dần)" },
            ]}
          />
        </div>
      </div>
      <div className="my-8 block rounded-md border border-blue-600 md:hidden">
        <Filter
          filterField="status"
          options={[
            { value: "all", label: "Tất cả" },
            { value: "pending", label: "Chờ xác nhận" },
            { value: "confirmed", label: "Đã xác nhận" },
            { value: "completed", label: "Đã hoàn thành" },
          ]}
        />
      </div>
      <div className="flex flex-col ">
        <div className=" inline-grid grid-cols-adminOrderTable items-center border-2 border-blue-500">
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
            chi tiết
          </Heading>
          <Heading addStyle={addedStyle} type="sub">
            Cập nhật
          </Heading>
        </div>
        {allOrderData.map((order, index) => (
          <div key={order.id}>
            <AllOrderTableRow
              index={(Number(currentPage) - 1) * PAGE_SIZE + index + 1}
              order={order}
            />
          </div>
        ))}
        <Pagination count={allOrder?.count || 0} />
      </div>
    </>
  );
}

export default AllOrderTable;
