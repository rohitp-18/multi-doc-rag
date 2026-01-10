"use client";

import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { toast } from "sonner";
import {
  loginWithGoogleHandler,
  registerWithGoogleHandler,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

function GoogleButton({ title }: { title: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const successHandler = async (credentialResponse: CredentialResponse) => {
    // The 'credential' is a JWT (ID Token)
    const idToken = credentialResponse.credential;
    console.log(idToken);

    if (!idToken) {
      toast.error("Google login failed: No credential received");
      return;
    }

    if (title.toLowerCase().includes("register")) {
      dispatch(registerWithGoogleHandler({ token: idToken }));
      return;
    }
    dispatch(loginWithGoogleHandler({ token: idToken }));
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      {/* <ContinueButton successHandler={successHandler} /> */}
      <GoogleLogin
        onSuccess={successHandler}
        onError={() => toast.error("Google Login Failed")}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleButton;
