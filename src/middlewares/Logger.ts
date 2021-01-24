import express from 'express';
import fs from 'fs';

export const logger = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const date = new Date();
	const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	const method = req.method;
	const url = req.url;
	const status = res.statusCode;
	const log = `[${formattedDate}] ${method}:${url} ${status} `;

	writeToFile(log);
	next();
};

const writeToFile = (log: string) => {
	fs.appendFile('request_logs.txt', log + '\n', (err: any) => {
		if (err) {
			console.log(err);
		}
	});
};
