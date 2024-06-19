"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "../ui/modal";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRailsURL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Snackbar from "../ui/snackbar";

const FormSchema = z.object({
  vin: z.string().regex(/^\w{17}$/, {
    message:
      "Invalid VIN number format. Please enter a valid 17-character VIN.",
  }),
});

export function VinForm2() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [decodedData, setDecodedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<any>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const formRouter = useRouter();

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function processApiData(data: any) {
    interface KeyMap {
      [key: string]: string;
    }

    const keyMap: KeyMap = {
      Make: "make_name",
      Model: "model_name",
      "Model Year": "year",
    };

    const filteredData = data.filter((item: any) => {
      return Object.keys(keyMap).includes(item.Variable);
    });

    const formData: Record<string, string> = filteredData.reduce(
      (acc: Record<string, string>, curr: any) => {
        const newKey = keyMap[curr.Variable] || curr.Variable; // Use the mapped key if available, otherwise use the original key
        acc[newKey] = curr.Value;
        return acc;
      },
      {}
    );

    return formData;
  }

  async function handleSubmit() {
    const payload: { [key: string]: string } = {};
    for (const key in confirmationData) {
      if (confirmationData.hasOwnProperty(key)) {
        const value = confirmationData[key].value;
        const name = confirmationData[key].name
        payload[name] = value;
      }
    }

    console.log(payload)

    const path = "/vehicles/create_with_vin";

    try {
      const response = await fetch(`${getRailsURL()}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await response.json();
      console.log(data);
      toggleModal();
      setSnackbarMessage('A new vehicle has been created! You will be redirected to the vehicle page shortly!');

      setTimeout(() => {
        formRouter.push(`${data.id}`); // Redirect to another page
      }, 10);
      // formRouter.push(`${data.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Handle form submission here (e.g., send VIN to backend)
    console.log("VIN submitted:", data);
    // Optionally, clear the form after submission
    const vin = data.vin;

    try {
      const res = await fetch("http://localhost:4000/vehicles/vin_lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin: vin }),
      });
      if (res.ok) {
        const data = await res.json();

        console.log(data.result);

        if (data.result === "success") {
          const confirmationArry = Object.values(JSON.parse(data.data));
          console.log(JSON.parse(data.data));
          setConfirmationData(confirmationArry);
          setModalIsOpen(true);
        } else {
          if (data.message === "no valid response") {
            setError(
              "Unable to retrieve vehicle information. Please check the VIN and try again."
            );
          } else if (data.message === "vehicle already exists") {
            setError(
              "Vehicle already exists. Please try entering a new VIN number or navigate to 'My Vehicles' to manage your existing vehicles."
            );
          }
        }
      } else {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="vin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VIN</FormLabel>
                <FormControl>
                  <Input
                    onFocus={() => setError(null)}
                    placeholder="Enter the Vehicle Identification Number (VIN)"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  A VIN is composed of 17 characters (digits and capital
                  letters) that act as a unique identifier for the vehicle.
                </FormDescription>
                <FormMessage />
                {error && (
                  <p className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {decodedData && (
        <div>
          <h2>Decoded Data</h2>
          <table
            style={{ borderCollapse: "collapse", border: "1px solid black" }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Variable</th>
                <th style={{ border: "1px solid black" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {decodedData.Results.map((result: any, index: number) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black" }}>
                    {result.Variable}
                  </td>
                  <td style={{ border: "1px solid black" }}>{result.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
        <Card className="w-full border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-center">Vehicle Details</CardTitle>
            <CardDescription>
              Confirm details to add a new vehicle
            </CardDescription>
          </CardHeader>
          <CardContent>
            {confirmationData && (
              <div className="space-y-4">
                {confirmationData.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
                  >
                    <p className="text-gray-700">
                      <strong className=" font-semibold">
                        {item.display_name}:
                      </strong>{" "}
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={toggleModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Confirm</Button>
          </CardFooter>
        </Card>
      </Modal>
      {snackbarMessage && <Snackbar message={snackbarMessage} />}
    </div>
  );
}
