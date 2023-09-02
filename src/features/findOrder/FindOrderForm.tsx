import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { FindOrderContext } from "../../pages/FindOrder";
function FindOrderForm() {
  const { register, handleSubmit, formState } = useForm<{
    phoneNumber: string;
  }>();
  const { errors } = formState;
  const { setphoneNumber } = useContext(FindOrderContext);

  const onSubmitHandler: SubmitHandler<{ phoneNumber: string }> = (data) => {
    setphoneNumber(data.phoneNumber);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col items-center gap-4"
    >
      <p className="text-lg font-bold md:text-3xl">Tìm kiếm đơn hàng của bạn</p>
      <div className="flex flex-col gap-2 md:gap-4">
        <label
          className=" text-sm font-bold  md:text-base lg:text-xl"
          htmlFor="phoneNumber"
        >
          Số điện thoại:
        </label>
        <input
          {...register("phoneNumber", {
            required: "vui lòng điền số điện thoại của bạn",
          })}
          id="phoneNumber"
          type="text"
          placeholder="nhập số điện thoại của bạn"
          className="w-[300px] rounded-md border bg-white px-4 py-3 shadow-sm transition-all duration-200 placeholder:left-0 placeholder:text-sm placeholder:italic focus:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600  focus:ring-opacity-70 disabled:bg-gray-300 md:w-[400px]"
        />
        {errors?.phoneNumber?.message ? (
          <p className="text-red-500">
            {errors?.phoneNumber?.message.toString()}
          </p>
        ) : undefined}
      </div>
      <button className="mb-4 rounded-md bg-blue-700 p-2 text-white">
        Tìm kiếm
      </button>
    </form>
  );
}

export default FindOrderForm;
