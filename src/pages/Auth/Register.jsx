import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

const registerSchema = zod
  .object({
    fullname: zod
      .string("")
      .min(3, "Họ và tên phải lớn hơn 3 kí tự")
      .max(100, "Họ và tên phải nhỏ hơn 100 kí tự")
      .refine((value) => value.trim().includes(" "), {
        error:
          "Vui lòng nhập đầy đủ họ và tên (phải có ít nhất một khoảng trắng)",
      }),
    email: zod.email("Email không hợp lệ !"),
    password: zod.string().min(4, "Mật khẩu phải lớn hơn 4 kí tự"),
    confirmPassword: zod.string().min(4, "Mật khẩu phải lớn hơn 4 kí tự"),
  })
  // Áp dụng refine() ở cấp độ đối tượng
  .refine((data) => data.password === data.confirmPassword, {
    // Thông báo lỗi nếu validation thất bại
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    // Trường hiện lỗi
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [RequestRegister, response] = useRegisterMutation();

  useEffect(() => {
    if (response.isSuccess) {
      const { access_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      navigate("/");
    }
  }, [navigate, response]);

  const splitFullName = (fullname) => {
    const parts = fullname.trim().split(" ");
    if (parts.length === 0) {
      return { firstName: "", lastName: "" };
    }
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: "" };
    }
    const firstName = parts[parts.length - 1];
    const lastName = parts.slice(0, parts.length - 1).join(" ");
    return { firstName: firstName, lastName: lastName };
  };

  const handleRegister = (data) => {
    const { firstName, lastName } = splitFullName(data.fullname);
    const dataRegister = {
      firstName: firstName,
      lastName: lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
    };
    RequestRegister(dataRegister);
  };
  return (
    <>
      <h1 className="p-4 text-2xl text-blue-400">Đăng Ký</h1>
      <form
        className="flex p-4 flex-col gap-y-1"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div>
          <label htmlFor="fullName">
            <span className="pr-2 cursor-pointer">Họ Tên :</span>
            <input
              id="fullName"
              className="border-2 px-0.5 "
              placeholder="Nhập họ tên... "
              {...register("fullname")}
            />
          </label>
          <p className="h-3 text-red-600 my-2">{errors.fullname?.message}</p>
        </div>
        <div>
          <label htmlFor="email">
            <span className="pr-2 cursor-pointer">Email :</span>
            <input
              type="email"
              id="email"
              className="border-2 px-0.5 "
              placeholder="Nhập email..."
              {...register("email")}
            />
          </label>
          <p className="h-3 text-red-600 my-2">{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">
            <span className="pr-2 cursor-pointer">Mật Khẩu :</span>
            <input
              type="password"
              id="password"
              className="border-2 px-0.5 "
              placeholder="Nhập mật khẩu..."
              {...register("password")}
            />
          </label>
          <p className="h-3 text-red-600 my-2">{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">
            <span className="pr-2 cursor-pointer">Nhập Lại Mật Khẩu :</span>
            <input
              type="password"
              id="confirmPassword"
              className="border-2 px-0.5 "
              placeholder="Nhập lại mật khẩu..."
              {...register("confirmPassword")}
            />
          </label>
          <p className="h-3 text-red-600 my-2">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <div>
          <button
            disabled={response.isLoading}
            className={`${
              response.isLoading ? "bg-gray-500" : "bg-blue-400"
            } border-2 p-0.5 rounded-xl cursor-pointer `}
          >
            {response.isLoading ? "Đang Xử Lý..." : "Đăng Ký"}
          </button>
          <Link
            to="/login"
            className="pl-2 text-blue-500
          "
          >
            Đã có tài khoản? Đăng nhập
          </Link>
        </div>
      </form>
    </>
  );
};
export default Register;
