import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http:HttpClient) { }

  private apiKey:string = 'vcPlIxJUzeXEJlwAVznCaQev6z9rwFFs';
  private urlBase:string = 'https://api.giphy.com/v1/gifs/search?';
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
    }
    this.http.get<SearchGifsResponse>(`${this.urlBase}api_key=${this.apiKey}&q=${data}&limit=10`)
      .subscribe(( resp ) => {
        //console.log(resp.data);
        this.resultados = resp.data;
      })  

  }  
}
