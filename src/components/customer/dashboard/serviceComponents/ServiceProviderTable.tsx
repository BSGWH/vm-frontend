import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Button } from "@/components/ui/button"
import { SocialDistance } from "@mui/icons-material"
import { useState } from "react"
import axios from 'axios';
import {Provider} from "@/types/provider"
  
  const providers = [
    {
      name: "provider 1",
      distance: "2 mile",
      price: 250,
      time_slots: ["9:00am-10:00am","1:30pm-2:30pm"]
    },
    {
        name: "provider 2",
        distance: "2.5 mile",
        price: 200,
        time_slots: ["9:00am-10:00am","1:30pm-2:30pm"]
    },
    {
        name: "provider 3",
        distance: "2.3 mile",
        price: 213,
        time_slots: ["9:00am-10:00am","1:30pm-2:30pm"]
    },
    {
        name: "provider 4",
        distance: "1.8 mile",
        price: 200,
        time_slots: ["9:00am-10:00am","1:30pm-2:30pm"]
    },
    {
        name: "provider 5",
        distance: "2 mile",
        price: 190,
        time_slots: ["9:00am-10:00am","1:30pm-2:30pm"]
    },
  ]
  
  export function ServiceProviderTable() {

    const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: string }>({});

  const handleTimeChange = (providerName: string, time: string) => {
    setSelectedTimes((prev) => ({ ...prev, [providerName]: time }));
  };

  const handleSubmit = async (provider: Provider) => {
    const data = {
      name: provider.name,
      price:provider.price,
      time: selectedTimes[provider.name]
    };

    try {
      const response = await axios.post('/api/bookService', data);
      console.log('Service booked successfully:', response.data);
      // Optionally show a success message or perform other actions
    } catch (error) {
      console.error('Error booking service:', error);
      // Optionally show an error message or perform other actions
    }
  };

    return (
      <Table>
        <TableCaption>a list of available auto shops.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.name}>
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell>{provider.distance}</TableCell>
              <TableCell>{provider.price}</TableCell>
              <TableCell>
                <Select onValueChange={(value) => handleTimeChange(provider.name, value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Available Time</SelectLabel>
                    {provider.time_slots.map((time, index) => (
                      <SelectItem key={index} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </TableCell>
                <TableCell>
                    <Button onClick={() => handleSubmit(provider)}>Book</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  