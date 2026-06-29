import { isSameDay } from "date-fns";
import { type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";

type HabitProviderProps = {
  children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);

  function addHabit(name: string) {
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      completions: [],
    };
    setHabits((current) => [...current, newHabit]);
  }

  function editHabit(id: string) {
    const newTitle = prompt("Enter new title for this habit:");

    if (newTitle && newTitle.trim() !== "") {
      setHabits((current) =>
        current.map((habit) =>
          habit.id === id ? { ...habit, name: newTitle } : habit,
        ),
      );
    }
  }

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((current) =>
      current.map((h) => {
        if (h.id !== id) return h;

        const alreadyDone = h.completions.some((c) => isSameDay(c, date));
        const completions = alreadyDone
          ? h.completions.filter((c) => !isSameDay(c, date))
          : [...h.completions, date];

        return { ...h, completions };
      }),
    );
  }

  return (
    <HabitContext
      value={{ habits, addHabit, deleteHabit, toggleHabit, editHabit }}
    >
      {children}
    </HabitContext>
  );
}
