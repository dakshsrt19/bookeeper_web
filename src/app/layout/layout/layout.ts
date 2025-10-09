import { Component } from "@angular/core";
import { Header } from "../header/header";
import { RouterOutlet } from "@angular/router";
import { Sidebar } from "../sidebar/sidebar";
import { Footer } from "../footer/footer";

@Component({
  selector: "app-layout",
  imports: [Header, RouterOutlet, Sidebar, Footer],
  templateUrl: "./layout.html",
  styleUrl: "./layout.css",
})
export class Layout {
  isSidebarCollapsed = false;
  sidebarInitialized = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  ngOnInit() {
  // Simulate async or initial logic
  setTimeout(() => {
    this.sidebarInitialized = true;
  }, 0); // Or fetch data, etc.
}
}
