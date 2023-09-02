import Heading from "../../ui/Heading";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import AllOrderTableRow from "../order/AllOrderTableRow";
import { useContext } from "react";
import { FindOrderContext } from "../../pages/FindOrder";
import Pagination, { PAGE_SIZE } from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { useGetAllOrder } from "../order/useGetAllOrder";
import Spinner from "../../ui/Spinner";
const addedStyle = "w-full font-bold text-center text-xs md:text-base";
function FindOrderList() {
  const [searchParams] = useSearchParams();
  let currentPage = searchParams.get("page") || "1";
  const { phoneNumber } = useContext(FindOrderContext);
  const { allOrder, isInitialLoading } = useGetAllOrder({
    admin: false,
    phoneNumber,
  });
  if (isInitialLoading) return <Spinner />;
  const { allOrderData } = allOrder;
  if (allOrderData.length === 0 && phoneNumber === "") return null;
  return (
    <div>
      <div className=" ml-auto flex w-min items-center justify-between border-2  border-blue-600 md:w-auto  md:border-b-0">
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

          <div>
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
      </div>
      <div className="my-2 block border-2 border-blue-600 md:my-8 md:hidden">
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
        <div className=" inline-grid grid-cols-customerOrderTable items-center border-2 border-blue-500">
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
        </div>
        {allOrderData.length === 0 ? (
          <div className=" grid-cols-customerOrderTable border-2 border-t-0 border-blue-500 text-center">
            <p>
              Không thể tìm thấy thông tin trên server, vui lòng kiểm tra lại
              thông tin của bạn
            </p>
          </div>
        ) : null}
        {allOrderData &&
          allOrderData.map((order, index) => (
            <div key={order.id}>
              <AllOrderTableRow
                index={(Number(currentPage) - 1) * PAGE_SIZE + index + 1}
                order={order}
                viewer="customer"
              />
            </div>
          ))}
        <Pagination count={allOrder?.count || 0} />
      </div>
    </div>
  );
}

export default FindOrderList;
