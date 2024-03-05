"use client";
import { IoMdCreate } from "react-icons/io";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const router = useRouter();

  // handle logout
  const doLogout = async () => {
    logout();
    router.push("/");
  };
  return (
    <div className="flex justify-between items-center py-3 px-6 bg-sky-800 text-white h-[5rem] w-full fixed top-0 left-0 shadow-xl">
      <div className="flex gap-2 items-center">
        <div className="bg-white rounded-full p-2">
          <IoMdCreate className="text-2xl text-sky-800" />
        </div>
        <span className="font-header text-3xl">Notes</span>
      </div>
      {currentUser && (
        <button
          onClick={doLogout}
          className="bg-sky-100 px-5 py-1 font-header rounded-[2rem] text-sky-800 hover:bg-sky-800 border border-sky-800 hover:text-white hover:border-white transition-colors duration-500"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
