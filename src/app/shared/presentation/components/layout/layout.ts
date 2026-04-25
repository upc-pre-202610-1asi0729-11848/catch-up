import {AfterViewInit, Component, inject} from '@angular/core';
import {NewsStore} from '../../../../news/application/news.store';
import {Source} from '../../../../news/domain/model/source.entity';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {SourceList} from '../../../../news/presentation/components/source-list/source-list';
import {MatIcon} from '@angular/material/icon';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {ArticleList} from '../../../../news/presentation/components/article-list/article-list';
import {Footer} from '../footer/footer';
import {MatIconButton} from '@angular/material/button';

/**
 * Main shell component that orchestrates source navigation and article content.
 *
 * @remarks
 * This container bridges user interactions in the presentation layer with the
 * `NewsStore`, keeping feature state management out of leaf components.
 */
@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContainer,
    MatToolbar,
    MatSidenav,
    SourceList,
    MatSidenavContent,
    MatIcon,
    LanguageSwitcher,
    ArticleList,
    Footer,
    MatIconButton
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements AfterViewInit {

  /** Injected application store for the News bounded context. */
  protected store = inject(NewsStore);
  /** Reactive source list consumed by source navigation UI. */
  protected readonly sources = this.store.sources;
  /** Reactive article list for the currently selected source. */
  protected readonly articles = this.store.currentSourceArticles;


  /** Initializes source and article data once the shell view is ready. */
  ngAfterViewInit(): void {
    this.store.loadSources();
  }

  /**
   * Updates source selection and triggers article loading.
   *
   * @param source - Source selected by the user.
   */
  updateArticlesBySource(source: Source): void {
    this.store.currentSource = source;
    this.store.loadArticlesForCurrentSource();
  }
}
