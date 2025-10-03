import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google"; // ✅ nouvelle librairie
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const UserProfil = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  const fetchPins = async () => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => setPins(data));
    } else if (text === "Saved") {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => setPins(data));
    } else {
      navigate("/create-pin");
    }
  };

  useEffect(() => {
    fetchPins();
  }, [text, userId]);

  const logout = () => {
    googleLogout(); // ✅ nouveau logout
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-4">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img
                className=" w-full h-60 shadow-lg object-cover"
                src="https://source.unsplash.com/1600x900/?aesthetic"
                alt="bg-pic"
              />
              <img
                className="rounded-full w-190 h-190 -mt-10 shadow-xl object-cover"
                src={user.image}
                alt="user-pic"
              />
            </div>
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <button
                  type="button"
                  className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={logout}
                >
                  <AiOutlineLogout color="gray" fontSize={21} />
                </button>
              )}
            </div>
          </div>

          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created"
                  ? "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
                  : "bg-primary text-black font-bold p-2 rounded-full w-20 outline-none"
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved"
                  ? "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
                  : "bg-primary text-black font-bold p-2 rounded-full w-20 outline-none"
              }`}
            >
              Saved
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("add");
              }}
              className={`${
                activeBtn === "add"
                  ? "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
                  : "bg-primary text-black font-bold p-2 rounded-full w-20 outline-none"
              }`}
            >
              new
            </button>
          </div>

          <div className="px-2">
            <MasonryLayout pins={pins} />
          </div>

          {pins?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              Pas de Poste!
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default UserProfil;
