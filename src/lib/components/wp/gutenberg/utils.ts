const ConversionConfig = {
	idKey: 'clientId',
	parentKey: 'parentClientId',
	childrenKey: 'innerBlocks',
};

// interface ConversionValue {
// 	[ConversionConfig.idKey]: typeof ConversionConfig.idKey;
// 	[ConversionConfig.parentKey]: typeof ConversionConfig.parentKey;
// 	[ConversionConfig.childrenKey]: typeof ConversionConfig.childrenKey;
// };

export function flatListToHierarchical(
	data = [],
	{
		idKey = ConversionConfig.idKey,
		parentKey = ConversionConfig.parentKey,
		childrenKey = ConversionConfig.childrenKey,
	} = {}
) {
	const tree = [];
	const childrenOf = {};
	for (const item of data) {
		const newItem = { ...item };
		const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
		childrenOf[id] = childrenOf[id] || [];
		newItem[childrenKey] = childrenOf[id];
		parentId
			? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
			: tree.push(newItem);
	}
	return tree;
}
