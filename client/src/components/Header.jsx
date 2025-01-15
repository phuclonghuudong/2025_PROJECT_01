import React from "react";
import logo from "../assets/logo.svg";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchPage = location?.pathname === "/search";

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-25 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center bg-white">
      {!(isMobile && isSearchPage) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/* Logo */}
          <Link to={"/"} className="h-full">
            <div className="h-full flex justify-center items-center">
              <img
                className="hidden lg:block"
                src={logo}
                width={70}
                height={20}
                alt="logo"
              />
              <img
                src={logo}
                width={70}
                height={20}
                alt="logo"
                className=" lg:hidden"
              />
            </div>
          </Link>

          {/* Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login and cart */}
          <div className="">
            {/* Mobile */}
            <button className="lg:hidden text-neutral-700">
              <FaRegCircleUser size={28} />
            </button>
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={redirectToLoginPage} className="text-lg px-2">
                Login
              </button>
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-700 px-2 py-2 rounded">
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 py-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
