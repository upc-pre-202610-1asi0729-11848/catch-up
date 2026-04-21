import { Component, signal } from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    Layout
  ],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catch-up');
}
