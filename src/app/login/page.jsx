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
    if(data){
        redirect("/")
    }
    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto rounded-none">
      <Card className="border rounded-none">
        <div className="text-center my-3">
          <h1 className="text-2xl font-bold">Login</h1>
          <p>Start your journey with us</p>
        </div>
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          
          <TextField
            isRequired
            name="email"
            type="email"
          
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center gap-2">
            <Button className={`rounded-none w-full bg-cyan-800`} type="submit">Login</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
