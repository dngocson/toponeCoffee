import LoginForm from "../features/user/LoginForm";

function Login() {
  return (
    <div className="container min-h-screen">
      <h2 className="py-5 text-center text-4xl font-bold md:text-5xl ">
        Trà sữa Top One
      </h2>

      <div className="mx-auto flex w-[60%] flex-col gap-4 rounded-xl bg-white px-10">
        <LoginForm />
      </div>
      <p className="p-4 text-center text-sm">
        Chức năng này đang trong thời gian phát triển, hiện tại chức năng này
        chỉ dành cho quản trị viên.
      </p>
    </div>
  );
}

export default Login;
