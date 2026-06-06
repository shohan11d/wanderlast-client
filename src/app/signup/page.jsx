"use client";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Card,
  Separator,
} from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pwd) => {
    if (pwd.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain an uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must contain a lowercase letter";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordError(validatePassword(pwd));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      toast.error("Please fix the password errors");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    console.log("sign up data >", data);
    console.log("sign up error >", error);
    if (data) {
      redirect("/");
    }
    if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="w-full">
      <div className=" mx-auto rounded-none bg-[#0f1c2e] min-h-screen flex items-center justify-center">
        <Card className="rounded-none !bg-[#0f1c2e] text-[#f0ece3] border-none">
          <div className="text-center my-3">
            <h1 className="text-2xl font-bold text-[#f0ece3]">
              Create Account
            </h1>
            <p className="text-[#f0ece3]/70">Start your journey with us</p>
          </div>
          <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
            <TextField isRequired name="name" type="text">
              <Label className="text-[#f0ece3]">Name</Label>
              <Input
                placeholder="Enter your name"
                className="bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
              />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label className="text-[#f0ece3]">Email</Label>
              <Input
                placeholder="john@example.com"
                className="bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
              />
              <FieldError />
            </TextField>
            <TextField isRequired name="password" type="password">
              <Label className="text-[#f0ece3]">Password</Label>
              <Input
                placeholder="Enter your password"
                className="bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
                onChange={handlePasswordChange}
              />
              <Description className="text-[#f0ece3]/60">
                Min 6 chars, 1 uppercase, 1 lowercase
              </Description>
              {passwordError && (
                <p className="text-red-400 text-sm mt-1">{passwordError}</p>
              )}
            </TextField>
            <div className="flex justify-center gap-2">
              <Button
                className={`rounded-none w-full ${
                  passwordError
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-teal-300 text-[#0f1c2e]"
                }`}
                type="submit"
                disabled={!!passwordError}
              >
                Create Account
              </Button>
            </div>
          </Form>
          <div className="flex justify-center items-center gap-3">
            <Separator />
            <div className="whitespace-nowrap text-[#f0ece3]/70">
              Or sign in with
            </div>
            <Separator />
          </div>
          <div>
            <Button
              onClick={handleGoogleSignin}
              className={`w-full rounded-none bg-teal-300 text-[#0f1c2e]`}
            >
              <FcGoogle className="mr-2" />
              Sign in with Google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
