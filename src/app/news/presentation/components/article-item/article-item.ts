import {Component, inject, input} from '@angular/core';
import {Article} from '../../../domain/model/article.entity';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';

/**
 * Presentation component responsible for rendering and sharing one article.
 *
 * @remarks
 * The component delegates state ownership to the application layer and only
 * handles user interface concerns such as rendering and feedback messages.
 */
@Component({
  selector: 'app-article-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    DatePipe,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardImage,
    TranslatePipe,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './article-item.html',
  styleUrl: './article-item.css'
})
export class ArticleItem {
  private snackBar = inject(MatSnackBar);
  /** Input article supplied by the current application state projection. */
  article = input.required<Article>();

  /**
   * Shares the current article through the Web Share API or clipboard fallback.
   *
   * @remarks
   * This behavior supports the article interaction story while keeping the
   * sharing workflow encapsulated in the component that owns the action UI.
   */
  async shareArticle(): Promise<void> {
    const articleShareInfo = {
      title: this.article()?.title,
      url: this.article()?.url
    };

    if (navigator.share) {
      try {
        await navigator.share(articleShareInfo);
        this.snackBar.open('Article shared successfully!', 'Close', { duration: 3000 });
      } catch (error) {
        this.snackBar.open('Sharing failed.', 'Close', { duration: 3000 });
      }
    } else {
      try {
        if (articleShareInfo.url) {
          await navigator.clipboard.writeText(articleShareInfo.url);
          this.snackBar.open('Article URL copied to clipboard!', 'Close', { duration: 3000 });
        }
      } catch (error) {
        this.snackBar.open('Failed to copy URL.', 'Close', { duration: 3000 });
      }
    }
  }


}
