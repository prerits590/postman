import { useContext } from "react";
import { UiContext } from "./UiContext";

export const useUiContext = () => {
  return useContext(UiContext);
};
