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
  nouveauLien: string = '';
  codigoAcesso: string = '';
  data: string = '';
  selectedFormacaoToAddLink: any;
  selectedFormacaoToShowAulas: any;
  formacoes: any[] = [];

  constructor(private formacaoService: FormacaoService) {}

  ngOnInit() {
    this.formacaoService.loadFromLocalStorage();
    this.formacaoService.formacoes$.subscribe(formacoes => this.formacoes = formacoes);
  }

  ajouterLien() {
    if (this.selectedFormacaoToAddLink && this.nouveauLien && this.data) {
      const novoNome = `${this.selectedFormacaoToAddLink.nome} - ${this.data}`;
      const novoEnregistrement = {
        nome: novoNome,
        link: this.nouveauLien,
        codigoAcesso: this.codigoAcesso,
        data: this.data
      };
      this.selectedFormacaoToAddLink.enregistrements.push(novoEnregistrement);
      this.formacaoService.updateFormacoes(this.formacoes);
      // Limpar os campos após adicionar o link
      this.nouveauLien = '';
      this.codigoAcesso = '';
      this.data = '';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}