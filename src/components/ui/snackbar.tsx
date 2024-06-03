import React, { useState, useEffect } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SnackbarProps {
  message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000); // Hide the alert after 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
      {/* <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded p-4 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}> */}

      <Alert className="flex items-center bg-accent border rounded-lg shadow-lg">
        <CheckCircleIcon className="h-6 w-6 " style={{ fill: 'green' }}/>
        <div className="ml-2">
          <AlertTitle className="text-green-700">Success!</AlertTitle>
          <AlertDescription className="">
            {/* {message} */}A new vehicle has been created! You will be
            redirected to the vehicle page shortly.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default Snackbar;
