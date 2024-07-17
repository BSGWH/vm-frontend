import React, { useEffect, useRef, useState } from "react";
import useLoadScript from "@/hooks/useLoadScript";

declare global {
  interface Window {
    google: any;
    initAutocomplete?: () => void;
  }
}

interface AddressInfo {
  street_address_one: string;
  street_address_two: string;
}

interface ProviderAddressAutocompleteProps {
  value: AddressInfo;
  onChange: (newAddress: AddressInfo) => void;
  className?: string;
  disabled?: boolean;
}

const ProviderAddressAutocomplete: React.FC<
  ProviderAddressAutocompleteProps
> = ({ value, onChange, className, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [manualEntry, setManualEntry] = useState(false);

  useLoadScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_AUTOCOMPLETE_API_KEY}&libraries=places`
  );

  useEffect(() => {
    const handleScriptLoad = () => {
      if (!inputRef.current || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "us" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.address_components) {
          const streetNumber =
            place.address_components.find((c: any) =>
              c.types.includes("street_number")
            )?.long_name || "";
          const route =
            place.address_components.find((c: any) => c.types.includes("route"))
              ?.long_name || "";
          const streetAddress = `${streetNumber} ${route}`.trim();

          const address: AddressInfo = {
            street_address_one: streetAddress,
            street_address_two: value.street_address_two, // Preserve the existing street_address_two
          };
          onChange(address);
          setManualEntry(false);
        }
      });
    };

    if (window.google) {
      handleScriptLoad();
    } else {
      window.initAutocomplete = handleScriptLoad;
    }
  }, [onChange, value.street_address_two]);

  return (
    <input
      ref={inputRef}
      placeholder="Enter address"
      value={value.street_address_one}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
          onChange({ ...value, street_address_one: e.target.value });
          setManualEntry(true);
        }
      }}
      className={className}
      disabled={disabled}
    />
  );
};

export default ProviderAddressAutocomplete;
