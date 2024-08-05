import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor ( 
    private authService: AuthService,
    private router: Router,
  ) {}
  //Metodo de onLogin
  onLogin(): void {
    this.authService.login('fernando@gmail.com','')
      .subscribe( user => {

        this.router.navigate(['/']);

      })
  }

}
