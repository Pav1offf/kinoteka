import React, { useState, createContext, useRef } from "react";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [isOpen, setIsOpen] = useState(false);
  const startX = useRef(0);
  const endX = useRef(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    endX.current = 0;
  };

  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches[0].clientX;
    const distance = endX.current - startX.current;

    if (distance > minSwipeDistance) {
      setIsOpen(true);
    } else if (distance < -minSwipeDistance) {
      setIsOpen(false);
    } else {
    }
  };

  const contextValue = {
    theme,
    toggleTheme,
    isOpen,
    handleTouchStart,
    handleTouchEnd,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
