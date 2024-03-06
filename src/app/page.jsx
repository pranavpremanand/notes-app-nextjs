"use client";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const { currentUser, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const doLogin = async (values) => {
    try {
      await login(values);
      toast.success("Login successful!");
      router.push("/home");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (currentUser) return router.push("/home");
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="bg-blur-left bg-sky-800"></div>
      <div className="bg-blur-right bg-sky-800"></div>
      <h1 className="text-2xl uppercase font-bold font-header underline">
        Login
      </h1>
      <form
        onSubmit={handleSubmit(doLogin)}
        className="w-[85%] sm:w-1/2 lg:w-1/3 mx-auto"
      >
        <div className="input-box flex flex-col mt-3">
          <label
            htmlFor="email"
            className="text-[0.9rem] -mb-3 bg-white z-10 ml-1 w-fit px-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-400 outline-none focus:border-gray-600 p-2 rounded-sm"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email is invalid",
              },
            })}
          />
          {errors.email && (
            <small className="text-red-600">{errors.email?.message}</small>
          )}
        </div>
        <div className="input-box flex flex-col mt-3">
          <label
            htmlFor="password"
            className="text-[0.9rem] -mb-3 bg-white z-10 ml-1 w-fit px-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter the password"
            className="border border-gray-400 outline-none focus:border-gray-600 p-2 rounded-sm"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/,
                message:
                  "Password should be atleast 6 and maximum 16 characters and must contain uppercase, lowercase and numbers",
              },
            })}
          />
          {errors.password && (
            <small className="text-red-600">{errors.password?.message}</small>
          )}
        </div>
        <button
          type="submit"
          className="bg-sky-700 w-full py-2 mt-4 rounded-full hover:bg-sky-900 transition-colors duration-500 text-white font-medium uppercase tracking-widest"
        >
          Login
        </button>
      </form>
      <small className="mt-3">
        {"Don't have an account? "}
        <Link href="/signup" className="underline font-medium">
          Signup here
        </Link>
      </small>
    </div>
  );
};

export default Login;
