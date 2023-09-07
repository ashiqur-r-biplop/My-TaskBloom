/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { user, handleLogin } = useContext(AuthContext);
  const [toggleIcon, setToggleIcon] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleLogin(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Log In Successful",
          showConfirmButton: false,
          buttonsStyling: "#32c770",
          timer: 1500,
        });
        navigate(from, { replace: true });
        reset();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          buttonsStyling: {
            color: "#32c770",
            backgroundColor: "#267E23",
          },
          title: `${err.message}`,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  };
  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className="container mx-auto ">
      <div style={{ height: "80vh" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center h-full"
        >
          <div className="flex flex-col justify-start items-start fullForm lg:w-2/6 md:w-3/6  shadow-2xl">
            <h2 className="text-2xl mb-2" style={{ color: "#32c770" }}>
              Please Login
            </h2>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="CreativaDesignHub.world@gmail.com"
              className="border"
              name="email"
            />
            <div className="w-full relative">
              <input
                type={`${toggleIcon ? "text" : "password"}`}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                })}
                className="border m-0"
                placeholder="******"
                name="password"
              />

              <span
                onClick={() => setToggleIcon(!toggleIcon)}
                className="absolute bottom-4 right-4 toggle-icon"
              >
                {toggleIcon ? (
                  <FontAwesomeIcon
                    className="block"
                    icon={faEyeSlash}
                  ></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon
                    className="block"
                    icon={faEye}
                  ></FontAwesomeIcon>
                )}
              </span>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">Password less than 20 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">Password must be PATTERN rules</p>
            )}
            <p className="mb-3 text-end w-full forget-password">
              Forget Password
            </p>

            <p className="mb-2">
              Don't Have an Account?{" "}
              <Link
                style={{ color: "#32c770", fontWeight: 700 }}
                to="/register"
              >
                Please Register
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="bg-[#32c770] border-0 text-white font-semibold cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
