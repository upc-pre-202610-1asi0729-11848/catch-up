import {Source} from './source.entity';

/**
 * Domain entity representing a news article that users can read and share.
 *
 * @remarks
 * This entity captures the article information needed by the application while
 * keeping provider-specific payload details inside the infrastructure layer.
 */
export class Article {
  /** Human-readable headline displayed in lists and cards. */
  title: string;
  /** Short summary used as preview content for the article. */
  description: string;
  /** Canonical URL that opens the original article. */
  url: string;
  /** Preview image URL, normalized to an empty string when unavailable. */
  urlToImage: string;
  /** Publication timestamp returned by the provider as a string. */
  publishedAt: string;
  /** News source that published the article. */
  source: Source;

  /**
   * Creates an empty article instance with defined fields.
   */
  constructor() {
    this.title = '';
    this.description = '';
    this.urlToImage = '';
    this.url = '';
    this.publishedAt = '';
    this.source = new Source();
  }
}
