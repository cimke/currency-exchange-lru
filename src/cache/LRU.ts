import { ILRU } from '../interfaces/cache/ILRU';
import { INode } from '../interfaces/cache/INode';
import LRUNode from './LRUNode';

class LRU implements ILRU {
	size: number;
	limit: number;
	head: INode | null;
	tail: INode | null;
	cacheObject: { [key: string]: INode };

	// Default is 2 as required by the task.
	constructor(limit = 2) {
		this.size = 0;
		this.limit = limit;
		this.head = null;
		this.tail = null;
		this.cacheObject = {};
	}

	add(key: string, value: string) {
		this.checkLimit();

		if (!this.head) {
			this.head = this.tail = new LRUNode(key, value);
		} else {
			const node = new LRUNode(key, value, this.head);
			this.head.prev = node;
			this.head = node;
		}

		//Update the cache list
		this.cacheObject[key] = this.head;
		this.size++;
	}

	read(key: string) {
		if (this.cacheObject[key]) {
			const value = this.cacheObject[key].value;

			// Make the element head of the list
			this.deleteNode(key);
			this.add(key, value);

			return value;
		}
	}

	checkLimit() {
		if (this.size === this.limit && this.tail) {
			this.deleteNode(this.tail.key);
		}
	}

	deleteNode(key: string) {
		const node = this.cacheObject[key];

		if (node.prev !== null) {
			node.prev.next = node.next;
		} else {
			this.head = node.next;
		}

		if (node.next !== null) {
			node.next.prev = node.prev;
		} else {
			this.tail = node.prev;
		}

		delete this.cacheObject[key];
		this.size--;
	}
}

class Singleton {
	private static instance: any;
	private static Singleton: any;

	constructor() {
		if (!Singleton.instance) {
			Singleton.instance = new LRU();
		}
	}

	getInstance(): Singleton {
		return Singleton.instance;
	}
}

module.exports = Singleton;
