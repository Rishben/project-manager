import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

// Keep this import, even if not directly called, as `buttonVariants` is defined here
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      modifiersClassNames={{
        outside: "text-zinc-500 dark:text-zinc-600 opacity-70"
      }}
      showOutsideDays={showOutsideDays}
      className={cn("p-4 relative", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-0 w-full ",
        month: "space-y-4 w-full items-center justify-center",
        caption: "flex justify-between items-center px-4 relative",
        caption_label:
          "text-sm font-medium text-center flex items-center justify-center w-full",
        nav: "flex items-center gap-1 absolute left-4 right-4 justify-between",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "w-6 h-6 p-0 text-muted-foreground hover:text-foreground"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",

        table: "w-full border-collapse",

        head_row: "flex w-full",

        head_cell:
          "text-muted-foreground text-xs !text-red-500 !border-2 font-medium text-center flex items-center justify-center h-8 w-[calc(100%/7)]",

        row: "flex w-full mt-2 flex-wrap",

        cell: cn(
          "relative w-[calc(100%/7)] h-10 ",
          "p-2",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),

        day_outside: "day-outside text-zinc-400 dark:text-zinc-600 opacity-70",

        day:cn(
          "pr-2 pl-2 pt-2 font-normal aria-selected:opacity-100",

          "pl-4 items-center justify-center rounded-md text-sm",
          "disabled:pointer-events-none disabled:opacity-50",
          "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        ),

        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("w-4 h-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("w-4 h-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };

