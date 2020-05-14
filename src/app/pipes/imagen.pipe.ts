import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size = 'w500'): string {
    if (!img) {
      return './assets/no_image_banner.jpg';
    }

    return `${url}/${size}/${img}`;
  }

}
