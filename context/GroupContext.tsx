import React, { createContext, ReactNode, useContext, useState } from "react";

type Group = {
  name: string;
  image?: string | null;
  friends?: any[];
  startTime?: number;
  endTime?: number;
};

type GroupContextType = {
  groups: Group[];
  addGroup: (group: Group) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const addGroup = (group: Group) => {
    setGroups((prev) => [...prev, group]);
  };

  return (
    <GroupContext.Provider value={{ groups, addGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
