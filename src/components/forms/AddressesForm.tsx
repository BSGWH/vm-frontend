"use client";
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Box, IconButton, Typography, Select, MenuItem } from "@mui/material";
import AddressAutocomplete from "@/components/dashboardComponents/AddessAutocomplete";

const FormSchema = z.object({
  addresses: z
    .array(
      z.object({
        state: z.string().min(2, { message: "State must be at least 2 characters." }),
        city: z.string().min(2, { message: "City must be at least 2 characters." }),
        addressline1: z.string().min(5, { message: "Street must be at least 5 characters." }),
        addressline2: z.string().optional(),
        zip: z.string().regex(/^\d{5}$/, { message: "Zip code must be exactly 5 digits." }),
        tag: z.string().min(2, { message: "Tag must be at least 2 characters." }).nonempty("Tag is required."),
      })
    )
    .nonempty("Must have at least one address."),
});

const USStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export function AddressesForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      addresses: [
        {
          state: "MA",
          city: "Boston",
          addressline1: "180 Franklin Street",
          addressline2: "",
          zip: "02110",
          tag: "Home",
        },
      ],
    },
    mode: 'onChange' // Ensure validation is triggered on change
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  function onSubmit(data: any) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const handleAddAddress = () => {
    append({
      state: "",
      city: "",
      addressline1: "",
      addressline2: "",
      zip: "",
      tag: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div>
          {fields.map((field, index) => (
            <Box key={field.id} mb={2} p={2} className="border rounded-lg">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" gutterBottom>
                  Address {index + 1}
                </Typography>
                <IconButton
                  color="secondary"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box display="flex" gap={2} alignItems={"center"} mb={1}>
                <FormField
                  control={form.control}
                  name={`addresses.${index}.addressline1`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <AddressAutocomplete
                          value={field.value}
                          onChange={(newAddress: { state: string; city: string; addressline1: string; addressline2: string; zip: string; tag: string; }) => form.setValue(`addresses.${index}`, newAddress)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>
              <Box display="flex" gap={2} alignItems={"center"} mb={1}>
                <FormField
                  control={form.control}
                  name={`addresses.${index}.addressline2`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>
              <Box display="flex" gap={2} alignItems={"center"} mb={1}>
                <FormField
                  control={form.control}
                  name={`addresses.${index}.city`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`addresses.${index}.state`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Select
                          labelId={`addresses.${index}.state-label`}
                          {...field}
                          label="State"
                          sx={{ height: '40px', display: 'flex', alignItems: 'center' }}
                        >
                          {USStates.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`addresses.${index}.zip`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`addresses.${index}.tag`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                        <Input placeholder="Tag" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>
            </Box>
          ))}
          <Button
            variant="outline"
            onClick={handleAddAddress}
          >
            Add Address
          </Button>
        </div>

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}