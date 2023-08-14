import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserProps } from "./type";
function LoginForm() {
  const { register, handleSubmit, reset, watch, formState, getValues } =
    useForm<UserProps>();
  const { errors } = formState;
  return (
    <form>
      <div className="flex flex-col items-center justify-center gap-4 ">
        <div className="flex flex-col gap-4 ">
          <label className="" htmlFor="email">
            Tên đăng nhập
          </label>
          <input
            // disabled={isWorking}
            className="w-[300px] rounded-md border bg-white px-4 py-3 shadow-sm transition-all duration-200 placeholder:left-0 placeholder:text-sm placeholder:italic focus:border-blue-600 focus:outline-none focus:ring  focus:ring-blue-600 focus:ring-opacity-70 disabled:bg-gray-300"
            type="text"
            id="email"
            placeholder="Nhập tên đăng nhập của bạn"
            {...register("email", {
              required: "Hãy điền thông tin",
            })}
          />
        </div>
        <div>
          {errors?.email?.message ? (
            <p className="text-red-500">{errors?.email?.message.toString()}</p>
          ) : undefined}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-4">
          <label className="" htmlFor="password">
            Mật khẩu
          </label>
          <input
            // disabled={isWorking}
            className="w-[300px] rounded-md border bg-white px-4 py-3 shadow-sm transition-all duration-200 placeholder:left-0 placeholder:text-sm placeholder:italic focus:border-blue-600 focus:outline-none focus:ring  focus:ring-blue-600 focus:ring-opacity-70 disabled:bg-gray-300"
            type="text"
            placeholder="Nhập mật khẩu của bạn"
            id="password"
            {...register("password", {
              required: "Hãy điền thông tin",
            })}
          />
        </div>
        <div>
          {errors?.password?.message ? (
            <p className="text-red-500">
              {errors?.password?.message.toString()}
            </p>
          ) : undefined}
        </div>
        <button className="btn_g mx-auto">Đăng nhập</button>
      </div>
    </form>
  );
}

export default LoginForm;
