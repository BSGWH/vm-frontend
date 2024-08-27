import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const messages = [
    {
        message_id: 1,
        title: "Add a vehicle to get started",
        content: "To begin managing your vehicles and services, please add a vehicle to your profile.",
        time: "2024-08-20 10:00 AM",
    },
    {
        message_id: 2,
        title: "Service Reminder",
        content: "Your vehicle's oil change is due on 2024-08-15. Please schedule a service.",
        time: "2024-08-10 09:30 AM",
    },
];

export function Messages() {
    const [expandedMessageId, setExpandedMessageId] = useState<number | null>(null);

    const toggleMessageDetails = (messageId: number) => {
        setExpandedMessageId(messageId === expandedMessageId ? null : messageId);
    };

    return (
        <Card className="h-1/2">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[calc(50vh-12rem)] pr-2" style={{ scrollbarGutter: "stable" }}>
                <div className="space-y-2">
                    {messages.map((message) => {
                        const formattedDate = new Date(message.time).toLocaleDateString(undefined, {
                            month: 'numeric',
                            day: 'numeric',
                        });

                        return (
                            <div
                                key={message.message_id}
                                className="space-y-2 cursor-pointer"
                                onClick={() => toggleMessageDetails(message.message_id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium leading-none">{message.title}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{formattedDate}</p>
                                    <Button variant="link" size="sm" className="ml-2">
                                        {expandedMessageId === message.message_id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </Button>
                                </div>
                                <AnimatePresence>
                                    {expandedMessageId === message.message_id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden bg-gray-100 p-4 rounded"
                                        >
                                            <p className="text-sm">{message.content}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <Separator className="mt-2" />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
