import { Routes } from "@angular/router";
import { HomeComponent } from "./components/login/login.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CreateChatComponent } from "./components/create-chat/create-chat.component";
import { ChatComponent } from "./components/chat/chat.component";

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
  {
    path: "creat-chat",
    component: CreateChatComponent,
  },
  {
    path: "chat",
    component: ChatComponent,
  }
];
