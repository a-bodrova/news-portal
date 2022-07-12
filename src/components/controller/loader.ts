import { RequestParams } from '../../common/typings';
import {
  ILoader,
  ICallback,
  ResponseObject,
  IOptions,
} from '../../common/interfaces';
import { ENDPOINTS, STATUS, METHODS } from '../../common/constants';
import { articlesStore } from '../../stores/articlesStore';

class Loader implements ILoader {
  constructor(readonly baseLink: string, readonly options: Partial<IOptions>) {}

  public getResp(
    { endpoint, options = {} }: RequestParams,
    callback: ICallback = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load(METHODS.GET, endpoint, callback, options);
  }

  private errorHandler(res: Response): Response | never {
    if (!res.ok) {
      if (res.status === STATUS.clientError) {
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
        throw Error(res.statusText);
      }
    }

    return res;
  }

  private makeUrl(
    options: Partial<IOptions>,
    endpoint: ENDPOINTS
  ): Request['url'] {
    const urlOptions: Partial<IOptions> = { ...this.options, ...options };
    let url: Request['url'] = `${this.baseLink}${endpoint}?`;

    (Object.keys(urlOptions) as (keyof Partial<IOptions>)[]).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(
    method: Request['method'],
    endpoint: ENDPOINTS,
    callback: ICallback,
    options: Partial<IOptions> = {}
  ): void {
    articlesStore.isLoading = true;
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: ResponseObject) => {
        callback(data);
      })
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
