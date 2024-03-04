"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const doSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", user);
      console.log(response.data);
      toast.success(response.data.message);
      router.replace("/");
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        return toast.error(err.response.data.error);
      }
      toast.error(err.message);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="bg-blur-left bg-sky-800"></div>
      <div className="bg-blur-right bg-sky-800"></div>
      <h1 className="text-2xl uppercase font-bold font-header underline">
        Signup
      </h1>
      <form onSubmit={doSignup} className="w-[85%] sm:w-1/2 lg:w-1/3 mx-auto">
        <div className="input-box flex flex-col mt-3">
          <label
            htmlFor="fullName"
            className="text-[0.9rem] -mb-3 bg-white z-10 ml-1 w-fit px-1"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            className="border border-gray-400 outline-none focus:border-gray-600 p-2 rounded-sm"
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />
        </div>
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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 w-full py-2 mt-4 rounded-full hover:bg-sky-900 transition-colors duration-500 text-white font-medium uppercase tracking-widest"
        >
          Signup
        </button>
      </form>
      <small className="mt-3">
        Already have an account?{" "}
        <Link href="/login" className="underline font-medium">
          Login here
        </Link>
      </small>
    </div>
  );
};

export default Signup;