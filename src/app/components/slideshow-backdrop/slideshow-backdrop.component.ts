import { DetalleComponent } from './../detalle/detalle.component';
import { Pelicula } from './../../interfaces/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async verDetalle(peliculaId: string) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id: peliculaId
      }
    });

    modal.present();
  }
}
