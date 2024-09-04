import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { ZoomComponent } from "./components/zoom/zoom.component";
import { CreateZoomComponent } from "./components/create-zoom/create-zoom.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "home",
    component: LoginComponent,
  },
  {
    path: "calendar",
    component: CalendarComponent,
  },
  {
    path: "zoom",
    component: ZoomComponent,
    },
    {
      path: "create-zoom",
      component: CreateZoomComponent,
    }

];
