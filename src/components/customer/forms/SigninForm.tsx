"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";
import React, { useEffect, useState } from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "@/components/authenticationComponents/ZodErrors";
import { RailsErrors } from "@/components/authenticationComponents/RailsErrors";
import { SubmitButton } from "@/components/authenticationComponents/SubmitButton";
import { RailsErrorsLogin } from "@/components/authenticationComponents/RailsErrorslogin";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "next-themes";

const INITIAL_STATE = {
  zodErrors: null,
  railsErrors: null,
  data: null,
  message: null,
  success: false,
};

export function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  const router = useRouter();

  const { theme, resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  useEffect(() => {
    if (formState.success) {
      router.push("/customer/dashboard");
    }
  }, [formState.success, router]);

  return (
    <div className="flex h-screen w-full select-none">
      <div className="hidden md:flex justify-between w-1/2 bg-black pt-14 relative">
        <img
          src="/images/customer-sign-left.jpg"
          alt="customer-sign-left.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-70"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="flex flex-col items-center text-center text-4xl font-bold text-gray-300 dark:text-gray-400 p-10">
            <span>
              The Easiest Way to <br />
              Service Your Vehicles
            </span>
            <div className="w-1/2 h-px bg-gray-200 dark:bg-gray-500 mt-6"></div>
            <img
              src="/images/logo-light.png"
              alt="logo"
              className="w-1/3 mt-4 filter dark:brightness-75"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-white dark:bg-gray-900 items-center justify-center w-full md:w-1/2">
        <Card className="border-0 shadow-none dark:bg-gray-900 text-black dark:text-white w-2/3">
          <CardHeader className="space-y-1 pt-0">
            <CardTitle className="text-3xl font-bold">
              <span className="text-primaryCustomer/90">Customer</span> <br />
            </CardTitle>
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          </CardHeader>
          <form action={formAction}>
            <CardContent className="space-y-8 pb-4">
              <div className="space-y-2 my-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ZodErrors error={formState?.zodErrors?.email} />
              </div>
              <div className="space-y-2 my-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ZodErrors error={formState?.zodErrors?.email} />
              </div>
              <SubmitButton
                className="w-full bg-primaryCustomer hover:bg-primaryCustomer-hover text-white py-3 mt-10 rounded"
                text="Sign In"
                loadingText="Loading"
              />
            </CardContent>
          </form>
        </Card>
        <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          <Link className="underline ml-2" href="/provider/signin">
            Sign In as a Provider
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Don't have an account?
          <Link className="underline ml-2" href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
