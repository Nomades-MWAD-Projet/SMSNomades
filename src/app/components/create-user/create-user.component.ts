import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Database, ref, set, push, onValue } from '@angular/fire/database'; // Utilisation de Realtime Database
import { generatePassword } from './password-generator'; // Utilitaire pour générer des mots de passe
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  rooms = [
    "WebDesigner", 
    "WebProgrammer", 
    "Mobile Web Application Developer", 
    "Python Software Engineer", 
    "Data Analytics appliqué avec Python", 
    "Marketing Digital"
  ];

  selectedRoom: string = '';
  numberOfStudents: number = 0;
  message: string = '';
  studentInfo: Array<{ firstName: string, lastName: string }> = [];
  roomStudentCounts: Array<{ room: string, count: number }> = [];

  constructor(private auth: Auth, private db: Database) {}

  ngOnInit() {
    this.loadRoomStudentCounts(); // Charger les comptes d'élèves au démarrage
  }

  // Charger le nombre d'élèves par formation depuis Firebase
  loadRoomStudentCounts() {
    this.roomStudentCounts = [];

    this.rooms.forEach(room => {
      const roomRef = ref(this.db, `rooms/${room}/users`);
      onValue(roomRef, snapshot => {
        const users = snapshot.val();
        const count = users ? Object.keys(users).length : 0;
        this.roomStudentCounts.push({ room, count });
      });
    });
  }

  // Appelé lorsque l'utilisateur change le nombre d'élèves
  onStudentNumberChange() {
    this.studentInfo = Array(this.numberOfStudents).fill({}).map(() => ({ firstName: '', lastName: '' }));
  }

  // Fonction pour générer et enregistrer les utilisateurs
  validateAndSaveStudents() {
    if (!this.selectedRoom || this.numberOfStudents <= 0) {
      this.message = 'Sélectionnez une formation et un nombre valide d\'élèves';
      return;
    }
  
    for (let i = 0; i < this.numberOfStudents; i++) {
      const randomId = Math.floor(Math.random() * 10000); // Générer un identifiant unique pour chaque email
      const email = `student${randomId}@school.com`; // Générer un email unique
      const password = generatePassword(8); // Générer un mot de passe aléatoire
      const student = this.studentInfo[i]; // Récupérer le nom et prénom de l'étudiant
  
      // Ajouter l'utilisateur à Firebase Authentication
      createUserWithEmailAndPassword(this.auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
  
          // Ajouter des informations supplémentaires dans Firebase Realtime Database, avec la formation (room)
          const userRef = push(ref(this.db, `rooms/${this.selectedRoom}/users`)); // Enregistrer sous la formation sélectionnée
          set(userRef, {
            uid: user?.uid,
            email: email,
            room: this.selectedRoom, // Ajouter la formation dans l'enregistrement
            firstName: student.firstName, // Ajouter le prénom
            lastName: student.lastName,  // Ajouter le nom
            password: password // Ne fais pas cela en production, c'est juste pour l'exemple
          }).then(() => {
            this.message = `${this.numberOfStudents} utilisateurs ont été créés pour la formation ${this.selectedRoom}`;
            this.loadRoomStudentCounts(); // Recharger les comptes d'élèves après la création
          });
        })
        .catch(error => {
          console.error('Erreur lors de la création des utilisateurs', error);
          this.message = `Erreur: ${error.message}`;
        });
    }
  }
}

// <!-- <h1>Hello</h1> hello test pour le cache a supprimer -->
