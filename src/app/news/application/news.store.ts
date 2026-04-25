import {computed, inject, Injectable, signal} from '@angular/core';
import {Source} from '../domain/model/source.entity';
import {Article} from '../domain/model/article.entity';
import {NewsApi} from '../infrastructure/news-api';
import {LogoDevApi} from '../../shared/infrastructure/logo-dev-api';

/**
 * Application service that coordinates source selection and article retrieval.
 *
 * @remarks
 * This store owns the read model for the News bounded context. It exposes
 * reactive projections for presentation components, caches articles by source,
 * and ensures one source is selected by default once the catalog is loaded.
 */
@Injectable({providedIn: 'root'})
export class NewsStore {


  /** Internal signal containing all available sources. */
  private sourcesSignal = signal<Source[]>([]);
  /** Internal signal indexed by source id with cached article lists. */
  private articlesSignal = signal<Record<string, Article[]>>({});
  private newsApi = inject(NewsApi);
  private logoApi = inject(LogoDevApi);

  /** Read-only projection of available news sources. */
  readonly sources = computed(() => this.sourcesSignal());
  /** Read-only projection of the article cache keyed by source id. */
  readonly articles = computed(() => this.articlesSignal());
  /** Reactive list of articles belonging to the current source selection. */
  readonly currentSourceArticles = computed(() => this.articlesSignal()[this.currentSource?.id] ?? []);
  /** Currently selected source used as the navigation focus for queries. */
  private _currentSource!: Source;

  /**
   * Loads the available sources once and initializes the default selection.
   *
   * @remarks
   * After the first successful load, the first available source becomes the
   * current source so the article view can be populated immediately.
   */
  loadSources(): void {
    if (this.sourcesSignal().length === 0) {
      this.newsApi.getSources().subscribe(sources => {
        sources.forEach(source => source.urlToLogo = this.logoApi.getUrlToLogo(source.url));
        this.sourcesSignal.set(sources);
        this.currentSource = sources[0];
        this.loadArticlesForCurrentSource();
      });
    }
  }

  /**
   * Loads articles for the current source when they are not already cached.
   *
   * @remarks
   * The store enriches articles with source website and logo information so the
   * presentation layer does not need to repeat cross-resource lookup rules.
   */
  loadArticlesForCurrentSource(): void {
    const current = this.articlesSignal() ?? {};
    const source = this._currentSource;
    if (!current[source.id]) {
      this.newsApi.getArticlesBySourceId(source.id).subscribe(articles => {
        articles.forEach(article => {
          article.source.urlToLogo = source.urlToLogo;
          article.source.url = source.url;
        });
        this.articlesSignal.set({ ...current, [source.id]: articles });
      });
    }
  }

  /** Gets the source currently selected by the user journey. */
  get currentSource(): Source {
    return this._currentSource;
  }

  /**
   * Updates the current source and keeps the article projection in sync.
   *
   * @param value - Source selected by the user.
   */
  set currentSource(value: Source) {
    this._currentSource = value;
    this.loadArticlesForCurrentSource();
  }

}
