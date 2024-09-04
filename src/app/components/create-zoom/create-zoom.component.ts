import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { from } from "rxjs";

@Component({
  selector: "app-create-zoom",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./create-zoom.component.html",
  styleUrl: "./create-zoom.component.css",
})
export class CreateZoomComponent  implements OnInit {
nouveauLien: any;
ajouterLien() {
throw new Error('Method not implemented.');
}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  selectedFormacaoToAddLink: any;
  formacoes = [
    {
      id: 1,
      nome: "Web Designer (WD)",
      enregistrements: [
        { id: 1, nome: "Enregistrement 1", link: "#" },
        { id: 2, nome: "Enregistrement 2", link: "#" },
      ],
    },
    {
      id: 2,
      nome: "Web Programmer (WPr)",
      enregistrements: [
        { id: 3, nome: "Enregistrement 3", link: "#" },
        { id: 4, nome: "Enregistrement 4", link: "#" },
      ],
    },
    {
      id: 3,
      nome: "Mobile Web Application Developer (MWAD)",
      enregistrements: [
        { id: 5, nome: "Enregistrement 5", link: "#" },
        { id: 6, nome: "Enregistrement 6", link: "#" },
      ],
    },
    {
      id: 4,
      nome: "Python Software Engineer (PSE)",
      enregistrements: [
        { id: 7, nome: "Enregistrement 7", link: "#" },
        { id: 8, nome: "Enregistrement 8", link: "#" },
      ],
    },
    {
      id: 5,
      nome: "Data Analysis (PDA)",
      enregistrements: [
        { id: 9, nome: "Enregistrement 9", link: "#" },
        { id: 10, nome: "Enregistrement 10", link: "#" },
      ],
    },
    {
      id: 6,
      nome: "Data Science pour la Finance (DAF)",
      enregistrements: [
        { id: 11, nome: "Enregistrement 11", link: "#" },
        { id: 12, nome: "Enregistrement 12", link: "#" },
        ],
    },
    {
      id: 7,
      nome: "Digital Marketing (DMM)",
      enregistrements: [
        { id: 13, nome: "Enregistrement 13", link: "#" },
        { id: 14, nome: "Enregistrement 14", link: "#" },
        ],
    }
  ];

  selectedFormacao: any;

  selecionarFormacao(formacao: any) {
    this.selectedFormacao = formacao;
  }
}




function ajouterLien(this: any, formacao: any) {
  if (formacao !== undefined && formacao !== null) {
    this.selectedFormacaoToAddLink = formacao;
  }
}

