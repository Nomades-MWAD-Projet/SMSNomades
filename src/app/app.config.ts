import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from "@angular/common/http";
import { provideFirebaseApp } from "@angular/fire/app";
import { provideDatabase } from "@angular/fire/database";
import { initializeApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getDatabase } from "@angular/fire/database";
import { firebaseConfig } from "../environments/environment";
import { provideFirestore } from "@angular/fire/firestore";
import { getFirestore } from "firebase/firestore";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyBfNfUwhSyHJJNmkCCTNMh1jaSDXY24Ye8",
        authDomain: "zoomnomades-e95cd.firebaseapp.com",
        databaseURL:
          "https://zoomnomades-e95cd-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "zoomnomades-e95cd",
        storageBucket: "zoomnomades-e95cd.appspot.com",
        messagingSenderId: "200227817044",
        appId: "1:200227817044:web:f017d74a9cc3928a2acfc1",
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
