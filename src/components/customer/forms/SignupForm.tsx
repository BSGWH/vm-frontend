"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { registerUserAction } from "@/data/actions/auth-actions";
import { useFormState } from "react-dom";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "@/components/authenticationComponents/ZodErrors";
import { RailsErrors } from "@/components/authenticationComponents/RailsErrors";
import { SubmitButton } from "@/components/authenticationComponents/SubmitButton";
import { Message } from "@/components/authenticationComponents/Message";
import { resendConfirmation } from "@/data/services/service-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";

const INITIAL_STATE = {
  data: null,
  ZodErrors: null,
  message: null,
  railsErrors: null,
  success: false,
};

export function SignupForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const { theme, resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  useEffect(() => {
    console.log(formState);
    if (formState && formState.success) {
      setIsAlertOpen(true);
    }
  }, [formState.success]);
  const router = useRouter();

  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:flex justify-between w-1/2 bg-black pt-14"></div>
      <div className="flex w-full md:w-1/2 items-center justify-center pt-14 dark:bg-gray-900">
        <form action={formAction} className="w-2/3 max-w-md min-w-md">
          <Card className="border-0 shadow-none dark:bg-gray-900">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">
                <span className="text-primaryCustomer/90">Customer</span> <br />
              </CardTitle>
              <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-4">
              <div className="space-y-2 my-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <ZodErrors error={formState?.zodErrors?.email} />
              <div className="space-y-2 my-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </div>
              <ZodErrors error={formState?.zodErrors?.password} />
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                />
              </div>
              <ZodErrors error={formState?.zodErrors?.confirmPassword} />
            </CardContent>
            <CardFooter className="flex flex-col">
              <AlertDialog open={isAlertOpen}>
                <AlertDialogTrigger asChild>
                  <SubmitButton
                    className="w-full bg-primaryCustomer hover:bg-primaryCustomer-hover py-3 mt-6 rounded"
                    text="Sign Up"
                    loadingText="Loading"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      A confirmation email has been sent to your email
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You can click Resend if you didn't get the email or Sign
                      in to your dashboard after confirmed your email
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={async () => {
                        const email = formState?.data?.email;
                        if (email) {
                          const result = await resendConfirmation({ email });
                          if (result.error) {
                            toast.error(result.error);
                          } else {
                            toast.success(result.message);
                          }
                        }
                      }}
                    >
                      Resend
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        router.push("/signin");
                      }}
                    >
                      Sign in
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>


              <RailsErrors error={{ errors: formState?.railsErrors }} />
              <Message message={formState?.message} />
            </CardFooter>
          </Card>
          <div className="flex justify-center">
            <div className="text-center text-sm text-gray-400 w-2/3">
              By clicking sign up, you agree to our
              <Link className="underline ml-2" href="/legal/terms-and-conditions">
                Terms of Service
              </Link>{" "}
              and
              <Link className="underline ml-2" href="/legal/privacy-policy">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link className="underline ml-2" href="/provider/signup">
              Sign Up as a Provider
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link className="underline ml-2" href="signin">
              Sign In
            </Link>
          </div>
        </form>
      </div>

    </div>
  );
}
