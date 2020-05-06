import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';

const api_key = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _http: HttpClient) { }

  public getFeature() {
    return this._http.get<RespuestaMDB>(`https://api.themoviedb.org/discover/movie?primary_release_date.gte=2020-01-01&primary_release_date.lte=2020-01-31&api_key=${api_key}&language=es&include_image_language=es`);
  }
}
