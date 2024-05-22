"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CarMakeWithModels, CarModel } from "@/types/car";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { getRailsURL } from "@/lib/utils";
import { useRouter } from 'next/navigation';


const FormSchema = z.object({
  make_id: z.string({
    required_error: "Please select an car make.",
  }),
  model_id: z.string({
    required_error: "Please select an brand.",
  }),
  color: z.string({
    required_error: "Please enter the color of your car.",
  }),
  year: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid 4-digit year.",
  }),
});

interface VehicleFormProps {
  makesWithModels: CarMakeWithModels[];
}

const VehicleForm: React.FC<VehicleFormProps> = ({ makesWithModels }) => {
  const formRouter = useRouter();
	const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [modelOptions, setModelOptions] =
    useState<CarMakeWithModels[]>(makesWithModels);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // filter model options after a make is selected
  useEffect(() => {
    if (selectedMake.length) {
      const filteredModels = makesWithModels.filter(
        (make) => String(make.make_id) === selectedMake
      );
      setModelOptions(filteredModels);
    }
  }, [selectedMake]);

  // set selected make after a model is selected
  useEffect(() => {
    if (selectedModel.length !== 0 && selectedMake.length === 0) {
      for (const carMake of makesWithModels) {
        const foundModel = carMake.models.find(
          (model) => String(model.model_id) === selectedModel
        );
        if (foundModel) {
          setSelectedMake(String(carMake.make_id));
        }
      }
    }
  }, [selectedModel]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = JSON.stringify(data, null);
    const path = "/vehicles";

    try {
      const response = await fetch(`${getRailsURL()}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await response.json();
      console.log(data);
			formRouter.push(`${data.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="make_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedMake(value);
                }}
                defaultValue={field.value}
                value={selectedMake}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your car make" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {makesWithModels.map(
                    ({ make_id, make_name }: CarMakeWithModels) => (
                      <SelectItem
                        key={`make-id-${make_id}`}
                        value={String(make_id)}
                      >
                        {make_name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);

                  setSelectedModel(value);
                }}
                defaultValue={field.value}
                value={selectedModel}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your car model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {modelOptions.map(
                    ({ make_id, make_name, models }: CarMakeWithModels) => (
                      <SelectGroup key={`group-make-id-${make_id}`}>
                        <SelectLabel className="pl-2 py-2">
                          {make_name}
                        </SelectLabel>
                        {models.map(({ model_name, model_id }: CarModel) => (
                          <SelectItem
                            key={`madel-id-${model_id}`}
                            value={String(model_id)}
                          >
                            {model_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Enter the color of your car" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="Enter the year of your car" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default VehicleForm;
