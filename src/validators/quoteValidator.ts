import * as express from 'express';

export const validateParams = (requiredParams: Array<string>) => (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	let missingParams: Array<string> = [];
	requiredParams.forEach((someParam) => {
		if (!req.query.hasOwnProperty(someParam)) {
			missingParams.push(someParam);
		}
	});

	if (missingParams.length) {
		const errorText = `Following params are missing: ${missingParams.join(', ')}`;
		res.setHeader('Content-Type', 'application/json');
		res.json(errorText);
		res.status(400).end();

		return;
	}

	next();
};
