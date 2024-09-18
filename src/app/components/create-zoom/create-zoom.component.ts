import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormacaoService } from './formacao.service';
import { Zoom } from '../../interfaces/zoom';
import { Formation } from "../../interfaces/formation";

@Component({
  selector: "app-create-zoom",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./create-zoom.component.html",
  styleUrls: ["./create-zoom.component.css"],
})
export class CreateZoomComponent implements OnInit {
  // Variáveis para armazenar os valores dos campos do formulário
  novoLink: string = '';
  codigoAcesso: string = '';
  data: string = '';
  selectedFormacaoToAddLink: Formation | null = null;
  selectedFormacaoToShowAulas: Formation | null = null;
  zoomsToShowByFormation: Zoom[] = [];
  formacoes: Formation[] = [];
  zooms: Zoom[] = [];
  formationIdSelected: string = '';

  // Injeção do serviço FormacaoService
  constructor(private formacaoService: FormacaoService) {}
  // Método que é executado quando o componente é inicializado
  ngOnInit() {
    // Obtém a lista dos nomes das formaçoes  
    this.formacaoService.getFormation().subscribe((formacoes: Formation[]) => {
      this.formacoes = formacoes;
    });
  }

  getZooms() {
    const id = this.selectedFormacaoToShowAulas?.id;
    this.formacaoService.getZoomByIdFormation(id).subscribe((zooms: Zoom[]) => {
      this.zoomsToShowByFormation = zooms;
    });
  }

  // Método para adicionar um novo link de formação
  adicionarLink() {
    // Loga a formação selecionada no console
    console.log(this.selectedFormacaoToAddLink);
    
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (this.selectedFormacaoToAddLink && this.novoLink && this.data) {
      // Cria um novo nome para a formação combinando o nome da formação selecionada com a data
      const novoNome = `${this.selectedFormacaoToAddLink.name} - ${this.data}`;
      // Cria um novo objeto de formação com os dados fornecidos
      const novoRegistro: Zoom = {
        lien: this.novoLink,
        code: this.codigoAcesso,
        date: this.data,
        formationStr: this.selectedFormacaoToAddLink.name,
        idFormation: this.selectedFormacaoToAddLink.id,
      };

      // Adiciona a nova formação usando o serviço e atualiza a lista de formações
      this.formacaoService.addFormacao(Date.now().toString(), novoRegistro).subscribe(() => {        
        // Limpa os campos do formulário
        this.novoLink = '';
        this.codigoAcesso = '';
        this.data = '';
      });
    } else {
      // Exibe um alerta se algum campo obrigatório não estiver preenchido
      alert('Por favor, preencha todos os campos.');
    }
  }
}
