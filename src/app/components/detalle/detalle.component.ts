import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDetalle, Cast } from './../../interfaces/interfaces';
import { MoviesService } from './../../services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  ocultar = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private moviesSrv: MoviesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.moviesSrv.getPeliculaDetalle(this.id).subscribe((data) => {
      console.log(data);
      this.pelicula = data;
    });

    this.moviesSrv.getActoresPelicula(this.id).subscribe((data) => {
      console.log(data);
      this.actores = data.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    this.modalCtrl.dismiss();
  }

}
