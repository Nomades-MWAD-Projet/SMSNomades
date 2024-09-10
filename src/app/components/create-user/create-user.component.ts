import { Component, OnInit } from "@angular/core";
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Database, ref, set, push, onValue } from "@angular/fire/database"; // Utilisation de Realtime Database
import { generatePassword } from "./password-generator"; // Utilitaire pour générer des mots de passe
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-create-user",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent implements OnInit {
  rooms = [
    "WebDesigner",
    "WebProgrammer",
    "Mobile Web Application Developer",
    "Python Software Engineer",
    "Data Analytics appliqué avec Python",
    "Marketing Digital",
  ];

  selectedRoom: string = "";
  numberOfStudents: number = 0;
  message: string = "";

  // Tableau pour stocker le nombre d'élèves par formation
  roomStudentCounts: { room: string; count: number }[] = [];

  constructor(private auth: Auth, private db: Database) {}

  ngOnInit() {
    this.getRoomStudentCounts();
  }

  // Fonction pour récupérer le nombre d'élèves par room
  getRoomStudentCounts() {
    this.roomStudentCounts = []; // Réinitialiser le tableau
    this.rooms.forEach((room) => {
      const roomRef = ref(this.db, `rooms/${room}/users`);
      onValue(roomRef, (snapshot) => {
        const users = snapshot.val();
        const count = users ? Object.keys(users).length : 0;
        // Mettre à jour le tableau
        this.roomStudentCounts.push({ room, count });
      });
    });
  }

  // Fonction pour générer les utilisateurs
  generateUsers() {
    if (!this.selectedRoom || this.numberOfStudents <= 0) {
      this.message = "Sélectionnez une formation et un nombre valide d'élèves";
      return;
    }

    for (let i = 0; i < this.numberOfStudents; i++) {
      const randomId = Math.floor(Math.random() * 10000); // Générer un identifiant unique pour chaque email
      const email = `student${randomId}@school.com`; // Générer un email unique
      const password = generatePassword(8); // Générer un mot de passe aléatoire

      // Ajouter l'utilisateur à Firebase Authentication
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // Ajouter des informations supplémentaires dans Firebase Realtime Database, avec la formation (room)
          const userRef = push(
            ref(this.db, `rooms/${this.selectedRoom}/users`)
          ); // Enregistrer sous la formation sélectionnée
          set(userRef, {
            uid: user?.uid,
            email: email,
            room: this.selectedRoom, // Ajouter la formation dans l'enregistrement
            password: password, // Ne fais pas cela en production, c'est juste pour l'exemple
          }).then(() => {
            this.message = `${this.numberOfStudents} utilisateurs ont été créés pour la formation ${this.selectedRoom}`;
            this.getRoomStudentCounts(); // Mettre à jour les comptes après création
          });
        })
        .catch((error) => {
          console.error("Erreur lors de la création des utilisateurs", error);
          this.message = `Erreur: ${error.message}`;
        });
    }
  }
}
