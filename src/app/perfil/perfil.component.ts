import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  userName: string = "Ejemplo";
  userOcupation: string = "Programador";
  userLocation: string = "Madrid, España";
  userMail: string = "ejemplo@example.com";
  userPhone: string = "925 12 03 12";
  userMobile: string = "601 23 49 34";

  editarRS():void{ //función que habilitaría la edición de las redes sociales

  }
}
