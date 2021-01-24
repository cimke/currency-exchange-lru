import express from 'express';
import ping from './routes/ping';
import quote from './routes/quote';
import { logger } from './middlewares/Logger';

const app = express();

app.set('port', process.env.PORT || 8000);

app.use(logger);

app.get('/', (req, res) => res.send('Hello I am Tomas'));
app.use('/ping', ping);
app.use('/quote', quote);

export default app;
