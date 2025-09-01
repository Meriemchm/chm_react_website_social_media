import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "src/assets/logo.png";
import { GoogleLogout } from "react-google-login";
import { categories } from "src/utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const SideBar = ({ user, closeToggle }) => {
  const navigate = useNavigate();
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scroll-bar">
      <div className="flex flex-col ">
        {/* logo */}
        <Link
          to="/"
          className="flex px-5 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        {/* user */}
        {user && (
          <Link
            to={`user-profile/${user._id}`}
            className="flex gap-2 p-4 items-center bg-white border-b-[2px]"
            onClick={handleCloseSidebar}
          >
            <img
              src={user.image}
              className="w-10 h-10 rounded-full"
              alt="user-profile"
            />
            <p>{user.userName}</p>
            <IoIosArrowForward />
          </Link>
        )}
        {/* navlink */}
        <div className="flex flex-col gap-5 pb-3 pt-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <RiHomeFill />
            Accueil
          </NavLink>

          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Découvrez nos catégories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
        {/* logout */}
        {user && (
          <GoogleLogout
            clientId={`${import.meta.env.VITE_GOOGLE_API_TOKEN}`}
            render={(renderProps) => (
              <button
                type="button"
                className="relative bg-white p-5 rounded-full cursor-pointer outline-none shadow-md"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <p className="absolute t-0 left-12 text-bold">Deconnexion</p>
                <AiOutlineLogout color="gray" fontSize={21} />
              </button>
            )}
            onLogoutSuccess={logout}
            cookiePolicy="single_host_origin"
          />
        )}
      </div>
    </div>
  );
};

export default SideBar;
