"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Box, IconButton, Typography, Select, MenuItem } from "@mui/material";
import AddressAutocomplete from "@/components/features/AddessAutocomplete";
import React, { useEffect, useState } from "react";
import axios from "axios"
import EditIcon from "@mui/icons-material/Edit";

interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
}

const FormSchema = z.object({
  addresses: z
    .array(
      z.object({
        state: z.string().min(2, { message: "State must be at least 2 characters." }),
        city: z.string().min(2, { message: "City must be at least 2 characters." }),
        street: z.string().min(5, { message: "Street must be at least 5 characters." }),
        zip_code: z.string().regex(/^\d{5}$/, { message: "Zip code must be exactly 5 digits." }),
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
          street: "180 Franklin Street",
          zip_code: "02110",
        },
      ],
    },
    mode: 'onChange' // Ensure validation is triggered on change
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState<Address>({
    street: "no data",
    city: "",
    state: "",
    zip_code: ""
  });
  const [originalAddress, setOriginalAddress] = useState<Address>(address);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  
  useEffect(() => {
    const fetchAddressInfo = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/profile/address");
        const newAddress = {
          street: data.street,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
        };
        setAddress(newAddress);
        setOriginalAddress(newAddress);
      } catch (error) {
        console.error("Error fetching address info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddressInfo();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    setAddress(originalAddress);
    setHasChanges(false);
  };

  const handleSaveClick = async () => {
    try {
      await axios.patch("/api/v1/users/profile/address", {
        street: address.street,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
      });
      setOriginalAddress(address);
      setIsEditing(false);
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving address info:", error);
    }
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   const updatedAddress = { ...address, [name]: value };
  //   setAddress(updatedAddress);
  //   setHasChanges(
  //     updatedAddress.street !== originalAddress.street ||
  //     updatedAddress.city !== originalAddress.city ||
  //     updatedAddress.state !== originalAddress.state ||
  //     updatedAddress.zip_code !== originalAddress.zip_code
  //   );
  // };

  // const handleChange = (index, newAddress) => {
  //   form.setValue(`addresses.${index}`, newAddress);
    
  
  //   setHasChanges(
  //     newAddress.street !== originalAddress.street ||
  //     newAddress.city !== originalAddress.city ||
  //     newAddress.state !== originalAddress.state ||
  //     newAddress.zip_code !== originalAddress.zip_code
  //   );
  // };

  const handleAddAddress = () => {
    append({
      state: "",
      city: "",
      street: "",
      zip_code: ""
    });
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-10 mb-2">
        <p className="text-lg font-bold">Address Information</p>
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

      <div>
      <Form {...form}>
      <form className="w-2/3 space-y-6">
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 p-2 border-none rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h6 className="text-lg font-bold">Address {index + 1}</h6>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <DeleteIcon />
                </button>
              </div>
              <div className="flex gap-2 items-center mb-4">
                <FormField
                  control={form.control}
                  name={`addresses.${index}.street`}
            
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <AddressAutocomplete
                          value={field.value}
                          onChange={(newAddress: { state: string; city: string; street: string; zip_code: string; }) => form.setValue(`addresses.${index}`, newAddress)}
          
     
                          disabled={!isEditing}

                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 items-center mb-4">
                <FormField
                  control={form.control}
                  name={`addresses.${index}.city`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" disabled={!isEditing} {...field} />
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
                          disabled={!isEditing}
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
                  name={`addresses.${index}.zip_code`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip Code" disabled={!isEditing} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          {isEditing?(<Button
            variant="customerOutline"
            onClick={handleAddAddress}
            type="button"
          >
            Add Address
          </Button>)
          :(<div></div>)}
        </div>
      </form>
    </Form>
    
</div>
</div>
)};
