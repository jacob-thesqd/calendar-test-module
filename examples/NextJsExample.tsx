"use client";

import { useState } from 'react';
import { EventCalendar, type CalendarEvent } from 'calendar-test-module';

// Example custom events
const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Company Standup",
    description: "Weekly team meeting",
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    color: "sky",
    location: "Main Conference Room",
  },
  {
    id: "2",
    title: "Product Demo",
    description: "Demo for new clients",
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2) + 90 * 60 * 1000),
    color: "emerald",
    location: "Zoom Meeting",
  },
];

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Company Calendar</h1>
      <p className="text-gray-600 mb-8">Manage your team's schedule and events in one place.</p>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <EventCalendar
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
      </div>
    </div>
  );
} 