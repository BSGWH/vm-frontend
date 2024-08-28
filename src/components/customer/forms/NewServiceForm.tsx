"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ServiceProviderTable } from "@/components/customer/dashboard/serviceComponents/ServiceProviderTable";

const FormSchema = z.object({
  vehicle: z.string().default("vehicle").optional(),
  service: z.string().default("service type").optional(),
  date: z.date({
    required_error: "A date of service is required.",
  }),
});

export function NewServiceForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: {
    //   vehicle: "vehicle 1",
    //   service: "oil change"
    // },
  });

  //   function onSubmit(data: z.infer<typeof FormSchema>) {
  const [showTable, setShowTable] = useState(false);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setShowTable(true);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="vehicle"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Vehicle</FormLabel>
                  <FormDescription>select one vehicle</FormDescription>
                </div>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Vehicle</SelectLabel>
                        <SelectItem value="vehicle 1">vehicle 1</SelectItem>
                        <SelectItem value="vehicle 2">vehicle 2</SelectItem>
                        <SelectItem value="vehicle 3">vehicle 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Service Type</FormLabel>
                  <FormDescription>select one service type</FormDescription>
                </div>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Service Type</SelectLabel>
                        <SelectItem value="service1">Fluid Changes</SelectItem>
                        <SelectItem value="service2">Tire Services</SelectItem>
                        <SelectItem value="service3">Air filters</SelectItem>
                        <SelectItem value="service4">
                          Wheel Alignments
                        </SelectItem>
                        <SelectItem value="service5">
                          Engine & Battery Services
                        </SelectItem>
                        <SelectItem value="service6">
                          Diagnostic Services
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of service</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="customerDefault" type="submit">Submit</Button>
        </form>
      </Form>

    

      {showTable && (
        <div>
          <ServiceProviderTable />
        </div>
      )}
    </div>
  );
}
