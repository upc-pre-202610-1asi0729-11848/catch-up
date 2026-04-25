import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

/**
 * Presentation component that switches the active application language.
 *
 * @remarks
 * This component supports the inclusivity user story by delegating language
 * changes to the translation service while keeping the UI state explicit.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  /** Currently active language code reflected by the toggle group. */
  currentLang = 'en';
  /** Supported language codes available to the user. */
  languages: string[] = ['en', 'es'];

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.getCurrentLang();
  }

  /**
   * Activates a language for subsequent translations.
   *
   * @param language - Language code chosen by the user.
   */
  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
