import React from 'react';
import { GoogleLogin } from 'react-google-login';

export const GoogleLoginButton = () => {
  const handleGoogleLoginSuccess = (response) => {
    // Handle successful login
    console.log('Logged in successfully:', response.profileObj);
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle login failure
    console.log('Error logging in:', error);
  };

  return (
    <GoogleLogin
      clientId="986046680403-tjqkne4oq64jfe60o3o15nf5icf9n68k.apps.googleusercontent.com" // Replace with your Google OAuth client ID
      buttonText="Login with Google"
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

