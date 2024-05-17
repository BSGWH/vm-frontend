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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Handle form submission here (e.g., send VIN to backend)
    console.log("VIN submitted:", data);
    // Optionally, clear the form after submission
    const vin = data.vin;

    try {
      const res = await fetch("http://localhost:4000/vehicles/vin_lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"vin": vin }),})
        if (res.ok) {
          const data = await res.json();
          console.log(data)
        } else {
          throw new Error("Failed to submit data")
        }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    

    // try {
    //   const response = await fetch(
    //     `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}?format=json`
    //   );

    //   if (!response.ok) {
    //     throw new Error("Failed to fetch data");
    //   }

    //   const data = await response.json();
    //   setDecodedData(data);
    //   setError(null);
    //   console.log("Decoded data:", data);
    //   const processedData = processApiData(data.Results)
    //   console.log(processedData);
    // } catch (error) {
    //   setError("Failed to fetch data. Please try again.");
    //   console.error("Error fetching data:", error);
    // }
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
                    placeholder="Enter the Vehicle Identification Number (VIN)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A VIN is composed of 17 characters (digits and capital
                  letters) that act as a unique identifier for the vehicle.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {error && <p>{error}</p>}
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
      <Button onClick={toggleModal}>Open</Button>
      <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
        <h2>Modal Content</h2>
        {/* <p>This is the content of the modal.</p> */}
      </Modal>
    </div>
  );
}
