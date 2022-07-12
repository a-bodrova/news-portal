import { DataNews } from '../common/interfaces';

class ArticlesStore {
  private _total = 0;
  private _currentPage = 0;
  private _isLoading = false;
  private _data: Array<DataNews> = [];
  private _itemsPerPage = 10;

  set data(data: Array<DataNews>) {
    this._data = [...data];
  }

  get data() {
    return this._data;
  }

  get currentChunk() {
    const page = this.currentPage;
    const limit = this.itemsPerPage;
    const currentChunk = this._data.slice(page * limit, page * limit + limit);
    return currentChunk;
  }

  set total(val: number) {
    this._total = val;
  }

  get total() {
    return this._total;
  }

  set currentPage(val: number) {
    this._currentPage = val;
  }

  get currentPage() {
    return this._currentPage;
  }

  set isLoading(val: boolean) {
    this._isLoading = val;
  }

  get isLoading() {
    return this._isLoading;
  }

  set itemsPerPage(val: number) {
    this._itemsPerPage = val;
  }

  get itemsPerPage() {
    return this._itemsPerPage;
  }
}

export const articlesStore = new ArticlesStore();
