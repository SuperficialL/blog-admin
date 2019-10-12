/*
 * @Author: Superficial
 * @Date: 2019-10-10 23:33:31
 * @LastEditTime: 2019-10-11 21:58:17
 * @Description: 将扁平化数组转换成数结构
 */
export default function translateToTree(data) {
	let parents = data.filter(
		(item) => item.parent === undefined || item.parent === null
	);
	let children = data.filter(
		(item) => item.parent !== undefined && item.parent !== null
	);
	parents.forEach((parent) => {
		parent.children = [];
		children.forEach((child) => {
			if (child.parent === parent._id) {
				parent.children.push(child);
			}
		});
	});
	return parents;
}
