import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IApp, IAppView, IAppController } from '../../common/interfaces';

class App implements IApp {
  controller: IAppController;
  view: IAppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sourcesContainer = document.querySelector('.sources');
    if (sourcesContainer) {
      (sourcesContainer as HTMLElement).addEventListener('click', (e) => {
        // sourcesContainer.childNodes.forEach((item) => {
        //   if ((item as HTMLElement).classList.contains('active')) {
        //     (item as HTMLElement).classList.remove('active');
        //   }
        // });

        // (e.target as HTMLElement).classList.add('active');

        this.controller.getNews(e, (data) => {
          this.view.drawNews(data);
        });
      });

      this.controller.getSources((data) => this.view.drawSources(data));
    }
  }
}

export default App;
