import React from "react";

interface MessageProps {
  message: string | null;
}

export function Message({ message }: MessageProps) {
  if (!message) return null;
  return <div className="text-pink-500 text-md italic py-2">{message}</div>;
}
