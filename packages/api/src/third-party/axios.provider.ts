import Axios from 'axios';
import { Provider } from '@nestjs/common';

export const AxiosToken = Symbol('Axios');
export const AxiosProvider: Provider = {
  provide: AxiosToken,
  useValue: Axios
};
