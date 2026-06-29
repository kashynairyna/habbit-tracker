import { useHabits } from "../context/useHabits";
import Button from "./Button";
import { useState, type FormEvent } from "react";

export function HabitForm() {
  const [name, setName] = useState("");
  const { addHabit } = useHabits();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.trim() === "") return;
    setName("");
    addHabit(name);
  }

  return (
    <form className="flex gap-2 my-10" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="New habit..."
      />
      <Button
        disabled={name.trim() === ""}
        className="rounded-lg px-4 py-2 font-medium"
      >
        Add Habit
      </Button>
    </form>
  );
}
