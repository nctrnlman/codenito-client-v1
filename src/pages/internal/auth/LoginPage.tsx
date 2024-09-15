import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "./validation/loginSchema";
import { login } from "../../../services/authService";
import logoDark from "../../../assets/logo/favicon.png";
import { saveUser } from "../../../utils/indexedDBHelper";
import { toast } from "react-toastify";
import ButtonOutline from "../../../components/global/buttons/ButtonOutline";

const LoginPage: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values.email, values.password);
        localStorage.setItem("token", response.token);

        if (response.user) {
          const user = {
            id: response.user._id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
          };
          await saveUser(user);
        }

        toast.success(response.message);
        // window.location.href = "/ims/dashboard";
      } catch (err) {
        if (err instanceof Error) {
          console.error("Login error:", err.message);
          toast.error(err.message);
        } else {
          console.error("Unexpected error", err);
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-8 bg-white border border-black shadow-md rounded-lg">
        <div className="text-center mb-6">
          <img src={logoDark} alt="logo" className="h-20 mx-auto" />
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <div className="pt-4">
            <ButtonOutline
              text={formik.isSubmitting ? "Logging in..." : "Login"}
              type="submit"
              isLoading={formik.isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
