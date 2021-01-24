import { ICurrency } from './ICurrency';

export interface ICurrencyObject {
	rates: ICurrency;
	base: string;
	date: Date;
}
