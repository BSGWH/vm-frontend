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
  city: string;
  state: string;
  zip: string;
}

interface ProviderAddressAutocompleteProps {
  value: AddressInfo;
  onChange: (newAddress: Partial<AddressInfo>) => void;
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
          const city =
            place.address_components.find((c: any) =>
              c.types.includes("locality")
            )?.long_name || "";
          const state =
            place.address_components.find((c: any) =>
              c.types.includes("administrative_area_level_1")
            )?.short_name || "";
          const zip =
            place.address_components.find((c: any) =>
              c.types.includes("postal_code")
            )?.long_name || "";

          const address: Partial<AddressInfo> = {
            street_address_one: `${streetNumber} ${route}`.trim(),
            city,
            state,
            zip,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const newValue = e.target.value;
      onChange({ ...value, street_address_one: newValue });
      setManualEntry(true);

      // If manual entry, clear other fields
      if (manualEntry) {
        onChange({
          ...value,
          street_address_one: newValue,
          city: "",
          state: "",
          zip: "",
        });
      }
    }
  };

  return (
    <input
      ref={inputRef}
      placeholder="Enter address"
      value={value.street_address_one}
      onChange={handleInputChange}
      className={className}
      disabled={disabled}
    />
  );
};

export default ProviderAddressAutocomplete;
