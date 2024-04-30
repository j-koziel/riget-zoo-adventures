import React from "react";

const initialState = {
  textSize: "normal",
  setTheme: () => null,
};

const TextSizeProviderContext = React.createContext(initialState);

export function TextSizeProvider({
  children,
  defaultTextSize = "normal",
  storageKey = "textSize",
  ...props
}) {
  const [textSize, setTextSize] = React.useState(
    () => localStorage.getItem(storageKey) || defaultTextSize
  );

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("small", "normal", "large");

    root.classList.add(textSize);
  }, [textSize]);

  const value = {
    textSize,
    setTextSize: (textSize) => {
      localStorage.setItem(storageKey, textSize);
      setTextSize(textSize);
    },
  };

  return (
    <TextSizeProviderContext.Provider {...props} value={value}>
      {children}
    </TextSizeProviderContext.Provider>
  );
}

export const useTextSize = () => {
  const context = React.useContext(TextSizeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a TextSizeProvider");

  return context;
};
