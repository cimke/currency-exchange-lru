import * as express from 'express';
import { getQuote } from '../helpers/quote';
import { IQuote } from '../interfaces/IQuote';

exports.getQuote = async function (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	const baseCurrency: string = req.query.base_currency as string;
	const quoteCurrency: string = req.query.quote_currency as string;
	const baseAmount: number = parseInt(req.query.base_amount as string);
	try {
		const quote = await getQuote({
			baseCurrency,
			quoteCurrency,
			baseAmount
		} as IQuote);
		res.send(quote);
	} catch (error) {
		next(error.message);
	}
};
