"use client";

import { FilterType } from "@/types/filters";
import { ReactNode, createContext, useContext, useState } from "react";

const FilterTypeContext = createContext({
  type: FilterType.ALL,
  setType: (value: FilterType) => {},
});

interface FilterTypeProps {
  children: ReactNode;
}

export function FilterContextProvider({ children }: FilterTypeProps) {
  const [type, setType] = useState(FilterType.ALL);

  return (
    <FilterTypeContext.Provider value={{ type, setType }}>
      {children}
    </FilterTypeContext.Provider>
  );
}

export function useFilterType() {
  return useContext(FilterTypeContext);
}
