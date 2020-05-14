import { Component } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
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
    this.favoritoPorGenero = [];
    
    generos.forEach(genre => {
      let obj = { name: genre.name, pelis: [] };
      obj.pelis = peliculas.filter(pelicula => {
        if (pelicula.genres.find(gen => gen.id === genre.id)) {
          return pelicula;
        }
      });

      if (obj.pelis.length > 0) {
        this.favoritoPorGenero.push(obj);
      }
    });

    console.log(this.favoritoPorGenero);
  }
}
