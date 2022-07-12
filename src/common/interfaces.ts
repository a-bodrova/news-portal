import { RequestParams } from './typings';

// interfaces for classes

export interface ILoader {
  readonly baseLink: string;
  readonly options: Partial<IOptions>;
  getResp: (param: RequestParams) => void;
}

export interface IAppController extends ILoader {
  getSources: (callback: ICallback) => void;
  getNews: (e: Event, callback: ICallback) => void;
}

export interface IApp {
  controller: IAppController;
  view: IAppView;
  start: () => void;
}

export interface IAppView {
  alphabet: IDataDrawer<Array<string>>;
  news: IDataDrawer<ReadonlyArray<DataNews>>;
  sources: IDataDrawer<ReadonlyArray<DataSources>>;
  drawNews: (data?: ResponseObject) => void;
  drawSources: (data?: ResponseObject) => void;
}

export interface IDataDrawer<T> {
  draw: (data: T) => void;
}

export interface IAlphabet {
  container: HTMLElement | null;
  draw: (data: string[]) => void;
}

// interfaces for API-data

export interface DataSources {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface DataNews {
  source: Pick<DataSources, 'id' | 'name'>;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ResponseObject {
  status: string;
  totalResults: number;
  sources?: Array<DataSources>;
  articles?: Array<DataNews>;
}

// stores

export interface SortedSource {
  [key: string]: DataSources[];
}

export interface IFilterStore {
  _category: string;
  _language: string;
  _country: string;
}

// others

export interface ICallback {
  (arg0?: ResponseObject): void;
}

export interface IOptions {
  apiKey: string;
  sources: string;
}
