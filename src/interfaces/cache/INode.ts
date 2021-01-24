export interface INode {
	key: string;
	value: string;
	next: INode | null;
	prev: INode | null;
}
