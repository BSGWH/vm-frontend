import { useEffect, useState } from 'react';

const useLoadScript = (src) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        const scriptExists = document.querySelector(`script[src="${src}"]`);
        if (scriptExists) {
            setIsScriptLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            setIsScriptLoaded(true);
        };

        script.onerror = () => {
            console.error(`Failed to load script: ${src}`);
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [src]);

    return isScriptLoaded;
};

export default useLoadScript;
