import { createContext, useState } from "react";
import { UiDataContextValue } from "../Types";

export const UiContext = createContext<UiDataContextValue>(
  {} as UiDataContextValue
);
export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [viewMode, setViewMode] = useState<"tile" | "list">("tile");
  const [sortType, setSortType] = useState<"alphabatically" | "date">("date");
  return (
    <UiContext.Provider
      value={{
        isDark,
        isLoading,
        showTooltip,
        viewMode,
        sortType,
        setIsDark,
        setIsLoading,
        setShowTooltip,
        setViewMode,
        setSortType,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
