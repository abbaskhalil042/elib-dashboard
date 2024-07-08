import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/signup.gif";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/http/api";
import { LoaderCircle } from "lucide-react";
// import { register } from "module";

const RegisterPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/");
    },
  });

  // console.log("mutation", mutation?.error?.response?.data?.message);

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();

    const email = emailRef.current?.value; //*will get the data when we type
    const password = passwordRef.current?.value;
    const name = userNameRef.current?.value;
    // console.log(email, password);

    //^will make an api call

    if (!name || !email || !password) {
      // alert("Please enter email and password");
      return;
    }
    mutation.mutate({ name, email, password });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src={signup}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 rounded-md border-[1px] border-primary bg-background px-6 py-8">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to register
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your Name"
                required
                ref={userNameRef}
              />
            </div>
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
            </div>
            {mutation.isError && (
              <p className="text-red-500">
                {/* @ts-ignore */}
                {mutation?.error?.response?.data?.message}
              </p>
            )}
            <Button
              onClick={handleRegisterSubmit}
              type="submit"
              className="w-full"
            >
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link to="/auth/login" className="underline">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
