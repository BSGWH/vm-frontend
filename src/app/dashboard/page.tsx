
import { CalendarDateRangePicker } from "@/components/dashboardComponents/date-range-picker";
import { Overview } from "@/components/dashboardComponents/overview";
import { Reminder } from "@/components/ui/reminder";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MessageBoard } from "@/components/ui/messageBoard";

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back!
          </h2>
          <div className="hidden md:flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-m font-medium">
                    Vehicles
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AddCircleOutlineIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a vehicle</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                 
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-m font-medium">
                    Scheduled Serv
                  </CardTitle>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                      <AddCircleOutlineIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a scheduled service</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-m font-medium">Documents</CardTitle>
                 <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AddCircleOutlineIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a document</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-m font-medium">
                    Completed Servs
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AddCircleOutlineIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a completed service</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex">7</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-9">
              <Card className="col-span-9">
                  <CardHeader>
                    <CardTitle>2023 Total Cost By Month</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <Card className="w-full">
                <CardHeader>
                  <CardTitle>Reminder</CardTitle>
                </CardHeader>
                <CardContent>
                  <Reminder />
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                 <CardTitle>Message Board</CardTitle>
                </CardHeader>
                <CardContent>
                  <MessageBoard />
                </CardContent>
              </Card>

            </div>

          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}