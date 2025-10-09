import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit{
isSidebarCollapsed = false;
user: any;

loggedIn: boolean = true;

  @Output() toggle = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {}


  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.toggle.emit(this.isSidebarCollapsed);
  }

  ngOnInit(): void {
  this.authService.getUser().subscribe(user => {
    console.log('Received user from service:', user);
    this.user = user;
    if (user) {
      console.log('Welcome,', user.name);
    }
  });

  this.loggedIn = this.authService.isLoggedIn();

  }

  logout(): void {
    // Clear localStorage/sessionStorage
    localStorage.removeItem("token");
    //localStorage.removeItem("role");
    localStorage.removeItem("user");

    // Optionally clear everything
    localStorage.clear();

    // Redirect to login page
    this.router.navigate(["/login"]);
  }

}
