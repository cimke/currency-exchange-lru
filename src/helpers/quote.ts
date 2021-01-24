import { IQuote } from '../interfaces/IQuote';
import { IQuoteResponse } from '../interfaces/IQuoteResponse';
import { ICurrencyObject } from '../interfaces/ICurrencyObject';
import axios from 'axios';

const Cache = require('../cache/LRU');
const cache = new Cache().getInstance();

export const getQuote = async (quote: IQuote) => {
	let baseObject: ICurrencyObject | null = cache.read(quote.baseCurrency);

	//if we don't have a record in cache with this base currency, pull all supported currencies
	if (!baseObject) {
		baseObject = await getBaseCurrencies(quote.baseCurrency);
		cache.add(quote.baseCurrency, baseObject);
	}
	console.log('cache', cache)
	return createReturnObject(baseObject as ICurrencyObject, quote);
};

const getBaseCurrencies = async (
	baseCurrency: string
): Promise<ICurrencyObject> => {
	const url: URL = getBaseCurrenciesUrl(baseCurrency);

	try {
		return await axios.get(url.href).then((resp) => {
			return resp.data as ICurrencyObject;
		});
	} catch (e) {
		throw new Error(`Controller | Quote: ${e.message || e}`);
	}
};

const getBaseCurrenciesUrl = (baseCurrency: string): URL => {
	const baseURL = 'https://api.exchangeratesapi.io/';

	const url = new URL('/latest', baseURL);
	url.searchParams.append('base', baseCurrency);
	url.searchParams.append('symbols', supportedCurrencies(baseCurrency));

	return url;
};

const createReturnObject = (
	responseData: ICurrencyObject,
	quote: IQuote
): IQuoteResponse => {
	const rate = responseData.rates[quote.quoteCurrency];

	return {
		exchange_rate: parseFloat(rate.toFixed(3)),
		quote_amount: calculateQuoteAmount(rate, quote.baseAmount)
	} as IQuoteResponse;
};

const supportedCurrencies = (baseCurrency: string): string => {
	const supportedCurrencies = ['USD', 'EUR', 'GBP', 'ILS'];

	// We've to remove baseCurrency from the list because of "Symbols 'USD, EUR, GBP, ILS' are invalid for date 2021-01-**"
	return supportedCurrencies
		.filter((currency) => currency !== baseCurrency)
		.join(',');
};

const calculateQuoteAmount = (rate: number, baseAmount: number): number => {
	return Math.round(baseAmount * rate);
};
