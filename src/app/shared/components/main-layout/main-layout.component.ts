import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  isAuth = false;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    this.isAuth = this.authService.isAuth()
    this.isAdmin = this.authService.isAdmin()
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }
  
}
