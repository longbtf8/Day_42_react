import { useForm } from "react-hook-form";
import { useGetCurrentUserQuery, useLoginMutation } from "../../services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const schemaLogin = zod.object({
  email: zod.email("Email không hợp lệ !"),
  password: zod.string().min(4, "Mật khẩu phải lớn hơn 4 kí tự"),
});
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaLogin) });
  const [requestLogin, response] = useLoginMutation();

  const { isSuccess } = useGetCurrentUserQuery();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [navigate, isSuccess]);

  useEffect(() => {
    if (response.isSuccess) {
      const { access_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      navigate("/");
    }
  }, [response, navigate]);

  const handleLogin = (data) => {
    requestLogin(data);
    console.log(data);
  };
  return (
    <>
      <h1 className="p-4 text-2xl text-blue-400">Đăng Nhập</h1>
      <form className="p-4" onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label htmlFor="email">
            <span className="pr-2 cursor-pointer">Email :</span>
            <input
              id="email"
              className="border-2 px-0.5 "
              placeholder="Nhập email... "
              {...register("email")}
            />
          </label>
          <p className="h-3 text-red-600 my-2">{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">
            <span className="pr-2 cursor-pointer">Password :</span>
            <input
              id="password"
              type="password"
              className="border-2 px-0.5 "
              placeholder="Nhập password... "
              {...register("password")}
            />
          </label>
          <p className="h-3 text-red-600 my-3">
            {errors.password?.message}
            {response.error ? "Thông Tin Không Hợp Lệ" : ""}
          </p>
        </div>
        <div className="pt-2">
          <button
            className={`
               bg-blue-400
             border-2 p-0.5 rounded-xl cursor-pointer `}
          >
            Đăng Nhập
          </button>
        </div>
      </form>
    </>
  );
};
export default Login;
