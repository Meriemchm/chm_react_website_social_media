import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import * as jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    try {
      // Le nouveau SDK renvoie un "credential" (JWT)
      const decoded = jwt_decode(credentialResponse.credential);
      console.log("User decoded:", decoded);

      localStorage.setItem("user", JSON.stringify(decoded));

      const { name, sub, picture } = decoded;

      const doc = {
        _id: sub,
        _type: "user",
        userName: name,
        image: picture,
      };

      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
