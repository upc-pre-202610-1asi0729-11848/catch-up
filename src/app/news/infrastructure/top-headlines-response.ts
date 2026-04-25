/**
 * Provider resource describing the source embedded inside an article payload.
 */
export interface ArticleSourceResource {
  /** Source identifier, which may be absent in provider data. */
  id: string | null;
  /** Human-readable source name supplied by the provider. */
  name: string;
}

/**
 * Provider resource that describes one article in the top-headlines response.
 */
export interface ArticleResource {
  /** Source fragment embedded in the provider article payload. */
  source: ArticleSourceResource;
  /** Headline shown to the user. */
  title: string;
  /** Optional summary text returned by the provider. */
  description: string | null;
  /** Canonical article URL. */
  url: string;
  /** Optional preview image URL. */
  urlToImage: string | null;
  /** Publication timestamp returned by the provider. */
  publishedAt: string;
}

/**
 * Provider response containing top headlines for a selected source.
 */
export interface TopHeadlinesResponse {
  /** Provider status flag for the request. */
  status: string;
  /** Total number of results reported by the provider. */
  totalResults: number;
  /** Article resources included in the response. */
  articles: ArticleResource[];
}

