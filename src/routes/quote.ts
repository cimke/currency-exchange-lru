import * as express from 'express';
const quoteController = require('../controllers/quote.controller');
const { validateParams } = require('../validators/quoteValidator');
const router = express.Router();

router.get(
	'/',
	validateParams(['base_currency', 'quote_currency', 'base_amount']),
	quoteController.getQuote
);

export default router;
