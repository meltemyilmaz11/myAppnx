import { Stack } from "expo-router";
import { GroupProvider } from "../context/GroupContext";

export default function Layout() {
  return (
    <GroupProvider>
      <Stack />
    </GroupProvider>
  );
}

