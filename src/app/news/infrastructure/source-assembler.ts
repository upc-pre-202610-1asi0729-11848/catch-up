import {LogoDevApi} from '../../shared/infrastructure/logo-dev-api';
import {SourceResource, SourcesResponse} from './sources-response';
import {Source} from '../domain/model/source.entity';

/**
 * Maps source resources from the news provider into domain entities.
 *
 * @remarks
 * This assembler is responsible for deriving source logos from the provider URL
 * so presentation components can work with fully prepared source entities.
 */
export class SourceAssembler {
  static logoApi: LogoDevApi;

  /**
   * Configures the logo provider used during source enrichment.
   *
   * @param logoApi - Gateway used to derive a logo URL from a source website.
   * @returns The assembler type to support fluent static calls.
   */
  static withLogoApi(logoApi: LogoDevApi) {
    this.logoApi = logoApi;
    return this;
  }

  /**
   * Translates one provider source resource into a domain source.
   *
   * @param resource - Raw source resource returned by the provider.
   * @returns Source entity enriched with a derived logo URL.
   */
  static toEntityFromResource(resource: SourceResource): Source {
    return {
      id: resource.id,
      name: resource.name,
      url: resource.url || '',
      urlToLogo: this.logoApi.getUrlToLogo(resource.url)
    };
  }

  /**
   * Translates a provider sources response into domain sources.
   *
   * @param response - Provider response containing available sources.
   * @returns Source entities ready for application use.
   */
  static toEntitiesFromResponse(response: SourcesResponse): Source[] {
    return response.sources.map(source => this.toEntityFromResource(source));
  }

}
