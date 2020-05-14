import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  peliculasFavoritas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoPorGenero: any[] = [];

  constructor(
    private dataLocaSrv: DataLocalService,
    private moviesSrv: MoviesService
  ) {}

  async ionViewWillEnter() {
    this.peliculasFavoritas = await this.dataLocaSrv.cargarFavoritos();
    this.generos = await this.moviesSrv.getGenres();
    this.filmsByGenre(this.peliculasFavoritas, this.generos);
  }

  filmsByGenre(peliculas: PeliculaDetalle[], generos: Genre[]) {
    generos.forEach(genre => {
      let obj = { genero: genre.name, pelis: [] };
      obj.pelis = peliculas.filter(pelicula => {
        if (pelicula.genres.find(gen => gen.id === genre.id)) {
          return pelicula;
        }
      });

      this.favoritoPorGenero.push(obj);
    });

    console.log(this.favoritoPorGenero);
  }
}
