/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
	let ints = string.match( /[\-\d]+/g ).map((value) => {
		return +value;
	});
	return { max: Math.max.apply(Math, ints), min: Math.min.apply(Math, ints) };
}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
	let count;
	(x === 2) || (x === 1) ? count = 1 : count = fibonacciSimple(x-1) + fibonacciSimple(x-2);
	return count;
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciWithCache(x) {
	try {
		if (x in data) {
			return data.x;
		}
	} catch (e) {
		data = {}
	}
	
	data.x = fibonacciSimple(x);
	return data.x;
}

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
	let mat = [[]];
	let n = 0, s="";
	while (n <= max) {
		let row = mat[mat.length - 1];
		let str_n;
		n > 9 ? str_n = String(n) : str_n = [" ", n].join("");
		row.length < 4 ? mat[mat.length - 1].push(str_n) : mat.push([str_n]);
		n += 1;
	}

	mat = mat.map((element) => {
		return element.join(" ");
	})

	return mat.join("\n");
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {

	input = input.split("");

	let index = 0;
	while (true) {
		if (index+1 >= input.length) {
			break;
		}

		let step = 1;
		while (true) {
			if (input[index+step] !== input[index]) {
				if (step > 1) {
					input.splice(index+1, step-1, step);
					index += 1;
				}
				break;
			} else {
				step += 1
			}
		}

		index += 1;
		console.log(input);

	}

	return input.join("");
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
