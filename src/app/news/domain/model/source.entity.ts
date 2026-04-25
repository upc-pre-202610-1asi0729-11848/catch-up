/**
 * Domain entity representing a news source that can publish articles.
 *
 * @remarks
 * A source is the navigation anchor for the news browsing flow and provides
 * the branding data required by the presentation layer.
 */
export class Source {
  /** Stable identifier supplied by the news provider. */
  id: string;
  /** Display name shown in the source navigation. */
  name: string;
  /** Website URL used to derive attribution and branding information. */
  url: string;
  /** Logo URL derived from the source website. */
  urlToLogo: string;

  /**
   * Creates an empty source instance with defined fields.
   */
  constructor() {
    this.id = '';
    this.name = '';
    this.url = '';
    this.urlToLogo = '';
  }
}
