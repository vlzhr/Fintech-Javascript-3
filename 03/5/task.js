/**
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */

const dic = { "V": 5, "I": 1, "X": 10 };

function getNumFromRim(rim) {
	let count = 0, last_way = 0, way = 1;
	for (let num in rim) {
		if (num == 0) {
			last_way += dic[rim[0]]
		} else {
			if (dic[rim[num-1]] < dic[rim[num]] * way) {
				count -= last_way * way;
				way = 0 - way;
				last_way = 0;
			} else if (dic[rim[num-1]] > dic[rim[num]] * way) {
				count += last_way * way;
				last_way = 0;
			}
			last_way += dic[rim[num]];
		}	
		// console.log(count, last_way);	
	}
	count += last_way;

	return Array.apply(null, Array(count)).map((_, i) => {return i;});
}

var handler = {
    get: function(target, name){
    	return getNumFromRim(name);
    }
};

Number.prototype.__proto__ = new Proxy(Number.prototype, handler);

