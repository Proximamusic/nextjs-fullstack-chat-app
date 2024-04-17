"use client";
import {
  MessageOutlined,
  PasswordOutlined,
  Person2Outlined,
  PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

function Form({ type }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function submitFunction(data) {
    console.log(data);
    setIsLoading(true);
    if (type == "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Signed up successfully!");
        setTimeout(router.push("/"), 500);
      }
      if (res.error) {
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    } else {
      const res = await signIn("credentials", { ...data, redirect: false });

      if (res.ok) {
        toast.success("Signed up successfully!");
        setTimeout(router.push("/chats"), 500);
      }
      if (res.error) {
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    }
  }
  return (
    <div className="auth">
      <div className="content">
        <img src="/assets/logo.png" alt="logo" className="logo" />
        <form className="form" onSubmit={handleSubmit(submitFunction)}>
          {type === "register" && (
            <div>
              <div className="input">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  defaultValue={""}
                  {...register("userName", {
                    required: "Username is required",
                    validate: (value) => {
                      if (value.length < 3)
                        return "Username must be greater than 3 characters long";
                    },
                  })}
                />
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
              {errors.userName && (
                <p className="text-red-500">{errors.userName.message}</p>
              )}
            </div>
          )}
          <div>
            <div className="input">
              <input
                type="email"
                defaultValue={""}
                {...register("email", { required: "Email is required." })}
                className="input-field"
                placeholder="Email"
              />
              <MessageOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
              <p className="text-red-500 ">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="input">
              <input
                type="password"
                defaultValue={""}
                {...register("password", {
                  required: "password is required.",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    ) {
                      return "Password must be at least 5 characters and contain at least one special character";
                    }
                  },
                })}
                className="input-field"
                placeholder="Password"
              />
              <PasswordOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {isLoading && <p className="text-center">Loading...</p>}
          <button type="submit" disable={isLoading} className="button">
            {type === "register" ? "Join for free" : "Login"}
          </button>
          {type == "register" && (
            <Link href={"/"} className="link">
              <p className="text-center">
                Already have an account? Sign In Here.
              </p>
            </Link>
          )}
          {type == "login" && (
            <Link href={"/register"} className="link">
              <p className="text-center">
                Don't have an account? Sign In Here.
              </p>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
