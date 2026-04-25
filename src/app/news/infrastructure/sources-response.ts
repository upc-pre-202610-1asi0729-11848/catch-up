/**
 * Provider resource that describes a single news source.
 *
 * @remarks
 * This contract mirrors the external response shape consumed by the
 * infrastructure layer before it is mapped into a domain `Source`.
 */
export interface SourceResource {
  /** Stable source identifier supplied by the provider. */
  id: string;
  /** Display name of the source in provider data. */
  name: string;
  /** Website URL used to derive source branding. */
  url: string;
  /** Optional logo field reserved for locally enriched representations. */
  urlToLogo: string;
}

/**
 * Provider response containing the catalog of available news sources.
 */
export interface SourcesResponse {
  /** Provider status flag for the request. */
  status: string;
  /** Source resources returned for browsing. */
  sources: SourceResource[];
}
