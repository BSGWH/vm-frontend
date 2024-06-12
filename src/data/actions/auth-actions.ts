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

// User sign up

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

  console.log(userPayload)
  const responseData = await registerUserService(userPayload);
  console.log(responseData.message)
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
  // if (responseData.message === 'Signed up successfully') {

  //   // Only when we set the response with a jwt for signup we need the next line of code
  //   // cookies().set("jwt", responseData.jwt, config);

  //   // redirect("/signin");
  // }
  if (responseData.message) {
    return {
      ...prevState,
      railsErrors: null,
      zodErrors: null,
      message: responseData.message,
      success: true,
      data: { email: validatedFields.data.email }, // Only for the resend confirmation
    };
  }
}


// User sign in

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
    email: formData.get("email"),
    password: formData.get("password"),
  });


  if (!validatedFields.success) {

    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }




  const userEmailAndPassword = {
    user: {
      email: validatedFields.data.email,
      password: validatedFields.data.password,

    }
  };

  try {
    const responseData = await loginUserService(userEmailAndPassword);

  
    if (!responseData.ok) {
      
      return {
        ...prevState,
        railsErrors: responseData.error,
        zodErrors: null,
        message: "Failed to Login.",
      };
    }
  
    else {
      cookies().set("jwt-user", responseData.jwt, config);
      return {
        ...prevState,
        railsErrors: null,
        zodErrors: null,
        success: true,
      }
    }



    // window.location.reload()
    // window.location.href = "/dashboard";

  } catch (error) {
    return {
      ...prevState,
      railsErrors: null,
      message: "An unexpected error occurred. Please try again later.",
    };
  } 
}

// User log out

export async function logoutAction() {
  cookies().set("jwt-user", "", { ...config, maxAge: 0 });
  redirect("/signin");
}