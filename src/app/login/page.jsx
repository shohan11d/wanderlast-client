"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Card,
} from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);

    const { data, error } = await authClient.signIn.email({
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

  return (
    <div>
      <div className=" mx-auto rounded-none bg-[#0f1c2e] min-h-screen flex items-center justify-center">
        <Card className="rounded-none bg-[#0f1c2e] text-[#f0ece3] border-none">
          <div className="text-center my-3">
            <h1 className="text-2xl font-bold text-[#f0ece3]">Login</h1>
            <p className="text-[#f0ece3]/70">Start your journey with us</p>
          </div>
          <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
            <TextField isRequired name="email" type="email">
              <Label className="text-[#f0ece3]">Email</Label>
              <Input
                placeholder="john@example.com"
                className="bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
              />
              <FieldError />
            </TextField>
            <TextField isRequired minLength={8} name="password" type="password">
              <Label className="text-[#f0ece3]">Password</Label>
              <Input
                placeholder="Enter your password"
                className="bg-[#1a2a3a] text-[#f0ece3] placeholder-[#f0ece3]/50"
              />
              <Description className="text-[#f0ece3]/60">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>
            <div className="flex justify-center gap-2">
              <Button
                className={`rounded-none w-full bg-teal-300 text-[#0f1c2e]`}
                type="submit"
              >
                Login
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
