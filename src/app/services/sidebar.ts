import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private initialized = false;

  isInitialized(): boolean {
    return this.initialized;
  }

  setInitialized() {
    this.initialized = true;
  }
}
