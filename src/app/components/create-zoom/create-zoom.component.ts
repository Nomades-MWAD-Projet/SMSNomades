import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormacaoService } from './formacao.service';

@Component({
  selector: "app-create-zoom",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./create-zoom.component.html",
  styleUrls: ["./create-zoom.component.css"],
})
export class CreateZoomComponent implements OnInit {
  nouveauLien: string = ''; // Nouveau lien pour la formation
  codigoAcesso: string = ''; // Code d'accès pour la formation
  data: string = ''; // Date de la formation
  selectedFormacaoToAddLink: any; // Formation sélectionnée pour ajouter un lien
  selectedFormacaoToShowAulas: any; // Formation sélectionnée pour afficher les cours
  formacoes: any[] = []; // Liste des formations

  constructor(private formacaoService: FormacaoService) {}

  ngOnInit() {
    this.formacaoService.loadFromLocalStorage(); // Charger les formations depuis le stockage local
    this.formacaoService.formacoes$.subscribe(formacoes => this.formacoes = formacoes); // Souscrire aux formations pour les mettre à jour
  }

  ajouterLien() {
    if (this.selectedFormacaoToAddLink && this.nouveauLien && this.data) {
      const novoNome = `${this.selectedFormacaoToAddLink.nome} - ${this.data}`; // Nouveau nom pour l'enregistrement
      const novoEnregistrement = {
        nome: novoNome,
        link: this.nouveauLien,
        codigoAcesso: this.codigoAcesso,
        data: this.data
      }; // Nouvel enregistrement à ajouter
      this.selectedFormacaoToAddLink.enregistrements.push(novoEnregistrement); // Ajouter le nouvel enregistrement à la formation sélectionnée
      this.formacaoService.updateFormacoes(this.formacoes); // Mettre à jour la liste des formations
      // Effacer les champs après avoir ajouté le lien
      this.nouveauLien = '';
      this.codigoAcesso = '';
      this.data = '';
    } else {
      alert('Por favor, preencha todos os campos.'); // Alerte si tous les champs ne sont pas remplis
    }
  }
}
