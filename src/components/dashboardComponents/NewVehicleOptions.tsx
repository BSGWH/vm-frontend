"use client";

import NumbersIcon from "@mui/icons-material/Numbers";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VinForm2 } from "../forms/VinForm";
import VehicleForm from "../forms/VehicleForm";
import { CarMakeWithModels } from "@/types/car";
import React from "react"; 
import { NextRouter } from "next/router";

interface AddMethod {
  title: string;
	subtitle:string;
  description: string;
  icon: JSX.Element;
  form: JSX.Element;
}

interface NewVehicleOptionsProps {
	makesWithModels: CarMakeWithModels[];
}

const NewVehicleOptions: React.FC<NewVehicleOptionsProps> = ({ makesWithModels }) => {
	const options: AddMethod[] = [
		{
			title: "VIN",
			subtitle: "(Recommended)",
			description: "Enter the Vehicle Identification Number (VIN), and the vehicle details, such as make, model, and year, will be automatically populated.",
			icon: <NumbersIcon className="w-14 h-14 fill-primary" />,
			form: <VinForm2 />,
		},
		{
			title: "Year Make Model",
			subtitle: "",
			description: "Enter by year, make and model.",
			icon: <DirectionsCarIcon className="w-14 h-14 fill-primary" />,
			form: <VehicleForm makesWithModels={makesWithModels} />,
		},
	];
	
  return (
    <div className="pt-8">
      <Accordion type="single" collapsible className="flex flex-col gap-6">
        {options.map(
          (
            { icon, title,subtitle, description, form }: AddMethod,
            index: number
          ) => (
            <Card key={index}>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="pr-4 hover:no-underline">
                  <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4 items-center">
                    <div className="bg-primary/20 p-2 rounded-full">{icon}</div>
                    <div className="flex flex-col items-start">
                      <CardTitle>{title} <span className="text-muted-foreground">{subtitle}</span></CardTitle>
                      <CardDescription className="text-left">{description}</CardDescription>
                    </div>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent className="p-4">{form}</AccordionContent>
              </AccordionItem>
            </Card>
          )
        )}
      </Accordion> 
    </div>
  );
}

export default NewVehicleOptions;