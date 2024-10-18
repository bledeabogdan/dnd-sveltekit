export type Item = {
	id: string;
	content: string;
};

const itemDataKey = Symbol('item');

export type ItemData = { [itemDataKey]: true; itemId: Item['id'] };

export function getItemData(item: Item): ItemData {
	return { [itemDataKey]: true, itemId: item.id };
}

export function isItemData(data: Record<string | symbol, unknown>): data is ItemData {
	return data[itemDataKey] === true;
}
