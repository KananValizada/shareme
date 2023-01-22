import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { SideBar, UserProfile } from "../components";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { client } from "../client";
import logo from "../assets/logo.png";

const Home = () => {
  const [toggleSidebar, setToogleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    console.log("mm" + userInfo.aud);

    const query = userQuery(userInfo?.aud);
    console.log(query);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToogleSidebar(true)}
        />
        <Link to="/">
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-28" />
        </Link>
      </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToogleSidebar(false)}
            />
          </div>
          <SideBar user={user && user} closeToggle={setToogleSidebar} />
        </div>
      )}
    </div>
  );
};

export default Home;
