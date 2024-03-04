import { useContext } from "react";
import { DataContext } from "./DataContext";

export const useDataContext = () => {
  return useContext(DataContext);
};
