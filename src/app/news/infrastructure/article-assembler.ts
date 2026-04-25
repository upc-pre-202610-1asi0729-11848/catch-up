import {LogoDevApi} from '../../shared/infrastructure/logo-dev-api';
import {ArticleResource, TopHeadlinesResponse} from './top-headlines-response';
import {Article} from '../domain/model/article.entity';

/**
 * Maps article resources from the news provider into domain entities.
 *
 * @remarks
 * The provider does not return enough source data to derive logos for article
 * entries, so source enrichment is completed later by the application layer.
 */
export class ArticleAssembler {
  static logoApi: LogoDevApi;

  /**
   * Configures shared collaborators for assembler pipelines.
   *
   * @param logoApi - Logo provider gateway shared across infrastructure mappers.
   * @returns The assembler type to support fluent static calls.
   */
  static withLogoApi(logoApi: LogoDevApi) {
    this.logoApi = logoApi;
    return this;
  }

  /**
   * Translates one provider article resource into a domain article.
   *
   * @param resource - Raw article resource returned by the provider.
   * @returns Normalized article entity with nullable provider fields converted.
   */
  static toEntityFromResource(resource: ArticleResource): Article {
    return {
      source: {
        id: resource.source.id || '',
        name: resource.source.name,
        url: '',
        urlToLogo: ''
      },
      title: resource.title,
      description: resource.description || '',
      url: resource.url,
      urlToImage: resource.urlToImage || '',
      publishedAt: resource.publishedAt
    };
  }

  /**
   * Translates a top-headlines response into domain articles.
   *
   * @param response - Provider response containing article resources.
   * @returns Article entities ready for use by the application layer.
   */
  static toEntitiesFromResponse(response: TopHeadlinesResponse): Article[] {
   return response.articles.map(article => this.toEntityFromResource(article));
  }
}
