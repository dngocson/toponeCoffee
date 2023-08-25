import OrderDetailByName from "../features/order/OrderDetailByName";

function OrderDetail() {
  return (
    <div className="container mx-auto min-h-screen w-min min-w-[340px] mediumPhone:min-w-[370px] largePhone:min-w-[400px]">
      <OrderDetailByName />
    </div>
  );
}

export default OrderDetail;
