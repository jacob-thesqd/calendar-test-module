type EventColors = "sky" | "emerald" | "violet" | "amber" | "rose" | "slate" | "orange";
export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    color?: EventColors;
    location?: string;
}
interface EventCalendarProps {
    events: CalendarEvent[];
    onEventAdd?: (event: CalendarEvent) => void;
    onEventUpdate?: (event: CalendarEvent) => void;
    onEventDelete?: (eventId: string) => void;
}
export declare function EventCalendar({ events, onEventAdd, onEventUpdate, onEventDelete, }: EventCalendarProps): import("react/jsx-runtime").JSX.Element;
export {};
