import { INode } from './INode';

export interface ILRU {
	size: number;
	limit: number;
	head: INode | null;
	tail: INode | null;
	cacheObject: { [key: string]: INode };
}
