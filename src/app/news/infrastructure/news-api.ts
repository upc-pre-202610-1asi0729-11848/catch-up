import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LogoDevApi} from '../../shared/infrastructure/logo-dev-api';
import {map, Observable} from 'rxjs';
import {Source} from '../domain/model/source.entity';
import {SourcesResponse} from './sources-response';
import {SourceAssembler} from './source-assembler';
import {Article} from '../domain/model/article.entity';
import {TopHeadlinesResponse} from './top-headlines-response';
import {ArticleAssembler} from './article-assembler';

/**
 * Infrastructure gateway to the external news provider.
 *
 * @remarks
 * This service isolates HTTP concerns and translates provider resources into
 * domain entities before handing them to the application layer.
 */
@Injectable({providedIn: 'root'})
export class NewsApi {
  private baseUrl = environment.newsProviderApiBaseUrl;
  private newsEndpoint = environment.newsProviderNewsEndpointPath;
  private sourcesEndpoint = environment.newsProviderSourcesEndpointPath;
  private apiKey = environment.newsProviderApiKey;
  private http = inject(HttpClient);
  private logoApi = inject(LogoDevApi);

  /**
   * Fetches the catalog of available sources.
   *
   * @returns Observable that emits normalized source entities.
   */
  getSources(): Observable<Source[]> {
    return this.http.get<SourcesResponse>(`${this.baseUrl}${this.sourcesEndpoint}`, {
      params: { apiKey: this.apiKey }
    }).pipe(
      map(response => SourceAssembler.withLogoApi(this.logoApi).toEntitiesFromResponse(response))
    );
  }

  /**
   * Fetches top headlines for a specific source.
   *
   * @param sourceId - Provider source identifier used in the query parameter.
   * @returns Observable that emits normalized articles for the source.
   */
  getArticlesBySourceId(sourceId: string): Observable<Article[]> {
    return this.http.get<TopHeadlinesResponse>(`${this.baseUrl}${this.newsEndpoint}`, {
      params: { apiKey: this.apiKey, sources: sourceId }
    }).pipe(
      map(response => ArticleAssembler.withLogoApi(this.logoApi).toEntitiesFromResponse(response))
    );
  }
}
