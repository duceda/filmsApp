import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from './../../interfaces/interfaces';
import { MoviesService } from './../../services/movies.service';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  @Input() id;
  @Output() cierreModal = new EventEmitter();
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  ocultar = 150;
  starType: string = '';
  starEmpty: string = 'star-outline';
  starFull: string = 'star';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(
    private moviesSrv: MoviesService,
    private dataLocal: DataLocalService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.dataLocal.existePelicula(this.id).then(existe => {
      this.starType = existe ? this.starFull : this.starEmpty;
    });

    this.moviesSrv.getPeliculaDetalle(this.id).subscribe(data => {
      console.log(data);
      this.pelicula = data;
    });

    this.moviesSrv.getActoresPelicula(this.id).subscribe(data => {
      console.log(data);
      this.actores = data.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.starType = existe ? this.starFull : this.starEmpty;
  }
}
