import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from './../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  constructor(private moviesService: MoviesService) { }


  ngOnInit() {
    this.moviesService.getFeature().subscribe((resp) => {
      this.peliculasRecientes = resp.results;
    });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe((resp) => {
      const arrTemp = [...this.peliculasPopulares, ...resp.results];
      this.peliculasPopulares = arrTemp;
    });
  }
}
