import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';

/**
 * Root Angular application configuration.
 *
 * @remarks
 * This configuration wires cross-cutting services such as HTTP access,
 * translation loading, and global error listeners.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix: './i18n/', suffix: '.json'}),
      fallbackLang: 'en'
    })
  ]
};
