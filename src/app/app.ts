import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `<app-header></app-header>
  <router-outlet></router-outlet>`,
})
export class App {}
