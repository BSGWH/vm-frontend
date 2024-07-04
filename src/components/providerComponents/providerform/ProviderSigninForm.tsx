"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { loginProviderAction } from "@/data/actions/provider-auth-actions";
import React, { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
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
import { RailsErrorsLogin } from "../../authenticationComponents/RailsErrorslogin";

const INITIAL_STATE = {
  zodErrors: null,
  railsErrors: null,
  data: null,
  message: null,
  success: false,
};

export function ProviderSigninForm() {
  const [formState, formAction] = useFormState(
    loginProviderAction,
    INITIAL_STATE
  );
  const router = useRouter();
  useEffect(() => {
    if (formState.success) {
      router.push("/provider/dashboard-provider");
    }
  }, [formState.success, router]);

  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:flex justify-between w-1/2 bg-black pt-14"></div>
      <div className="flex flex-col justify-center bg-white dark:bg-gray-900 items-center justify-center w-full md:w-1/2">
        <Card className="border-0 shadow-none dark:bg-gray-900 text-black dark:text-white w-2/3">
          <CardHeader className="space-y-1 pt-0">
            <CardTitle className="text-3xl font-bold">
              <span className="text-primaryProvider/90">Provider</span> <br />
            </CardTitle>
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pb-4">
            <div className="space-y-2 my-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Email" />
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
              className="w-full bg-primaryProvider hover:bg-primaryProvider-hover text-white py-3 mt-10 rounded"
              text="Sign In"
              loadingText="Loading"
            />
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          <Link className="underline ml-2" href="/signin">
            Sign In as a Customer
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Don't have an account?
          <Link className="underline ml-2" href="/provider/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
