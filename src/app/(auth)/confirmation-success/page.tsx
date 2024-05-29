import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ConfirmSuccess() {
  return (
    <div className="flex space-x-2">
      <CheckCircleIcon style={{ fontSize: "2rem", color: "#4CAF50" }} />
      <p className="text-2xl">Your email has been successfully confirmed</p>
    </div>
  );
}
