"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import React, { useEffect, useState } from "react";
import axios from "axios"
import EditIcon from "@mui/icons-material/Edit";
const FormSchema = z.object({
  
	first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone_number: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
})

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export function ProfileForm() {

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    first_name: "no data",
    last_name: "no data",
    email: "",
    phone_number:"no data"
  });
  
  const [originalProfile, setOriginalProfile] = useState<Profile>(profile);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/v1/users/profile");
        const newProfile = {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          phone_number: response.data.phone_number,
        };
        setProfile(newProfile);
        setOriginalProfile(newProfile);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }finally {
        setIsLoading(false);
      }
      }
    fetchProfile();
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setProfile(originalProfile);
    setHasChanges(false);
  };

  const handleSaveClick = async () => {
    try {
      await axios.patch("/api/v1/users/profile", {
        first_name: profile.first_name,
        last_name:profile.last_name,
        email:profile.email,
        phone_number: profile.phone_number
      });
      setOriginalProfile(profile);
      setIsEditing(false);
      setHasChanges(false);
      console.log(isEditing)
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedProfile = { ...profile, [name]: value };
    setProfile(updatedProfile);
    setHasChanges(
      updatedProfile.first_name !== originalProfile.first_name ||
      updatedProfile.last_name !== originalProfile.last_name ||
      updatedProfile.email !== originalProfile.email ||
      updatedProfile.phone_number !== originalProfile.phone_number
    );
  };

  const renderInfoRow = (label: string, value: string, name: keyof Profile) => (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input 
            {...field}
            value={value}
            onChange={handleChange}
            disabled={!isEditing} 
            className={`text-sm bg-transparent h-8 ${
              isEditing ? "border border-gray-300 px-2 rounded-md" : "border-transparent px-2"
            }`} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
    );
  

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
			first_name: "No Data",
			last_name: "No Data",
			phone_number: "No Data",
    },
  })

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   })
  // }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-10 mb-2">
        <p className="text-lg font-bold">User Information</p>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button
              variant="customerDefault"
              size="sm"
              onClick={handleSaveClick}
              className={`${hasChanges ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
              disabled={!hasChanges}
            >
              Save
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={handleEditClick}>
            Edit
            <EditIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    <Form {...form}>
      <form className="w-2/3 space-y-6">
				<div className="grid grid-flow-col justify-stretch gap-8">
        {renderInfoRow("First Name", profile.first_name, "first_name")}
        {renderInfoRow("Last Name", profile.last_name, "last_name")}
				</div>

        {renderInfoRow("Email", profile.email, "email")}
        {renderInfoRow("Phone Number", profile.phone_number, "phone_number")}
      </form>
    </Form>
    </div>
  )
}
