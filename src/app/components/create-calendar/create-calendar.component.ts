import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-create-calendar',
  standalone: true,
  imports: [FullCalendarModule, ReactiveFormsModule],
  templateUrl: './create-calendar.component.html',
  styleUrl: './create-calendar.component.css'
})
export class CreateCalendarComponent {
  aulaForm: FormGroup;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    validRange: {
      start: '2024-09-13', // data é configurara no formato ano-mês-dia (YYYY-MM-DD), agora vou ligar o methodo para pegar a data do input da função adicionarAula
      end: '2024-09-20'
    },
    plugins: [dayGridPlugin, interactionPlugin],
    themeSystem: 'bootstrap',

  };

  constructor(private fb: FormBuilder) {
    this.aulaForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      dataInicio: [''],
      dataFim: [''],
      horaInicio: [''],
      horaFim: [''],
      professor: [''],
    });
  }

  adicionarAula() {
    const novaAula = this.aulaForm.value;
    const event = {
      title: novaAula.titulo,
      start: `${novaAula.dataInicio}T${novaAula.horaInicio}`,
      end: `${novaAula.dataFim}T${novaAula.horaFim}`,
      description: novaAula.descricao,
      extendedProps: {
        professor: novaAula.professor
      }
    };
    //agora vou ligar o methodo para pegar a data do input da função adicionarAula com o validRange
    this.calendarOptions.validRange = {
      start: novaAula.dataInicio,
      end: novaAula.dataFim
    };


  }
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }
}

