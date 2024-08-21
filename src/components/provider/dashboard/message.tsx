
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Message() {
  const message = [
    {
      name: "Jacob Newman",
      text: "Confirmed for Monday.",
      time: "10:27",
    },
    {
      name: "Marc Jones",
      text: "Thank you, confirmed.",
      time: "09:30",
    },
    {
      name: "Emily Pierson",
      text: "What's the availbility? Could it be tomorrow?",
      time: "08:01",
    },
  ];

  return (
    <div className=" mx-auto xsm:p-4 space-y-8">
      {message.slice(0, 3).map((msg, index) => (
        <MessageItems
          key={index}
          name={msg.name}
          text={msg.text}
          time={msg.time}
        />
      ))}
    </div>
  );
}

function MessageItems({ name, text, time }: { name: string; text: string; time: string }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <Avatar className="flex h-9 w-9 border my-auto">
          <AvatarFallback />
        </Avatar>
        <div className="flex flex-col">
          <div className="flex">
            <p className="w-[150px] text-md font-medium">{name}</p>
            <p className="hidden xsm:block text-muted-foreground">{time}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{text}</p>
          </div>
        </div>

      </div>
      <div>
        <Button variant={"providerOutline"}>Reply</Button>
      </div>
    </div>

  )
}