import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar: string = '';
  ideas: Array<string> = [
    'Spiderman',
    'Avenger',
    'El señor de los anillos',
    'Forrest Gump'
  ];

  peliculas: Pelicula[] = [];

  buscando: boolean = false;

  constructor(
    private movieSrv: MoviesService,
    private modalCtrl: ModalController
  ) {}

  buscar(event: any) {
    this.textoBuscar = event.detail.value;
    this.buscando = true;

    if (this.textoBuscar.trim().length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.movieSrv.buscarPeliculas(this.textoBuscar).subscribe(data => {
      console.log(data['results']);
      this.peliculas = data['results'];
      this.buscando = true;
    });
  }

  buscarIdea(idea: string) {
    this.textoBuscar = idea;
  }

  async detalle(peliculaId: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id: peliculaId
      }
    });

    modal.present();
  }
}
