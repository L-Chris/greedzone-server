let attrArr = ['id', 'canRemove', 'createUser', 'createTime', 'updateUser', 'updateTime']

class BaseCtr {
	constructor (params) {		
		params = BaseCtr.filterObj(attrArr, params)
		Object.assign(this, params)
	}

	// 根据字符串数组返回含有对应名字属性的对象
	static filterObj(attrArr, obj) {
		let newObj = JSON.parse(JSON.stringify(obj))
		for (let [k, v] of Object.entries(obj)) {
			if (!attrArr.includes(k)) {
				delete newObj[k]
			}
		}
		return newObj
	}
}

module.exports = BaseCtr