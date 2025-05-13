"use client"

import * as React from "react"
import { addDays, format, getDay, isSameDay, parse, startOfWeek } from "date-fns"
import {
  Calendar as CalendarIcon,
  ChevronsDown,
  ChevronsUp,
  Clock,
  AlertTriangle,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { ClassValue } from "clsx"

// This is a stub implementation to satisfy the component's dependencies
const utils = {
  cn: (...args: ClassValue[]) => args.join(" ")
};

// Mock UI components
const UIButton = (props: any) => <button {...props}>{props.children}</button>
const UICalendar = (props: any) => <div {...props}>{props.children}</div>
const UIDialog = (props: any) => <div {...props}>{props.children}</div>
const UIDialogClose = (props: any) => <button {...props}>{props.children}</button>
const UIDialogContent = (props: any) => <div {...props}>{props.children}</div>
const UIDialogDescription = (props: any) => <div {...props}>{props.children}</div>
const UIDialogFooter = (props: any) => <div {...props}>{props.children}</div>
const UIDialogHeader = (props: any) => <div {...props}>{props.children}</div>
const UIDialogTitle = (props: any) => <div {...props}>{props.children}</div>
const UIDropdownMenu = (props: any) => <div {...props}>{props.children}</div>
const UIDropdownMenuContent = (props: any) => <div {...props}>{props.children}</div>
const UIDropdownMenuItem = (props: any) => <div {...props}>{props.children}</div>
const UIDropdownMenuTrigger = (props: any) => <div {...props}>{props.children}</div>
const UIInput = (props: any) => <input {...props} />
const UILabel = (props: any) => <label {...props}>{props.children}</label>
const UIPopover = (props: any) => <div {...props}>{props.children}</div>
const UIPopoverContent = (props: any) => <div {...props}>{props.children}</div>
const UIPopoverTrigger = (props: any) => <div {...props}>{props.children}</div>
const UISelect = (props: any) => <div {...props}>{props.children}</div>
const UISelectContent = (props: any) => <div {...props}>{props.children}</div>
const UISelectItem = (props: any) => <div {...props}>{props.children}</div>
const UISelectTrigger = (props: any) => <div {...props}>{props.children}</div>
const UISelectValue = (props: any) => <div {...props}>{props.children}</div>
const UITextarea = (props: any) => <textarea {...props} />
const UITooltip = (props: any) => <div {...props}>{props.children}</div>
const UITooltipContent = (props: any) => <div {...props}>{props.children}</div>
const UITooltipTrigger = (props: any) => <div {...props}>{props.children}</div>

type EventColors =
  | "sky"
  | "emerald"
  | "violet"
  | "amber"
  | "rose"
  | "slate"
  | "orange"

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  allDay?: boolean
  color?: EventColors
  location?: string
}

const colorMap: Record<EventColors, string> = {
  sky: "bg-sky-100 text-sky-700 hover:bg-sky-200 hover:text-sky-800 border-sky-500 dark:bg-sky-800/30 dark:text-sky-300 dark:hover:bg-sky-800/40 dark:hover:text-sky-300 dark:border-sky-300/60",
  emerald:
    "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800 border-emerald-500 dark:bg-emerald-800/30 dark:text-emerald-300 dark:hover:bg-emerald-800/40 dark:hover:text-emerald-300 dark:border-emerald-300/60",
  violet:
    "bg-violet-100 text-violet-700 hover:bg-violet-200 hover:text-violet-800 border-violet-500 dark:bg-violet-800/30 dark:text-violet-300 dark:hover:bg-violet-800/40 dark:hover:text-violet-300 dark:border-violet-300/60",
  amber:
    "bg-amber-100 text-amber-700 hover:bg-amber-200 hover:text-amber-800 border-amber-500 dark:bg-amber-800/30 dark:text-amber-300 dark:hover:bg-amber-800/40 dark:hover:text-amber-300 dark:border-amber-300/60",
  rose: "bg-rose-100 text-rose-700 hover:bg-rose-200 hover:text-rose-800 border-rose-500 dark:bg-rose-800/30 dark:text-rose-300 dark:hover:bg-rose-800/40 dark:hover:text-rose-300 dark:border-rose-300/60",
  slate:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-800 border-slate-500 dark:bg-slate-800/30 dark:text-slate-300 dark:hover:bg-slate-800/40 dark:hover:text-slate-300 dark:border-slate-300/60",
  orange:
    "bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-800 border-orange-500 dark:bg-orange-800/30 dark:text-orange-300 dark:hover:bg-orange-800/40 dark:hover:text-orange-300 dark:border-orange-300/60",
}

interface EventCalendarProps {
  events: CalendarEvent[]
  onEventAdd?: (event: CalendarEvent) => void
  onEventUpdate?: (event: CalendarEvent) => void
  onEventDelete?: (eventId: string) => void
}

interface DialogEventForm extends CalendarEvent {
  isNew?: boolean
}

interface EventCellProps {
  event: CalendarEvent
  openEventDialog: (event: CalendarEvent) => void
}

function EventCell({ event, openEventDialog }: EventCellProps) {
  const selectedColor = event.color || "slate"
  const colorClass = colorMap[selectedColor]

  return (
    <button
      className={utils.cn(
        "relative w-full h-auto py-1 px-2 rounded-md flex flex-col text-left border-l-4",
        colorClass
      )}
      onClick={() => openEventDialog(event)}
    >
      <div className="flex justify-between items-center gap-1">
        <span className="font-medium truncate group-hover:text-primary">
          {event.title}
        </span>
      </div>
      {event.location && (
        <div className="flex items-center text-xs gap-1 opacity-80">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{event.location}</span>
        </div>
      )}
    </button>
  )
}

export function EventCalendar({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}: EventCalendarProps) {
  const [date, setDate] = React.useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = React.useState(false)
  const [dialogEvent, setDialogEvent] = React.useState<DialogEventForm | null>(
    null
  )

  const [view, setView] = React.useState<"day" | "week" | "month">("month")

  const dayEvents = React.useMemo(() => {
    if (view !== "day" || !date) return []

    return events.filter((event) => isSameDay(event.start, date))
  }, [events, date, view])

  const eventsByDate = React.useMemo(() => {
    const eventMap: Record<string, CalendarEvent[]> = {}
    
    events.forEach((event) => {
      const dateKey = format(event.start, "yyyy-MM-dd")
      
      if (!eventMap[dateKey]) {
        eventMap[dateKey] = []
      }
      
      eventMap[dateKey].push(event)
    })
    
    return eventMap
  }, [events])

  const generateDatesForMonth = React.useCallback((year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const firstDayOfWeek = startOfWeek(firstDay, { weekStartsOn: 0 })
    
    const result = []
    
    // Include days from previous month to fill the first week
    for (let i = 0; i < getDay(firstDay); i++) {
      const prevMonthDay = addDays(firstDayOfWeek, i)
      result.push(prevMonthDay)
    }
    
    // Add all days in the current month
    let currentDate = firstDay
    while (currentDate.getMonth() === month) {
      result.push(new Date(currentDate))
      currentDate = addDays(currentDate, 1)
    }
    
    // Fill the last week with days from the next month
    const lastDay = addDays(currentDate, -1)
    const daysToAdd = 6 - getDay(lastDay)
    for (let i = 1; i <= daysToAdd; i++) {
      const nextMonthDay = addDays(lastDay, i)
      result.push(nextMonthDay)
    }
    
    return result
  }, [])

  const daysInMonth = React.useMemo(() => {
    return generateDatesForMonth(date.getFullYear(), date.getMonth())
  }, [date, generateDatesForMonth])

  const handleNewEvent = React.useCallback(() => {
    const newEvent: DialogEventForm = {
      id: `new-${Date.now()}`,
      title: "",
      start: date,
      end: date,
      isNew: true,
      color: "sky",
    }
    setDialogEvent(newEvent)
  }, [date])

  const handleSaveEvent = () => {
    if (!dialogEvent) return

    const { isNew, ...eventData } = dialogEvent
    
    if (isNew && onEventAdd) {
      onEventAdd(eventData)
    } else if (!isNew && onEventUpdate) {
      onEventUpdate(eventData)
    }
    
    setDialogEvent(null)
  }

  const handleDeleteEvent = () => {
    if (!dialogEvent || !onEventDelete) return
    onEventDelete(dialogEvent.id)
    setDialogEvent(null)
  }

  const openEventDialog = (event: CalendarEvent) => {
    setDialogEvent({ ...event, isNew: false })
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b p-4 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <UIButton
            variant="outline"
            className="h-8"
            onClick={() => {
              const newDate = new Date(date)
              if (view === "month") {
                newDate.setMonth(newDate.getMonth() - 1)
              } else if (view === "week") {
                newDate.setDate(newDate.getDate() - 7)
              } else {
                newDate.setDate(newDate.getDate() - 1)
              }
              setDate(newDate)
            }}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </UIButton>
          <UIPopover open={showDatePicker} onOpenChange={setShowDatePicker}>
            <UIPopoverTrigger asChild>
              <UIButton variant="outline" className="h-8">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {format(date, view === "day" ? "d MMMM yyyy" : view === "week" ? "MMMM yyyy" : "MMMM yyyy")}
              </UIButton>
            </UIPopoverTrigger>
            <UIPopoverContent align="start" className="w-auto p-0">
              <UICalendar
                mode="single"
                selected={date}
                onSelect={(date: Date | undefined) => {
                  if (date) {
                    setDate(date)
                    setShowDatePicker(false)
                  }
                }}
                initialFocus
              />
            </UIPopoverContent>
          </UIPopover>
          <UIButton
            variant="outline"
            className="h-8"
            onClick={() => {
              const newDate = new Date(date)
              if (view === "month") {
                newDate.setMonth(newDate.getMonth() + 1)
              } else if (view === "week") {
                newDate.setDate(newDate.getDate() + 7)
              } else {
                newDate.setDate(newDate.getDate() + 1)
              }
              setDate(newDate)
            }}
          >
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </UIButton>
          <UIButton
            variant="outline"
            className="h-8"
            onClick={() => setDate(new Date())}
          >
            Today
          </UIButton>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <UIButton
            variant={view === "day" ? "default" : "outline"}
            className="h-8"
            onClick={() => setView("day")}
          >
            Day
          </UIButton>
          <UIButton
            variant={view === "week" ? "default" : "outline"}
            className="h-8"
            onClick={() => setView("week")}
          >
            Week
          </UIButton>
          <UIButton
            variant={view === "month" ? "default" : "outline"}
            className="h-8"
            onClick={() => setView("month")}
          >
            Month
          </UIButton>
          <UIButton className="h-8 ml-auto sm:ml-2" onClick={handleNewEvent}>
            <Plus className="h-4 w-4 mr-2" />
            Event
          </UIButton>
        </div>
      </div>
      
      {view === "month" && (
        <div className="grid grid-cols-7 text-sm">
          <div className="border-b py-2 text-center font-medium dark:border-zinc-800">
            Sun
          </div>
          <div className="border-b py-2 text-center font-medium dark:border-zinc-800">
            Mon
          </div>
          <div className="border-b py-2 text-center font-medium dark:border-zinc-800">
            Tue
          </div>
          <div className="border-b py-2 text-center font-medium dark:border-zinc-800">
            Wed
          </div>
          <div className="border-b py-2 text-center font-medium dark:border-zinc-800">
            Thu
          </div>
          <div className="border-b py-2 text-center font-medium dark:border-zinc-800">
            Fri
          </div>
          <div className="border-b py-2 text-center font-medium dark:border-zinc-800">
            Sat
          </div>
          
          {daysInMonth.map((day, index) => {
            const dateString = format(day, "yyyy-MM-dd")
            const isToday = isSameDay(day, new Date())
            const isCurrentMonth = day.getMonth() === date.getMonth()
            const dayEvents = eventsByDate[dateString] || []
            
            return (
              <div
                key={index}
                className={utils.cn(
                  "border-b border-r p-2 min-h-[120px] dark:border-zinc-800",
                  !isCurrentMonth && "bg-muted/30"
                )}
              >
                <div
                  className={utils.cn(
                    "flex items-center justify-center w-7 h-7 rounded-full mx-auto mb-1",
                    isToday && "bg-primary text-primary-foreground font-medium"
                  )}
                >
                  {format(day, "d")}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <EventCell
                      key={event.id}
                      event={event}
                      openEventDialog={openEventDialog}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <UIButton
                      variant="ghost"
                      size="sm"
                      className="w-full h-auto p-1 text-xs text-muted-foreground"
                      onClick={() => {
                        setDate(day)
                        setView("day")
                      }}
                    >
                      +{dayEvents.length - 3} more
                    </UIButton>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {view === "day" && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">
            {format(date, "EEEE, MMMM d, yyyy")}
          </h2>
          <div className="space-y-2">
            {dayEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No events scheduled for today
              </div>
            ) : (
              dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start p-3 border rounded-lg dark:border-zinc-800"
                >
                  <div className="mr-4">
                    <div className="text-sm font-medium">
                      {event.allDay
                        ? "All Day"
                        : format(event.start, "h:mm a")}
                    </div>
                    {!event.allDay && (
                      <div className="text-sm text-muted-foreground">
                        {format(event.end, "h:mm a")}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    {event.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  <UIButton
                    variant="ghost"
                    size="icon"
                    onClick={() => openEventDialog(event)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </UIButton>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {/* Event Dialog */}
      <UIDialog
        open={dialogEvent !== null}
        onOpenChange={(open: boolean) => !open && setDialogEvent(null)}
      >
        <UIDialogContent className="sm:max-w-[425px]">
          <UIDialogHeader>
            <UIDialogTitle>
              {dialogEvent?.isNew ? "Add Event" : "Edit Event"}
            </UIDialogTitle>
            <UIDialogDescription>
              {dialogEvent?.isNew
                ? "Add a new event to your calendar"
                : "Edit the details of your event"}
            </UIDialogDescription>
          </UIDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <UILabel htmlFor="title">Title</UILabel>
              <UIInput
                id="title"
                placeholder="Event title"
                value={dialogEvent?.title || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDialogEvent((prev) =>
                    prev ? { ...prev, title: e.target.value } : null
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <UILabel htmlFor="description">Description</UILabel>
              <UITextarea
                id="description"
                placeholder="Event description"
                value={dialogEvent?.description || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDialogEvent((prev) =>
                    prev ? { ...prev, description: e.target.value } : null
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <UILabel htmlFor="location">Location</UILabel>
              <UIInput
                id="location"
                placeholder="Event location"
                value={dialogEvent?.location || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDialogEvent((prev) =>
                    prev ? { ...prev, location: e.target.value } : null
                  )
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <UILabel>Date & time</UILabel>
                <div className="flex items-center gap-2">
                  <UIPopover>
                    <UIPopoverTrigger asChild>
                      <UIButton
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dialogEvent?.start
                          ? format(dialogEvent.start, "PPP")
                          : "Pick a date"}
                      </UIButton>
                    </UIPopoverTrigger>
                    <UIPopoverContent className="w-auto p-0">
                      <UICalendar
                        mode="single"
                        selected={dialogEvent?.start}
                        onSelect={(date: Date | undefined) =>
                          setDialogEvent((prev) =>
                            prev && date
                              ? {
                                  ...prev,
                                  start: date,
                                  end: date,
                                }
                              : null
                          )
                        }
                        initialFocus
                      />
                    </UIPopoverContent>
                  </UIPopover>
                </div>
              </div>
              <div className="grid gap-2">
                <UILabel>Color</UILabel>
                <UISelect
                  value={dialogEvent?.color || "sky"}
                  onValueChange={(value: EventColors) =>
                    setDialogEvent((prev) =>
                      prev ? { ...prev, color: value } : null
                    )
                  }
                >
                  <UISelectTrigger>
                    <UISelectValue placeholder="Select color" />
                  </UISelectTrigger>
                  <UISelectContent>
                    <UISelectItem value="sky">Sky</UISelectItem>
                    <UISelectItem value="emerald">Emerald</UISelectItem>
                    <UISelectItem value="violet">Violet</UISelectItem>
                    <UISelectItem value="amber">Amber</UISelectItem>
                    <UISelectItem value="rose">Rose</UISelectItem>
                    <UISelectItem value="slate">Slate</UISelectItem>
                    <UISelectItem value="orange">Orange</UISelectItem>
                  </UISelectContent>
                </UISelect>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <UILabel htmlFor="all-day" className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="all-day"
                  checked={dialogEvent?.allDay || false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDialogEvent((prev) =>
                      prev ? { ...prev, allDay: e.target.checked } : null
                    )
                  }
                  className="form-checkbox"
                />
                All day
              </UILabel>
            </div>
          </div>
          <UIDialogFooter className="gap-2 sm:gap-0">
            {!dialogEvent?.isNew && (
              <UIButton
                type="button"
                variant="destructive"
                onClick={handleDeleteEvent}
              >
                Delete
              </UIButton>
            )}
            <UIDialogClose asChild>
              <UIButton type="button" variant="outline">
                Cancel
              </UIButton>
            </UIDialogClose>
            <UIButton type="button" onClick={handleSaveEvent}>
              Save
            </UIButton>
          </UIDialogFooter>
        </UIDialogContent>
      </UIDialog>
    </div>
  )
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
} 