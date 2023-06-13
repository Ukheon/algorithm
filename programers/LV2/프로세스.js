// function solution(priorities, location) {
// 	const posMap = [];
// 	priorities.forEach((_, index) => (posMap[index] = index));

// 	let max = Math.max(...priorities);
// 	let maxCount = priorities.filter((value) => value === max).length;
// 	let count = 0;
// 	while (1) {
// 		let priority = priorities.shift();
// 		let dupLocation = posMap.shift();

// 		if (priority === max && dupLocation === location) return ++count;

// 		if (priority === max) {
// 			maxCount--;
// 			count++;
// 			priorities.shift();
// 		} else {
// 			priorities.push(priority);
// 			posMap.push(dupLocation);
// 		}

// 		if (maxCount === 0) {
// 			max = Math.max(...priorities);
// 			maxCount = priorities.filter((value) => value === max).length;
// 		}
// 	}
// }

/**
 * Some, Every함수
 * Some = 배열안 조건중 하나라도 true면 true 리턴 (OR)
 * Evenry = 배열안 모든 조건이 true여야 true 리턴 (AND)
 */

function solution(priorities, location) {
	const list = priorities.map((priority, index) => ({
		target: location === index,
		priority,
	}));

	let count = 0;

	while (1) {
		const cur = list.shift();
		if (list.some((value) => value.priority > cur.priority)) {
			list.push(cur);
		} else {
			count++;
			if (cur.target) return count;
		}
	}
}

console.log(solution([1, 1, 9, 1, 1, 1], 0), "답");
