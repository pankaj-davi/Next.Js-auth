import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import AuthCard from "../AuthCard/AuthCard";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignupFrom = () => {
  const navigate = useRouter();
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleInputsChange = (event) => {
    if (event.target.name === "email") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(event.target.value),
      }));
    }
    if (event.target.value.length < 3) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: `${
          event.target.name.charAt(0).toUpperCase() + event.target.name.slice(1)
        } is required`,
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: ``,
      }));
    }

    setUserInputs((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("/api/register", user);
      // console.log(res.data);
      const response = await axios.post("/api/register", {
        name: userInputs.firstName,
        email: userInputs.email,
        password: userInputs.password,
      });
      if (response.status == 200 || response.status == 201) {
        console.log("user added successfully");
        setValidationErrors({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        });
        navigate.push("/login");
      }
    } catch (err) {
      // Handle error
      alert(JSON.stringify(err));
    }
  };

  const SignupContent = {
    wlecomeText: "Sign up",
    description: "Sign up with Email address",
    redirect: {
      spanText: "Already have an account? ",
      url: "/",
      buttonText: "login",
    },
  };

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  return (
    <AuthCard content={SignupContent}>
      <form onSubmit={handleSignup}>
        <TextField
          size="small"
          required
          name="firstName"
          type="text"
          label="First Name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={userInputs.firstName}
          onChange={handleInputsChange}
          error={!!validationErrors.firstName}
          helperText={validationErrors.firstName}
        />
        <TextField
          required
          size="small"
          name="lastName"
          type="text"
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={userInputs.lastName}
          onChange={handleInputsChange}
          error={!!validationErrors.lastName}
          helperText={validationErrors.lastName}
        />
        <TextField
          required
          size="small"
          name="email"
          type="email"
          label="email"
          variant="outlined"
          fullWidth
          margin="dense"
          value={userInputs.email}
          onChange={handleInputsChange}
          error={!!validationErrors.email}
          helperText={validationErrors.email}
        />
        <TextField
          required
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
          size="small"
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
          style={{ marginTop: "1rem" }}
        >
          Signup
        </Button>
      </form>
    </AuthCard>
  );
};

export default SignupFrom;
