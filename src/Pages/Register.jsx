/* eslint-disable no-unused-vars */
import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { set, useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
const Register = () => {
  const [toggleIcon, setToggleIcon] = useState(false);
  const [toggleIconConfirm, setToggleIconConfirm] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const [gander, setGender] = useState("Others");
  const navigate = useNavigate();
  const { signUp, signInGoogle, signInGithub, ProfileUpdate, setReload } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const name = data.name;
    const photo = data.photoUrl;
    const contact = data.phoneNumber;
    const address = data.address;
    if (password !== confirmPassword) {
      setErrorMassage("Password an confirm password doesn't match");
      return;
    } else {
      setErrorMassage("");
    }
    // console.log("error", errorMassage);
    signUp(email, password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        ProfileUpdate(name, photo).then(() => {
          setReload(true);
          const saveUser = {
            email,
            name,
            photo,
            role: "student",
            gander,
            contact,
            address,
          };
          // console.log(saveUser);
          fetch("https://creativa-design-hub-server-site.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire("Good job!", "User created successfully", "success");
                navigate(from, { replace: true });
              }
            });

          reset();
        });
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
  const handleGender = (e) => {
    setGender(e.target.value);
  };


  return (
    <div className="container mx-auto md:pt-32 p-3">
      <div style={{ width: "100%" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center h-full"
        >
          <div className="flex flex-col justify-start items-start fullForm w-full  shadow-2xl">
            <h2 className="text-2xl mb-2" style={{ color: "#32c770" }}>
              Please Register
            </h2>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter Your Name"
              className="border"
            />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="CreativaDesignHub.world@gmail.com"
              className="border"
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
                placeholder="Enter Password"
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
            <>
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
            </>
            <div className="w-full relative">
              <input
                type={`${toggleIconConfirm ? "text" : "password"}`}
                {...register("confirmPassword", { required: true })}
                className="border m-0 mt-3"
                placeholder="Enter Confirm Password"
              />

              <span
                onClick={() => setToggleIconConfirm(!toggleIconConfirm)}
                className="absolute bottom-4 right-4 toggle-icon"
              >
                {toggleIconConfirm ? (
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
            {<p className="text-red-700 ">{errorMassage}</p>}
            <div className="md:flex w-full justify-between items-center">
              <input
                type="url"
                {...register("photoUrl", { required: true })}
                placeholder="Enter Your Photo URL"
                className="border mt-5"
              />
              <input
                type="number"
                {...register("phoneNumber", { required: true })}
                placeholder="Enter Your Phone Number"
                className="border mt-5 ms-2"
              />
            </div>
            <input
              type="text"
              {...register("address", { required: true })}
              placeholder="Enter Your Address"
              className="border"
            />
            <select onChange={handleGender} className="border">
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">other</option>
            </select>
            <p className="mb-3 text-end w-full forget-password">
              Forget Password
            </p>
            <p className="mb-2">
              Already have an Account?{" "}
              <Link style={{ color: "#32c770", fontWeight: 700 }} to="/login">
                Please Login
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

export default Register;
