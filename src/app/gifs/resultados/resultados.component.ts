import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html'
})
export class ResultadosComponent {


  get getResultados(){
    return this.gifsService.resultados;
  }

  constructor(private gifsService:GifsService){

  }
}

