import React, { useEffect, useState, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar";
import UserProfil from "../components/UserProfil";
import { client } from "../client";
import { fetchUser } from "src/utils/FetchUser";
import Pins from "./Pins";
import { userQuery } from "src/utils/data";
const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="relative p-2 w-full flex flex-row justify-between shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer mt-3"
            onClick={() => setToggleSideBar(true)}
          />
          <Link to="/">
            <p className="w-30 text-xl text-bold p-5 ">My Time <span>Now</span> </p>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} className="w-20 rounded-full" alt="logo" />
          </Link>
        </div>
        {toggleSideBar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={40}
                className="cursor-pointer"
                onClick={() => setToggleSideBar(false)}
              />
            </div>
            <SideBar user={user && user} closeToggle={setToggleSideBar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll " ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfil />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
