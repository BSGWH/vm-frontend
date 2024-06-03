import { useEffect, useState } from 'react';

const useLoadScript = (src) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        // 检查脚本是否已存在
        const scriptExists = document.querySelector(`script[src="${src}"]`);
        if (scriptExists) {
            setIsScriptLoaded(true);
            return;
        }

        // 创建脚本元素
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;

        // 脚本加载完成后的回调
        script.onload = () => {
            setIsScriptLoaded(true);
        };

        // 脚本加载错误时的回调
        script.onerror = () => {
            console.error(`Failed to load script: ${src}`);
        };

        // 将脚本添加到文档中
        document.head.appendChild(script);

        // 在组件卸载时移除脚本
        return () => {
            document.head.removeChild(script);
        };
    }, [src]);

    return isScriptLoaded;
};

export default useLoadScript;
