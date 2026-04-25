import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * Infrastructure gateway to the logo provider used for source branding.
 *
 * @remarks
 * The gateway derives logo URLs from source domains so the rest of the
 * application can treat branding as a simple string property on `Source`.
 */
@Injectable({providedIn: 'root'})
export class LogoDevApi {
  baseUrl = environment.logoProviderApiBaseUrl;
  apiKey  = environment.logoProviderPublishableKey;

  constructor() {}

  /**
   * Builds a logo URL for a source website.
   *
   * @param domain - Absolute source website URL.
   * @returns URL that points to the logo image for the source hostname.
   */
  getUrlToLogo(domain: string): string {
    return `${this.baseUrl}${new URL(domain).hostname}?token=${this.apiKey}`;
  }
}
