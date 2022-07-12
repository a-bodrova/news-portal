import News from './news/news';
import Sources from './sources/sources';
import Alphabet from './alphabet/alphabet';
import {
  IAppView,
  ResponseObject,
  IDataDrawer,
  IAlphabet,
  DataNews,
  DataSources,
} from '../../common/interfaces';
import { articlesStore } from '../../stores/articlesStore';
import { sourcesStore } from '../../stores/sourcesStore';

export class AppView implements IAppView {
  alphabet: IAlphabet;
  news: IDataDrawer<ReadonlyArray<DataNews>>;
  sources: IDataDrawer<ReadonlyArray<DataSources>>;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
    this.alphabet = new Alphabet();
  }

  drawNews(data?: ResponseObject): void {
    const values = data?.articles ? data?.articles : [];
    articlesStore.data = values;
    articlesStore.total = data?.totalResults || 0;
    this.news.draw(articlesStore.currentChunk);
  }

  drawSources(data?: ResponseObject): void {
    const values = data?.sources ? data?.sources : [];
    sourcesStore.data = values;

    this.alphabet.draw(sourcesStore.alphabet);

    this.alphabet.container?.addEventListener('click', (e) => {
      const { target } = e;

      if (target) {
        this.alphabet.container?.childNodes.forEach((element) => {
          if (
            (element as HTMLElement).classList.contains('active') &&
            element !== target
          ) {
            (element as HTMLElement).classList.remove('active');
          }
        });
        (target as HTMLElement).classList.add('active');

        const letter = (target as HTMLElement).id;

        if (letter) {
          this.sources.draw(sourcesStore.sortedSources[letter.toLowerCase()]);
        }
      }
    });
  }
}

export default AppView;
