// 모의고사
// 문제 설명
// 수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

// 1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
// 2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
// 3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

// 1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 제한 조건
// 시험은 최대 10,000 문제로 구성되어있습니다.
// 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
// 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.
// 입출력 예
// answers	return
// [1,2,3,4,5]	[1]
// [1,3,2,4,2]	[1,2,3]

// 1, 2, 3, 4, 5
// 2, 1, 2, 3, 2, 4, 2, 5;
// 3, 3, 1, 1, 2, 2, 4, 4, 5, 5
// function solution(answers) {
// 	const createPatternArray = (pattern, len) => {
// 		const patternLen = pattern.length;
// 		const array = [];
// 		let rewind = 0;

// 		for (let i = 0; i < len; i++) {
// 			if (!pattern[i - rewind]) {
// 				rewind += patternLen;
// 			}
// 			array[i] = pattern[i - rewind];
// 		}
// 		return array;
// 	};
// 	const res = [
// 		[0, 1],
// 		[0, 2],
// 		[0, 3],
// 	];
// 	const len = answers.length;
// 	let aArray = createPatternArray([1, 2, 3, 4, 5], len);
// 	let bArray = createPatternArray([2, 1, 2, 3, 2, 4, 2, 5], len);
// 	let cArray = createPatternArray([3, 3, 1, 1, 2, 2, 4, 4, 5, 5], len);

// 	answers.forEach((answer, index) => {
// 		if (aArray[index] === answer) res[0][0]++;
// 		if (bArray[index] === answer) res[1][0]++;
// 		if (cArray[index] === answer) res[2][0]++;
// 	});

// 	res.sort((a, b) => b[0] - a[0]);
// 	const max = res[0][0];

// 	const winner = res.filter((item) => item[0] === max).map((student) => student[1]);

// 	return winner;
// }

function solution(answers) {
	const aPick = [1, 2, 3, 4, 5];
	const bPick = [2, 1, 2, 3, 2, 4, 2, 5];
	const cPick = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

	const aCatch = answers.filter((answer, i) => answer === aPick[i % aPick.length]).length;
	const bCatch = answers.filter((answer, i) => answer === bPick[i % bPick.length]).length;
	const cCatch = answers.filter((answer, i) => answer === cPick[i % cPick.length]).length;

	const max = Math.max(aCatch, bCatch, cCatch);
	const res = [];
	if (max === aCatch) res.push(1);
	if (max === bCatch) res.push(2);
	if (max === cCatch) res.push(3);
	return res;
}
console.log(solution([1, 3, 2, 4, 2]));
