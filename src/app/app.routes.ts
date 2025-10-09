import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Layout } from './layout/layout/layout';
import { Dashboard } from './layout/dashboard/dashboard';
import { Clients } from './pages/clients/clients';

export const routes: Routes = [
  {
      path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
      path: 'login',
      component: Login
  },
  {
      path: '',
      component: Layout,
      children: [
        {
            path: 'dashboard',
            component: Dashboard
        },
        {
            path: 'clients',
            component: Clients
        }

      ]
  }
];
