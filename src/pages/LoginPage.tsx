import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

import signup from "../assets/signup.gif";
import { useRef } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login, LoginInput, LoginResponse } from "@/http/api";
import { LoaderCircle, Variable } from "lucide-react";
import useTokenStore from "@/zustand/store";

function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const setToken = useTokenStore((state)=>state.setToken);

  // console.log(token)

  const mutation: UseMutationResult<LoginResponse, Error, LoginInput> =
    useMutation({
      mutationFn: login,
      onSuccess: (response) => {
        // Assuming the response has a property `accessToken`
        // console.log(response.accessToken)
    
        setToken(response?.accessToken);

        navigate("/"); // Navigate to the desired route
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });

  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    const email = emailRef.current?.value; //*will get the data when we type
    const password = passwordRef.current?.value;
    // console.log(email, password);

    //^will make an api call

    if (!email || !password) {
      // alert("Please enter email and password");
      return;
    }
    mutation.mutate({ email, password });
  };


  
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 rounded-md border-[1px] border-primary bg-background px-6 py-8">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                ref={emailRef}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                ref={passwordRef}
              />
              {mutation.isError && (
                <p className="text-red-500">{mutation.error.message}</p>
              )}
            </div>
            <Button
              onClick={handleLoginSubmit}
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={signup}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default LoginPage;
