import { IoMdCreate } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-3 px-6 bg-sky-800 text-white h-[5rem] w-full fixed top-0 left-0">
      <div className="flex gap-2 items-center">
        <div className="bg-white rounded-full p-2">
          <IoMdCreate className="text-2xl text-sky-800" />
        </div>
        <span className="font-header text-3xl">Notes</span>
      </div>
    </div>
  );
};

export default Navbar;
