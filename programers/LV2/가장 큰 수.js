function solution(numbers) {
	let res = [];
	for (let number of numbers) res.push(number.toString());
	// 내림차순
	res.sort(function (a, b) {
		console.log(b + a, a + b);
		return b + a - (a + b);
	});

	return res.join("");
}

const array = [3, 30, 34, 5, 9];

console.log(solution(array));
