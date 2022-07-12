import { ENDPOINTS } from './constants';
import { IOptions } from './interfaces';

export type RequestParams = {
  endpoint: ENDPOINTS;
  options?: Partial<IOptions>;
};
