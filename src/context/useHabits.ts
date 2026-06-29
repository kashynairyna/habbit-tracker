import { createContext, useContext } from "react";

export type Habit = { id: string; name: string; completions: Date[] };

type Context = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (name: string) => void;
  toggleHabit: (name: string, date: Date) => void;
  editHabit: (id: string) => void;
};

export const HabitContext = createContext<null | Context>(null);

export function useHabits() {
  const habitContext = useContext(HabitContext);
  if (habitContext == null) throw new Error("Null context");

  return habitContext;
}
