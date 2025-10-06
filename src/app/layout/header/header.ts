import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  imports: [CommonModule],
  templateUrl: "./header.html",
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  user: any;
  loggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
   this.authService.getUser().subscribe(user => {
    console.log('Received user from service:', user);
    this.user = user;
    if (user) {
      console.log('Welcome,', user.name);
    }
  });
  }
  logout(): void {
    // Optionally clear everything
    localStorage.clear();

    // Redirect to login page
    this.router.navigate(["/login"]);
  }
}
