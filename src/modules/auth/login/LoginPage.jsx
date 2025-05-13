import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loginImg from "../../../assets/Asset_IMG.svg";
import logo from "../../../assets/AssetPro_logo.svg";
import toast from "react-hot-toast";
import { userLogin } from "../../../api/modules/loginAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Function to toggle password visibility
  const passwordShowHide = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const onLoginClick = async (data) => {
    console.log("Login attempt with:", data);
    try {
      const res = await userLogin(data);
      if (res.data.success) {
        const token = res.data?.data?.accessToken; // adjust based on actual response structure
        localStorage.setItem("token", token); // store token
        const tenantId = res.data?.data?.user?.tenant_id;
        localStorage.setItem("tenantId", tenantId);
        const officeId = res.data?.data?.user?.office_id;
        localStorage.setItem("officeId", officeId);
        const sectorId = res.data?.data?.user?.sector_id;
        localStorage.setItem("sectorId", sectorId);
        const roleId = res.data?.data?.user?.roleId;
        localStorage.setItem("roleId", roleId);
        const fullName = res.data?.data?.user?.fullName;
        localStorage.setItem("fullName", fullName);

        toast.success("Login successful");
        navigate("/home");
      } else {
        console.log("Login failed:", res.data.data);
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Failed to login");
    }
  };

  // Navigate to forgot password page
  const navigateToForgotPassword = () => {
    // Replace with your actual navigation logic
    console.log("Navigating to forgot password");
    // navigate("/forgot-password");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Left Side Content */}
        <Grid
          container
          sx={{
            flex: { xs: 1, md: 1 },
            backgroundColor: "#236586",
            color: "#ffffff",
            padding: { xs: 2, md: 4 },
            height: { xs: "auto", md: "100vh" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>
            A Complete Asset Management Solutions
          </Typography> */}
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            A Complete Asset Management Solutions
          </Typography>
          <CardMedia
            component="img"
            image={loginImg}
            alt="Education"
            sx={{
              width: { xs: "70%", md: "60%" },
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />
          <Typography variant="body1" sx={{ marginTop: 3 }}>
            Powered By <strong> GJ Global </strong>
          </Typography>
        </Grid>

        {/* Right Side Content (Login Form) */}
        <Grid
          container
          sx={{
            flex: { xs: 1, md: 1 },
            backgroundColor: "#236586",
            color: "#ffffff",
            padding: { xs: 2, md: 4 },
            height: { xs: "auto", md: "100vh" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: { xs: "90%", md: "75%" },
              maxWidth: { xs: "100%", md: 400 },
              padding: { xs: 2, md: 4 },
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
              height: { xs: "auto", md: "auto" },
              minHeight: { xs: "auto", md: "520px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Logo and Name in the Same Line */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1.5,
                marginBottom: 3,
                width: { xs: "80%", md: "83%" },
                marginTop: { xs: "20px", md: "30px" },
              }}
            >
              <CardMedia
                component="img"
                image={logo}
                alt="Logo"
                sx={{
                  width: { xs: 50, md: 230 },
                  height: { xs: 35, md: 81 },
                  objectFit: "contain",
                }}
              />
              {/* <Typography variant="h5" fontWeight="bold">
                GJ Assets
              </Typography> */}
            </Box>

            {/* Inner Box (Centered & Reduced Width) */}
            <Box
              sx={{
                width: { xs: "90%", md: "90%" },
                maxWidth: { xs: "100%", md: 320 },
                textAlign: "center",
              }}
            >
              {/* Welcome Text */}
              <Typography
                variant="h6"
                sx={{ marginBottom: 3, textAlign: "left" }}
                fontWeight="bold"
              >
                Welcome!
              </Typography>

              {/* Form Section */}
              <Box component="form" onSubmit={handleSubmit(onLoginClick)}>
                {/* Username Field */}
                <Box sx={{ marginBottom: 2, textAlign: "left" }}>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    sx={{ marginBottom: 1 }}
                  >
                    Username / Phone Number
                  </Typography>
                  <TextField
                    id="username"
                    fullWidth
                    {...register("username", {
                      required: "Username is required",
                      validate: {
                        notEmpty: (value) =>
                          value.trim() !== "" || "Username cannot be empty",
                      },
                    })}
                    onChange={() => {
                      setLoginError(null);
                    }}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                {/* Password Field */}
                <Box sx={{ marginBottom: 2, textAlign: "left", marginTop: 4 }}>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    sx={{ marginBottom: 1 }}
                  >
                    Password
                  </Typography>
                  <TextField
                    id="password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    onChange={() => {
                      setLoginError(null);
                    }}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {showPassword ? (
                            <VisibilityOff
                              onClick={passwordShowHide}
                              sx={{ cursor: "pointer" }}
                            />
                          ) : (
                            <Visibility
                              onClick={passwordShowHide}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {loginError?.code === "ERR_BAD_REQUEST" && (
                  <Typography color="error" sx={{ mb: 2, fontSize: "14px" }}>
                    Invalid Credentials
                  </Typography>
                )}

                {/* Forgot Password Link */}
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "right",
                    cursor: "pointer",
                    color: "#673ab7",
                    textDecoration: "underline",
                    marginBottom: 3,
                  }}
                  onClick={navigateToForgotPassword}
                >
                  Forgot my password
                </Typography>

                {/* Login Button */}
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: "#236586",
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: 1.5,
                    borderRadius: "8px",
                    ":hover": {
                      backgroundColor: "#5e35b1",
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
