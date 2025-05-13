# Integration Guide

This guide helps you integrate the Calendar Component into various frameworks and projects.

## Table of Contents

- [React](#react)
- [Next.js](#nextjs)
- [Gatsby](#gatsby)
- [Vite](#vite)
- [Create React App](#create-react-app)

## React

### Basic Integration

```jsx
import { useState } from 'react';
import { CalendarComponent } from 'calendar-test-module';

function App() {
  return (
    <div className="app">
      <header>
        <h1>My Calendar App</h1>
      </header>
      <main>
        <CalendarComponent />
      </main>
    </div>
  );
}

export default App;
```

## Next.js

Next.js requires client-side components when using interactive elements:

```jsx
// app/calendar/page.tsx
"use client";

import { CalendarComponent } from 'calendar-test-module';

export default function CalendarPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>
      <div className="bg-white rounded-lg shadow">
        <CalendarComponent />
      </div>
    </div>
  );
}
```

### Adding to Navigation

```jsx
// components/Sidebar.jsx
import Link from 'next/link';
import { CalendarIcon } from 'lucide-react';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link href="/dashboard">
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/calendar">
            <CalendarIcon size={18} />
            <span>Calendar</span>
          </Link>
        </li>
        {/* Other menu items */}
      </ul>
    </nav>
  );
}
```

## Gatsby

```jsx
// src/pages/calendar.js
import React from 'react';
import { CalendarComponent } from 'calendar-test-module';
import Layout from '../components/layout';

export default function CalendarPage() {
  return (
    <Layout>
      <h1>Calendar</h1>
      <CalendarComponent />
    </Layout>
  );
}
```

## Vite

```jsx
// src/App.jsx
import { useState } from 'react'
import { CalendarComponent } from 'calendar-test-module'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>Calendar App</h1>
      </header>
      <main>
        <CalendarComponent />
      </main>
    </>
  )
}

export default App
```

## Create React App

```jsx
// src/App.js
import React from 'react';
import { CalendarComponent } from 'calendar-test-module';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Calendar</h1>
      </header>
      <main>
        <CalendarComponent />
      </main>
    </div>
  );
}

export default App;
```

## Styling

The component is built with utility classes compatible with Tailwind CSS. If you're using Tailwind, make sure your configuration includes the necessary color utilities:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/calendar-test-module/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Data Integration

You can connect the calendar to your own data sources:

```jsx
import { useEffect, useState } from 'react';
import { EventCalendar, type CalendarEvent } from 'calendar-test-module';

export default function CalendarWithAPI() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('https://api.example.com/events');
        const data = await response.json();
        
        // Transform API data to match CalendarEvent format
        const formattedEvents = data.map(item => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          start: new Date(item.startTime),
          end: new Date(item.endTime),
          allDay: item.isAllDay,
          color: item.category === 'meeting' ? 'sky' : 
                 item.category === 'personal' ? 'emerald' : 'violet',
          location: item.location
        }));
        
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <EventCalendar 
      events={events}
      onEventAdd={/* Handle adding events to your API */}
      onEventUpdate={/* Handle updating events in your API */}
      onEventDelete={/* Handle deleting events from your API */}
    />
  );
}
```

## Troubleshooting

### Component Not Rendering
- Ensure you're using React 18 or later
- Check that date-fns is properly installed
- Verify that the import paths are correct

### Styling Issues
- If using Tailwind CSS, ensure your content configuration includes the component
- For other styling solutions, you may need to add custom CSS

For more help, please [submit an issue](https://github.com/username/calendar-test-module/issues). 