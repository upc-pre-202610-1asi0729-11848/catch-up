import {Component, input} from '@angular/core';
import {Article} from '../../../domain/model/article.entity';
import {ArticleItem} from '../article-item/article-item';

/**
 * Presentation component that renders the article collection for one source.
 *
 * @remarks
 * This component is intentionally thin: it receives already prepared article
 * entities and delegates the rendering of each entry to `ArticleItem`.
 */
@Component({
  selector: 'app-article-list',
  imports: [
    ArticleItem
  ],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css'
})
export class ArticleList {
  /** Input collection of articles belonging to the selected source. */
  articles = input.required<Array<Article>>();
}
