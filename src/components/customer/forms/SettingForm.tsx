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
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRightIcon } from "@radix-ui/react-icons";


const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  marketing_texts: z.boolean().default(false).optional(),
  // security_emails: z.boolean(),
	password: z.boolean().default(false).optional(),
	// two_factor_authentication: z.boolean().default(false).optional(),
	dark_mode: z.boolean().default(false).optional(),
	language: z.string().default("language").optional(),
});

export function SwitchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // security_emails: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="marketing_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Marketing Emails</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
                
              )}
            />
            <FormField
              control={form.control}
              name="marketing_texts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Marketing Texts</FormLabel>
                    <FormDescription>
                      Receive texts about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
                
              )}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium">Security</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Password</FormLabel>
                    <FormDescription>Change password</FormDescription>
                  </div>
                  <FormControl>
									<ChevronRightIcon className="h-4 w-4 opacity-50" style={{ marginTop : "0" }} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* 2FA Not Implemented
            <FormField
              control={form.control}
              name="two_factor_authentication"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Two Factor Authentication</FormLabel>
                    <FormDescription>Disabled</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            */}
            {/* Roles Management Not Implemented
						<FormField
              control={form.control}
              name="security_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Roles and permissions</FormLabel>
                    <FormDescription>Manage roles and permissions.</FormDescription>
                  </div>
                  <FormControl>
									<ChevronRightIcon className="h-4 w-4 opacity-50" style={{ marginTop : "0" }} />
                  </FormControl>
                </FormItem>
              )}
            />
            */}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium">General</h3>
          <div className="space-y-4">
            {/*
            <FormField
              control={form.control}
              name="dark_mode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Dark Mode</FormLabel>
                    <FormDescription>
                      Enabled
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Language</FormLabel>
                    <FormDescription>
                      English
                    </FormDescription>
                  </div>
                  <FormControl>
										<Select>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="English" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel className="text-gray-500"> - Language - </SelectLabel>
													<SelectItem value="english">English</SelectItem>
													<SelectItem value="español">Español</SelectItem>
													<SelectItem value="mandarin">Mandarin</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button variant="customerDefault" type="submit">Save</Button>
      </form>
    </Form>
  );
}
