import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormacaoService } from '../create-zoom/formacao.service';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Injectable()
@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  formacoes: any[] = []; // Tableau pour stocker les formations
  selectedFormacaoToShowAulas: any = null; // Formation sélectionnée pour afficher les cours
  selectedFormacaoNome: string = ''; // Nom de la formation sélectionnée

  constructor(@Inject(FormacaoService) private formacaoService: FormacaoService) {}

  ngOnInit() {
    this.formacaoService.loadFromLocalStorage(); // Charger les formations depuis le stockage local
    this.formacaoService.formacoes$.subscribe((formacoes: any[]) => {
      this.formacoes = formacoes; // Mettre à jour le tableau des formations
      this.loadSelectedFormacaoFromLocalStorage(); // Charger la formation sélectionnée depuis le stockage local
    });
  }

  selectFormacao(formacaoNome: string) {
    this.selectedFormacaoToShowAulas = this.formacoes.find(formacao => formacao.nome === formacaoNome);
    console.log('Formação selecionada:', this.selectedFormacaoToShowAulas);
    this.saveSelectedFormacaoToLocalStorage(); // Enregistrer la formation sélectionnée dans le stockage local
  }

  private saveSelectedFormacaoToLocalStorage() {
    if (this.selectedFormacaoToShowAulas) {
      localStorage.setItem('selectedFormacao', JSON.stringify(this.selectedFormacaoToShowAulas));
    }
  }

  private loadSelectedFormacaoFromLocalStorage() {
    const savedFormacao = localStorage.getItem('selectedFormacao');
    if (savedFormacao) {
      this.selectedFormacaoToShowAulas = JSON.parse(savedFormacao);
      this.selectedFormacaoNome = this.selectedFormacaoToShowAulas.nome;
    }
  }
}
