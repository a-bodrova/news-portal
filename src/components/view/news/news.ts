import './news.css';
import { articlesStore } from '../../../stores/articlesStore';
import { DataNews, IDataDrawer } from '../../../common/interfaces';

class News implements IDataDrawer<ReadonlyArray<DataNews>> {
  draw(data: ReadonlyArray<DataNews>): void {
    const news = [...data];

    const fragment = document.createDocumentFragment();

    const newsItemTemp = document.querySelector('#newsItemTemp');

    if (newsItemTemp) {
      articlesStore.isLoading = false;
      news.forEach((item, idx: number) => {
        const newsClone = (newsItemTemp as HTMLTemplateElement).content.cloneNode(
          true
        ) as HTMLElement;

        const newsItem = newsClone.querySelector('.news__item');
        if (idx % 2 && newsItem) newsItem.classList.add('alt');

        const itemPhoto = newsClone.querySelector('.news__meta-photo');
        if (itemPhoto)
          (itemPhoto as HTMLElement).style.backgroundImage = `url(${
            item.urlToImage || './assets/img/placeholderNews.png'
          })`;

        const itemAuthor = newsClone.querySelector('.news__meta-author');
        if (itemAuthor)
          itemAuthor.textContent = item.author || item.source.name;

        const itemDate = newsClone.querySelector('.news__meta-date');
        if (itemDate)
          itemDate.textContent = item.publishedAt
            .slice(0, 10)
            .split('-')
            .reverse()
            .join('-');

        const descriptionTitle = newsClone.querySelector(
          '.news__description-title'
        );
        if (descriptionTitle) descriptionTitle.textContent = item.title;

        const descriptionSource = newsClone.querySelector(
          '.news__description-source'
        );
        if (descriptionSource) descriptionSource.textContent = item.source.name;

        const descriptionContent = newsClone.querySelector(
          '.news__description-content'
        );
        if (descriptionContent)
          descriptionContent.textContent = item.description;

        const readMore = newsClone.querySelector('.news__read-more a');
        if (readMore) readMore.setAttribute('href', item.url);

        fragment.append(newsClone);
      });
    }

    const newsContainer = document.querySelector('.news');
    if (newsContainer) {
      newsContainer.innerHTML = '';
      newsContainer.appendChild(fragment);
    }
  }
}

export default News;
