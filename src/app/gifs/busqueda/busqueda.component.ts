import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  // SIRVE PARA OBTENER EL VALOR POR REFERENCIA DEL INPUT
  @ViewChild('txtBuscar')txtBuscar!:ElementRef<HTMLInputElement>;

  //INYECCION DEL SERVICIO
  constructor(private gifsService:GifsService){

  }

  buscar(){  
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){
      return
    }
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = ''
  }
}
