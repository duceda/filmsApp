import { PeliculaDetalle, RespuestaCredits } from './../interfaces/interfaces';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';

const API_KEY = environment.apiKey;
const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage: number = 0;

  constructor(private _http: HttpClient) { }

  private executeQuery<T>(query: string) {
    query = API_URL + query;
    query += `&api_key=${API_KEY}&language=es&include_image_language=es`;

    return this._http.get<T>(query);
  }

  public getFeature() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const month = today.getMonth() + 1;
    let monthString;

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const start = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.executeQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`);
  }

  public getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.executeQuery<RespuestaMDB>(query);
  }

  public getPeliculaDetalle(idPelicula: string) {
    const query = `/movie/${idPelicula}?a=1`;
    return this.executeQuery<PeliculaDetalle>(query);
  }

  public getActoresPelicula(idPelicula: string) {
    const query = `/movie/${idPelicula}/credits?a=1`;
    return this.executeQuery<RespuestaCredits>(query);
  }
}
