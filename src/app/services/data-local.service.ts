import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(mess: string) {
    const toast = await this.toastCtrl.create({
      message: mess,
      duration: 1500
    });

    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    const existe = this.peliculas.find(
      filmSaved => pelicula.id === filmSaved.id
    );
    let mensaje = '';

    if (!existe) {
      this.peliculas.push(pelicula);
      mensaje = 'Guardado en Favoritos';
    } else {
      this.peliculas = this.peliculas.filter(
        filmSaved => pelicula.id !== filmSaved.id
      );

      mensaje = 'Eliminado de Favoritos';
    }

    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);

    return !existe;
  }

  borrarPelicula(pelicula: PeliculaDetalle) {
    const existe = this.peliculas.find(
      filmSaved => pelicula.id === filmSaved.id
    );

    if (!existe) {
      this.peliculas.push(pelicula);
      this.storage.set('peliculas', this.peliculas);
    }
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    id = Number(id);
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true : false;
  }
}
