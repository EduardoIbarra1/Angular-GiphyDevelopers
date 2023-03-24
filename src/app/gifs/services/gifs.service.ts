import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url: string ='https://api.giphy.com/v1/gifs'
  private apiKey: string = 'tcDAkxZtAHIw2LBHT6yomCiFeHtv5gRe'
  private historial:string[] = [];
  public resultados: Gifs[] = [];

  /**
   * Getter encargado de obtener el historial.
   */
  get getHistorial(){
    return [...this.historial]
  }
  
  constructor(private http:HttpClient){
    this.historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  /**
   * Encargado de buscar los gifs.
   * 
   * @param busqueda Nombre del gif a buscar
   */
  buscarGifs(busqueda:string = ''){
    busqueda = busqueda.trim().toLowerCase();
    busqueda = busqueda.replace(/\b\w/g, (c) => c.toUpperCase());
    //busqueda = busqueda.charAt(0).toUpperCase() + busqueda.slice(1);

    //Valida si la busqueda no existe en el historial
    if(!this.historial.includes(busqueda)){
      //Inserta al historial la nueva busqueda
      this.historial.unshift(busqueda)
      //Corta el arreglo a las ultimas 10 busquedas 
      this.historial = this.historial.splice(0, 10)
      //Guarda el historial en el localstorage
      localStorage.setItem("historial", JSON.stringify(this.historial ));
    }
    
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', busqueda);

    this.http.get<SearchGifsResponse>(`${this.url}/search`, {params})
    .subscribe( (resp )  => {
      this.resultados = resp.data;
      //Guarda los resultados en el localStorage
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    });
  }
}
