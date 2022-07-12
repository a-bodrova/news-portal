import { ILoader } from '../../common/interfaces';
import Loader from './loader';

class AppLoader extends Loader implements ILoader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'dde3ac98a17f45e8a51f10f20c10e670', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
