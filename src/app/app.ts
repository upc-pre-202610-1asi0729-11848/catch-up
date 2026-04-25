import {Component, signal} from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';

/**
 * Root component of the CatchUp application.
 *
 * @remarks
 * Its responsibility is limited to bootstrapping the main layout of the news
 * experience.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    Layout
  ],
  styleUrl: './app.css'
})
export class App {
  /** Application title signal exposed to the root template. */
  protected readonly title = signal('catch-up');
}
