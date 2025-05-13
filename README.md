# Calendar Component

A fully featured React calendar component with event management capabilities. This component allows you to display and manage events in a calendar interface with day, week, and month views.

![Calendar Component](https://via.placeholder.com/800x400?text=Calendar+Component)

## Features

- 📅 Day, week, and month views
- 🎨 Customizable event colors
- ✏️ Create, edit, and delete events
- 📱 Responsive design
- 🌙 Light and dark mode support

## Installation

```bash
# Using npm
npm install calendar-test-module

# Using yarn
yarn add calendar-test-module

# Using pnpm
pnpm add calendar-test-module
```

To install directly from GitHub:

```bash
npm install github:username/calendar-test-module
```

## Usage

### Basic Usage

```jsx
import { CalendarComponent } from 'calendar-test-module';

export default function CalendarPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <CalendarComponent />
    </div>
  );
}
```

### Custom Events

You can provide your own events and handlers:

```jsx
import { useState } from 'react';
import { EventCalendar, type CalendarEvent } from 'calendar-test-module';

export default function CustomCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      color: "sky",
      location: "Conference Room A",
    }
  ]);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <EventCalendar
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  );
}
```

## Components API

### CalendarComponent

The main calendar component with sample events included, ready to use out of the box.

### EventCalendar

The base calendar component that you can customize with your own events and handlers.

#### Props

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `events` | `CalendarEvent[]` | Array of calendar events to display |
| `onEventAdd` | `(event: CalendarEvent) => void` | Handler for adding new events |
| `onEventUpdate` | `(event: CalendarEvent) => void` | Handler for updating existing events |
| `onEventDelete` | `(eventId: string) => void` | Handler for deleting events |

### CalendarEvent Interface

```ts
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: "sky" | "emerald" | "violet" | "amber" | "rose" | "slate" | "orange";
  location?: string;
}
```

## Styling

The component uses utility classes compatible with Tailwind CSS. If you're using Tailwind, no additional setup is required.

## Requirements

- React 18.0.0+
- date-fns 4.0.0+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC 