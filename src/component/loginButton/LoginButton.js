// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const LoginButton = () => {
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/auth/check");
//         console.log("############################# 0: ", response.data);
//         console.log("############################# 01: ", response);

//         if (response.data.authenticated) {
//           console.log("############################# 1: ", response.data);
//           console.log(
//             "############################# 2: ",
//             response.data.authenticated
//           );

//           // User is already authenticated
//           setAuthenticated(true);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     checkAuthentication();
//   }, []);

//   const handleLogin = () => {
//     window.location.href = "http://localhost:3001/auth/google";
//   };

//   return (
//     <>
//       {!authenticated && (
//         <button onClick={handleLogin}>Login with Google</button>
//       )}
//     </>
//   );
// };

// export default LoginButton;

import axios from "axios";

import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";

import * as dotenv from "dotenv";
dotenv.config();
let afshin = process.env.REACT_APP_AFSHIN;
let clientId = process.env.REACT_APP_CLIENT_ID;
console.log("****************************** clientID: ", clientId);
console.log("****************************** AFSHIN: ", afshin);

const LoginButton = () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isAuthenticated = urlParams.get("authenticated");
    if (isAuthenticated === "true") {
      setAuthenticated(true);
    }
  }, []);

  const responseGoogle = (response) => {
    // Handle the response from the Google login button
    // You can make an API request to the backend to complete the authentication process
    console.log(
      "********************************** Google login response:",
      response
    );
    // Redirect the user to the dashboard or any other desired page
    window.location.href = "http://localhost:3001/auth/google/callback";
  };

  return (
    <>
      {!authenticated && (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </>
  );
};

export default LoginButton;
