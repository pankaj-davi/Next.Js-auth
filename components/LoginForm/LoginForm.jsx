"use client";

import React, { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthCard from "../AuthCard/AuthCard";
import { useRouter } from "next/navigation";

import { setAuthCookies } from "../../utils/authUtils";
import axiosInstance from "@/utils/axiosInstance";

const LoginForm = () => {
  const [userInputs, setUserInputs] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleInputsChange = (event) => {
    setUserInputs((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/api/auth/login`, {
        ...userInputs,
      });

      setAuthCookies(response.data.accessToken, response.data.refreshToken);
      if(response.status === 200){
        router.push("/dashboard")
      }

    } catch (err) {
      alert(JSON.stringify(err?.response?.data?.message));
    }
  };

  const LoginContent = {
    wlecomeText: "Hi, Welcome Back",
    description: "Enter your credentials to continue",
    redirect: {
      spanText: "Don't have an account? ",
      url: "/signup",
      buttonText: "signup",
    },
  };

  return (
    <AuthCard content={LoginContent}>
      <form onSubmit={handleLogin}>
        <TextField
          size="small"
          name="email"
          label="email"
          variant="outlined"
          fullWidth
          margin="dense"
          value={userInputs.email}
          onChange={handleInputsChange}
        />
        <TextField
          size="small"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="dense"
          value={userInputs.password}
          onChange={handleInputsChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
          style={{ marginTop: "1rem" }}
        >
          Log In
        </Button>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
