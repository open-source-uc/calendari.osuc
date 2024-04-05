"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      locale={esLocale}
      initialView="dayGridMonth"
      eventSources={[{ url: "/api/org/a/events" }]}
    />
  );
}
