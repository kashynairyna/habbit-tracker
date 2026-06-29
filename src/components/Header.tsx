import { isToday } from "date-fns/isToday";
import { useHabits } from "../context/useHabits";
import Button from "./Button";
import { format } from "date-fns";

type HeaderProperties = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};

export function Header({ visibleDates, onPrev, onNext }: HeaderProperties) {
  const { habits } = useHabits();

  const doneToday = habits.filter((h) => h.completions.some((c) => isToday(c)));

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(
    visibleDates.at(-1)!,
    "MMM d",
  )}`;
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">
          {doneToday.length} / {habits.length} done today
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400 text-sm">{dateRange}</span>
        <div className="flex items-center gap-3">
          <Button onClick={onPrev}>prev</Button>
          <Button
            onClick={onNext}
            disabled={visibleDates.some((d) => isToday(d))}
          >
            next
          </Button>
        </div>
      </div>
    </header>
  );
}
