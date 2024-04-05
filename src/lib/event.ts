export interface CalendarQuery {
  start: string;
  end: string;
}

export interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  url?: string;
  extendedProps?: {
    img?: string;
    place?: string;
  };
}
