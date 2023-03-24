import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get getHistorial(){
    return this.gifsService.getHistorial;
  }

  constructor(private gifsService:GifsService){

  }

  buscar(item: string){
    this.gifsService.buscarGifs(item);
  }
}
