// 문제 설명
// 조이스틱으로 알파벳 이름을 완성하세요. 맨 처음엔 A로만 이루어져 있습니다.
// ex) 완성해야 하는 이름이 세 글자면 AAA, 네 글자면 AAAA

// 조이스틱을 각 방향으로 움직이면 아래와 같습니다.

// ▲ - 다음 알파벳
// ▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)
// ◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
// ▶ - 커서를 오른쪽으로 이동 (마지막 위치에서 오른쪽으로 이동하면 첫 번째 문자에 커서)
// 예를 들어 아래의 방법으로 "JAZ"를 만들 수 있습니다.

// - 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성합니다.
// - 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킵니다.
// - 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성합니다.
// 따라서 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동입니다.
// 만들고자 하는 이름 name이 매개변수로 주어질 때, 이름에 대해 조이스틱 조작 횟수의 최솟값을 return 하도록 solution 함수를 만드세요.

// 제한 사항
// name은 알파벳 대문자로만 이루어져 있습니다.
// name의 길이는 1 이상 20 이하입니다.
// 입출력 예
// name	return
// "JEROEN"	56
// "JAN"	23

// BAB 위 왼 위

// BABAA 위 오 오 위
// 매 계산마다 절대값이 가장 낮은 곳으로 이동해서 계산.
const getRotationCount = (char) => {
	let start = 65;
	let count = 0;
	let targetAscii = char.charCodeAt(0);
	while (1) {
		if (start < 65) start = 90;
		if (start === targetAscii) return count;
		if (targetAscii <= 77) {
			start++;
		} else {
			start--;
		}

		count++;
	}
};

function solution(name) {
	const getDirection = (name, index) => {
		let len = name.length;
		let left = name.length;
		let right = name.length;
		let leftIndex = index;
		let rightIndex = index;

		while (left) {
			if (name[leftIndex] !== "A") break;
			leftIndex--;
			if (leftIndex < 0) {
				leftIndex = len - 1;
			}
			left--;
		}

		while (right) {
			if (name[rightIndex] !== "A") break;
			rightIndex++;
			if (rightIndex >= len) {
				rightIndex = 0;
			}
			right--;
		}

		return {
			right: {
				index: rightIndex,
				name: name.substring(0, rightIndex) + "A" + name.substring(rightIndex + 1),
				count: right === 0 ? 0 : Math.abs(len - right),
			},
			left: {
				index: leftIndex,
				name: name.substring(0, leftIndex) + "A" + name.substring(leftIndex + 1),
				count: left === 0 ? 0 : Math.abs(len - left),
			},
		};
	};

	const findNext = (name, index) => {
		const str = "AAB";
		let len = name.length;
		let left = name.length;
		let right = name.length;
		let leftIndex = index;
		let rightIndex = index;

		while (left--) {
			if (name[leftIndex] !== "A") break;
			leftIndex--;
			if (leftIndex < 0) {
				leftIndex = len - 1;
			}
		}

		while (right--) {
			if (name[rightIndex] !== "A") break;
			rightIndex++;
			if (rightIndex >= len) {
				rightIndex = 0;
			}
		}

		if (right >= left && right >= 0) {
			name = name.substring(0, rightIndex) + "A" + name.substring(rightIndex + 1);
			return { direction: "+", index: rightIndex, name, count: Math.abs(len - right - 1) };
		} else if (left > right) {
			name = name.substring(0, leftIndex) + "A" + name.substring(leftIndex + 1);
			return { direction: "-", index: leftIndex, name, count: Math.abs(len - left - 1) };
		}
		return { direction: "0", index, name };
	};
	let min = Number.MAX_SAFE_INTEGER;
	let plan = [];

	for (let i = 0; i < 2; i++) {
		let count = 0;
		let newName = name;
		if (name[0] !== "A") {
			count += getRotationCount(name[0]);
			newName = "A" + name.substring(1);
		}

		const initObj = getDirection(newName, 0);
		let index = 0;
		if (i === 0) {
			count += initObj.right.count;
			newName = initObj.right.name;
			index = initObj.right.index;
		} else {
			count += initObj.left.count;
			newName = initObj.left.name;
			index = initObj.left.index;
		}

		for (let j = 0; j < name.length; j++) {
			const find = findNext(newName, index);
			newName = find.name;
			index = find.index;
			if (find.direction !== "0") {
				count += find.count;
				plan.push(find);
			}
		}

		plan = [];

		if (min >= count) {
			min = count;
		}
	}

	for (let i = 1; i < name.length; i++) {
		min += getRotationCount(name[i]);
	}
	return min;
}
