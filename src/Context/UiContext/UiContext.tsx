import { createContext, useState } from "react";
import { UiDataContextValue } from "../Types";

export const UiContext = createContext<UiDataContextValue>(
  {} as UiDataContextValue
);
export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <UiContext.Provider value={{ isDark, isLoading, setIsDark, setIsLoading }}>
      {children}
    </UiContext.Provider>
  );
};
