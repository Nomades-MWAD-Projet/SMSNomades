import { Routes } from "@angular/router";
import { HomeComponent } from "./components/login/login.component";
import { CalendarComponent } from "./components/calendar/calendar.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "calendar",
    component: CalendarComponent,
  },
];
