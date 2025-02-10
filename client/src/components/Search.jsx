import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div className="w-full min-w-[220px] lg:min-w-[400px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-600 bg-slate-50 group focus-within:border-yellow-500">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-2 group-focus-within:text-yellow-500 bg-white rounded-full shadow-md"
          >
            <FaArrowLeft size={22} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-yellow-500">
            <FaSearch size={20} />
          </button>
        )}
      </div>

      <div className="w-full h-full">
        {!isSearchPage ? (
          //not in search page
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Tìm kiếm "PHPMol"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Tìm kiếm "vnp"',
                1000,
                'Tìm kiếm "vợt cầu lông"',
                1000,
                'Tìm kiếm "phụ  kiện"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //when is was search page
          <div className="w-full h-full">
            <input
              className="w-full h-full bg-transparent outline-none"
              autoFocus
              type="text"
              placeholder="Search for all data and more"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
