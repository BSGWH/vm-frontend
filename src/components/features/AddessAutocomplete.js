import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import useLoadScript from '@/hooks/useLoadScript';

const AddressAutocomplete = ({ value, onChange, disabled }) => {
    const inputRef = useRef(null);
    const [manualEntry, setManualEntry] = useState(false); // Check if it's typed manually

    useLoadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCzMsKBStfaN6gAYSmzV1rz5cCkfw1JpIc&libraries=places`);

    useEffect(() => {
        const handleScriptLoad = () => {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['address'],
                componentRestrictions: { country: 'us' },
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.address_components) {
                    const streetNumber = place.address_components.find(c => c.types.includes('street_number'))?.long_name || '';
                    const route = place.address_components.find(c => c.types.includes('route'))?.long_name || '';
                    const streetAddress = `${streetNumber} ${route}`.trim();

                    const address = {
                        street: streetAddress,
                        city: place.address_components.find(c => c.types.includes('locality'))?.long_name || '',
                        state: place.address_components.find(c => c.types.includes('administrative_area_level_1'))?.short_name || '',
                        zip_code: place.address_components.find(c => c.types.includes('postal_code'))?.long_name || '',
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
    }, [onChange]);

    return (
        <Input
            ref={inputRef}
            placeholder="Enter address"
            value={value.street}
            onChange={(e) => {
                onChange({ ...value, street: e.target.value });
                setManualEntry(true);
            }}
            disabled={disabled}
        />
    );
};

export default AddressAutocomplete;
