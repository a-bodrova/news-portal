import AppLoader from './appLoader';
import { ICallback, IAppController } from '../../common/interfaces';
import { ENDPOINTS } from '../../common/constants';

class AppController extends AppLoader implements IAppController {
  getSources(callback: ICallback) {
    super.getResp({ endpoint: ENDPOINTS.sources }, callback);
  }

  getNews(e: Event, callback: ICallback) {
    let { target } = e;
    const newsContainer = e.currentTarget as HTMLElement;
    console.log((e.currentTarget as HTMLElement).children);

    if (target) {
      while (target !== newsContainer) {
        if ((target as HTMLElement).classList.contains('source__item')) {
          (e.currentTarget as HTMLElement).childNodes.forEach((item) => {
            if (
              item instanceof HTMLDivElement &&
              item.classList.contains('source__item')
            ) {
              item.classList.remove('active');
            }
          });
          (target as HTMLElement).classList.add('active');
          const sourceId = (target as HTMLElement).getAttribute(
            'data-source-id'
          );

          if (sourceId) {
            if (newsContainer.getAttribute('data-source') !== sourceId) {
              newsContainer.setAttribute('data-source', sourceId);
              super.getResp(
                {
                  endpoint: ENDPOINTS.everything,
                  options: {
                    sources: sourceId,
                  },
                },
                callback
              );
            }
          }
          return;
        }
        target = (target as HTMLElement).parentNode;
      }
    }
  }
}

export default AppController;
