import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { client } from "../client.js";

const Login = () => {
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    console.log(response);
  }

  // useEffect(() => {
  //   /* global google  */
  //   google.accounts.id.initialize({
  //     client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

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
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const token = credentialResponse.credential;
                const decoded = jwt_decode(token);
                localStorage.setItem("user", JSON.stringify(decoded));

                const doc = {
                  _id: credentialResponse.clientId,
                  _type: "user",
                  userName: decoded.name,
                  image: decoded.picture,
                };
                console.log(doc);

                client.createIfNotExists(doc).then(() => {
                  navigate("/", { replace: true });
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            ></GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
