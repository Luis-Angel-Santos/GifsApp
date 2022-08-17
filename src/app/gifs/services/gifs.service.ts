import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
    return [...this._historial]
  }

  buscarGifs(data: string = ''){
    data = data.trim().toLocaleLowerCase();
    if (!this._historial.includes(data)) {
      this._historial.unshift(data);
      this._historial = this._historial.splice(0,10);
    }
    console.log(this._historial); 
  }

  constructor() { }
}
