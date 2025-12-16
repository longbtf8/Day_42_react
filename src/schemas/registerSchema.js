import * as zod from "zod";

export const registerSchema = zod
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
    password: zod.string().min(8, "Mật khẩu phải lớn hơn 8 kí tự"),
    confirmPassword: zod.string().min(4, "Mật khẩu phải lớn hơn 4 kí tự"),
  })
  // Áp dụng refine() ở cấp độ đối tượng
  .refine((data) => data.password === data.confirmPassword, {
    // Thông báo lỗi nếu validation thất bại
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    // Trường hiện lỗi
    path: ["confirmPassword"],
  });
