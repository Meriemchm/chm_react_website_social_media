import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleResponse = (credentialResponse) => {
    try {
      // Le credential est un JWT encodé
      const base64Url = credentialResponse.credential.split('.')[1];
      const decodedPayload = JSON.parse(atob(base64Url));

      console.log("User decoded:", decodedPayload);

      localStorage.setItem("user", JSON.stringify(decodedPayload));

      const { name, sub, picture } = decodedPayload;

      const doc = {
        _id: sub,        // Google user ID comme ID Sanity
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
                onSuccess={handleGoogleResponse}
                onError={() => console.log("Login Failed")}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
