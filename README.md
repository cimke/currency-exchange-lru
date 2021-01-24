# Currency exchange with LRU cache

The task was done with the LRU cache algorithm and used the Singleton pattern.

After the first correct requests, all supported currencies (`USD, EUR, GBP, and ILS.`) are being stored in the LRU cache. The values of the currencies are set according to `base_currency`.

LRU cache limit is `2` elements as described in the task.


## Installation

```bash
yarn install
```
## Run the project
```bash
yarn dev
```
## Usage
Open [localhost:8000](http://localhost:8000).

Send get request to `/query` with `base_currency`, `quote_currency`, `base_amount` to receive an object with interface:
```
interface responseExample {
	exchange_rate: number;
	quote_amount: number;
}
```
**Note:** All query params must be filled in.



## Run the tests
```bash
yarn tests
```