"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  registerUserService,
  loginUserService,
} from "@/data/services/service-auth";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({

  password: z
  .string()
  .min(6, {
    message: "Password must be between 6 and 30 characters",
  })
  .max(30, {
    message: "Password must be between 6 and 30 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  confirmPassword: z
  .string()
  .min(6, { message: "Password must be between 6 and 30 characters" })
  .max(30, { message: "Password must be between 6 and 30 characters" }),
})
.refine((data) =>data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path:["confirmPassword"]
});

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    password: formData.get("password"),
    email: formData.get("email"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      railsErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const userPayload = {
    user: {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      password_confirmation: validatedFields.data.confirmPassword,
    }
  };


  const responseData = await registerUserService(userPayload);
  console.log(responseData)
  console.log(responseData.errors)
  if (!responseData) {
    return {
      ...prevState,
      railsErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.errors) {
    return {
      ...prevState,
      railsErrors: responseData.errors,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }
  if (responseData.message === 'Signed up successfully') {

    // Only when we set the response with a jwt for signup we need the next line of code
    // cookies().set("jwt", responseData.jwt, config);
    redirect("/dashboard");
  } 
}

const schemaLogin = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must be between 6 and 30 characters",
    })
    .max(30, {
      message: "Password must be between 6 and 30 characters",
    }),

  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    email: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  console.log(validatedFields.data)
  const userEmailAndPassword = {
    user: {
      email: validatedFields.data.email,
      password: validatedFields.data.password,

    }
  };

  const responseData = await loginUserService(userEmailAndPassword);

  if (!responseData) {
    return {
      ...prevState,
      railsErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      railsErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  cookies().set("jwt", responseData.jwt);
  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}