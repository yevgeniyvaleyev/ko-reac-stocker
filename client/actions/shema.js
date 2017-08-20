import { schema } from 'normalizr';

// defines data structure for normalizr
export const stock = new schema.Entity('stocks');
export const arrayOfStocks = new schema.Array(stock);
