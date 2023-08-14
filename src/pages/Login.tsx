import Heading from "../ui/Heading";
import LoginForm from "../features/user/LoginForm";

function Login() {
  return (
    <div className="container">
      <div className="mx-auto flex w-[60%] flex-col gap-4 rounded-xl bg-white p-10">
        <Heading addStyle="text-center" type="pri">
          Trà sữa Top One
        </Heading>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
