import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http:HttpClient) { 
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);  
    }
    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);  
    }
  }

  private apiKey:string = 'vcPlIxJUzeXEJlwAVznCaQev6z9rwFFs';
  private urlBase:string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados:Gif[] = [];

  get historial(){
    return [...this._historial]
  }

  buscarGifs(data: string = ''){
    data = data.trim().toLocaleLowerCase();
    if (!this._historial.includes(data)) {
      this._historial.unshift(data);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    this.http.get<SearchGifsResponse>(`${this.urlBase}/search?api_key=${this.apiKey}&q=${data}&limit=10`)
      .subscribe(( resp ) => {
        //console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })  

  }  
}
