import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { TfiSearch } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import { MdVideoLibrary } from "react-icons/md";

const Header = () => {
  const [params] = useSearchParams();
  const query = params.get("search_query");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    navigate(`./results?search_query=${text}`);
  };
  return (
    <header className="px-2 py-4 sm:px-4 flex justify-between items-center">
      <Link to="/" className="flex gap-[6px] items-center">
        <img className="w-9 h-6 ms-2" src="/youtube.png" alt="youtube logo" />
        <h1 className="text-xl sm:text-[30px]">YouTube</h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex border border-gray-400 rounded-[20px] overflow-hidden"
      >
        <input
          className="bg-black px-2 sm:px-5 py-1 sm:py-2 border border-transparent focus:outline-none focus:border-blue-500 rounded-l-[20px]"
          type="text"
          defaultValue={query}
        />
        <button className="px-3 bg-zinc-800 sm:px-4 sm:text-2xl hover:bg-zinc-600 transition duration-300">
          <TfiSearch className="w-5" />
        </button>
      </form>
      <div className="flex gap-3 text-xl cursor-pointer max-sm:hidden">
        <FaBell className="hover:text-gray-400 transition " />
        <IoIosVideocam className="hover:text-gray-400 transition " />
        <MdVideoLibrary className="hover:text-gray-400 transition " />
      </div>
    </header>
  );
};

export default Header;
