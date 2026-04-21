import {Source} from './source.entity';

export class Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: Source;

  constructor() {
    this.title = '';
    this.description = '';
    this.urlToImage = '';
    this.url = '';
    this.publishedAt = '';
    this.source = new Source();
  }
}
