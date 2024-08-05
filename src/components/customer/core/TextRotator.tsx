import React, { useState, useEffect } from 'react';
import styles from './TextRotator.module.css';

const TextRotator = ({ texts, animation = 'rotate', speed = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setShow(true);
      }, 500); // Duration of the hide animation
    }, speed);

    return () => clearInterval(interval);
  }, [texts, speed]);

  return (
    <span className={`${styles.rotating} ${show ? styles[animation] : ''}`} style={{ whiteSpace: "nowrap" }}>
      {texts[currentTextIndex]}
    </span>
  );
};

export default TextRotator;
