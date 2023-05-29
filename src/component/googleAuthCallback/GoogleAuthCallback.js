import React, { useEffect } from "react";

const GoogleAuthCallback = () => {
  useEffect(() => {
    // Handle the Google authentication callback logic here
    // You can perform any necessary actions or redirect the user
    // For example, you can make an API request to the backend to complete the authentication process
    // After that, you can redirect the user to the dashboard or any other desired page
    // You can access the query parameters sent by the Google OAuth callback using the "location" object
    // For example, if you need the "code" parameter: const code = new URLSearchParams(location.search).get("code");

    // Redirect the user to the dashboard or any other desired page
    window.location.href = "/dashboard";
  }, []);

  return (
    <div>
      <h1>Processing Google Authentication...</h1>
    </div>
  );
};

export default GoogleAuthCallback;
