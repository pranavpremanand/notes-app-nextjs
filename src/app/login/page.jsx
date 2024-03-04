import Link from "next/link";

const Login = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="bg-blur-left bg-sky-800"></div>
      <div className="bg-blur-right bg-sky-800"></div>
      <h1 className="text-2xl uppercase font-bold font-header underline">Login</h1>
      <form action="" className="w-[85%] sm:w-1/2 lg:w-1/3 mx-auto">
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
          />
        </div>
        <button className="bg-sky-700 w-full py-2 mt-4 rounded-full hover:bg-sky-900 transition-colors duration-500 text-white font-medium uppercase tracking-widest">
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
