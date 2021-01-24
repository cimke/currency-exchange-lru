import { INode } from '../interfaces/cache/INode';

export default class LRUNode implements INode {
	key: string;
	value: string;
	next: INode | null;
	prev: INode | null;

	constructor(
		key: string,
		value: string,
		next: INode | null = null,
		prev: INode | null = null
	) {
		this.key = key;
		this.value = value;
		this.next = next;
		this.prev = prev;
	}
}
