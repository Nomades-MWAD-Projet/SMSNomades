// src/app/services/calendar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private calendarOptionsSource = new BehaviorSubject<CalendarOptions>({
    initialView: 'dayGridMonth',
    events: []
  });
  calendarOptions$ = this.calendarOptionsSource.asObservable();

  updateCalendarOptions(options: CalendarOptions) {
    this.calendarOptionsSource.next(options);
  }

  getCalendarOptions(): CalendarOptions {
    return this.calendarOptionsSource.getValue();
  }
}