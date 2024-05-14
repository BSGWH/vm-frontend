"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";

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
 
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
export function VinForm2() {
  const [decodedData, setDecodedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const VinForm: React.FC = () => {
  const [vin, setVin] = useState<string>("");
  const [decodedData, setDecodedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVin(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here (e.g., send VIN to backend)
    console.log("VIN submitted:", vin);
    // Optionally, clear the form after submission
    setVin("");

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}?format=json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setDecodedData(data);
      setError(null);
      console.log("Decoded data:", data);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vin">Enter VIN:</label>
        <input
          type="text"
          id="vin"
          name="vin"
          value={vin}
          onChange={handleChange}
          placeholder="Enter VIN number"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {decodedData && (
        <div>
          <h2>Decoded Data</h2>
      <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }}>Variable</th>
            <th style={{ border: '1px solid black' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {decodedData.Results.map((result: any, index: number) => (
            <tr key={index}>
              <td style={{ border: '1px solid black' }}>{result.Variable}</td>
              <td style={{ border: '1px solid black' }}>{result.Value}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      )}
    </div>
  );
};

export default VinForm;
