"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { registerProviderAction } from "@/data/actions/provider-auth-actions";
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
import { Message } from "../../authenticationComponents/Message";
import { resendProviderConfirmation } from "@/data/services/provider-service-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const INITIAL_STATE = {
  data: null,
  ZodErrors: null,
  message: null,
  railsErrors: null,
  success: false,
};

export function ProviderSignupForm() {
  const [formState, formAction] = useFormState(
    registerProviderAction,
    INITIAL_STATE
  );

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

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
                <span className="text-primaryProvider/90">Provider</span> <br />
              </CardTitle>
              <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pb-4">
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
                    className="w-full bg-primaryProvider hover:bg-primaryProvider-hover py-3 mt-6 rounded"
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
                          const result = await resendProviderConfirmation({
                            email,
                          });
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
                        router.push("/provider/signin");
                      }}
                    >
                      Sign in
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <RailsErrors error={{ errors: formState?.railsErrors }} />
              {/* <Message message={formState?.message} /> */}
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            <Link className="underline ml-2" href="/signup">
              Sign Up as a Customer
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
