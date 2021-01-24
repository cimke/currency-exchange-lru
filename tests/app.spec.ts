import app from '../src/app';
import chai from 'chai';
import chaiHttp from 'chai-http'
import 'mocha';

chai.use(chaiHttp);

const assert = chai.assert;

describe('Main API request and test route', () => {
    const mainRequestText = 'Hello I am Tomas';
    const pingRequestResponse = 'pong';

    it(`should return ${mainRequestText} on '/' `, async () => {
        return chai.request(app).get('/').then((response) => {
            chai.expect(response.text).to.equal(mainRequestText);
        });
    });
    it(`should return "${pingRequestResponse}" on '/ping' `, async () => {
        return chai.request(app).get('/ping').then((response) => {
            chai.expect(response.text).to.equal(pingRequestResponse);
        });
    });
});

describe('Quote route', () => {
    const quoteRouteValidationBase = 'Following params are missing:';

    it('should throw error because of missing "quote_currency" param', async () => {
        return chai.request(app)
            .get('/quote').query({
                base_currency: 'USD',
                base_amount: 100
            })
            .then((response) => {
                chai.expect(JSON.parse(response.text)).to.equal(`${quoteRouteValidationBase} quote_currency`);
            });
    });
    it('should return correct object', async () => {
        return chai.request(app)
            .get('/quote').query({
                base_currency: 'USD',
                base_amount: 100,
                quote_currency: 'EUR'
            })
            .then((response) => {
                assert.hasAllKeys(response.body, ['exchange_rate', 'exchange_rate']);
            });
    });
});
