// 전력망을 둘로 나누기
// 문제 설명
// n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결되어 있습니다. 당신은 이 전선들 중 하나를 끊어서 현재의 전력망 네트워크를 2개로 분할하려고 합니다. 이때, 두 전력망이 갖게 되는 송전탑의 개수를 최대한 비슷하게 맞추고자 합니다.

// 송전탑의 개수 n, 그리고 전선 정보 wires가 매개변수로 주어집니다. 전선들 중 하나를 끊어서 송전탑 개수가 가능한 비슷하도록 두 전력망으로 나누었을 때, 두 전력망이 가지고 있는 송전탑 개수의 차이(절대값)를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// n은 2 이상 100 이하인 자연수입니다.
// wires는 길이가 n-1인 정수형 2차원 배열입니다.
// wires의 각 원소는 [v1, v2] 2개의 자연수로 이루어져 있으며, 이는 전력망의 v1번 송전탑과 v2번 송전탑이 전선으로 연결되어 있다는 것을 의미합니다.
// 1 ≤ v1 < v2 ≤ n 입니다.
// 전력망 네트워크가 하나의 트리 형태가 아닌 경우는 입력으로 주어지지 않습니다.
// 입출력 예
// n	wires	result
// 9	[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]	3
// 4	[[1,2],[2,3],[3,4]]	0
// 7	[[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]]	1

// function solution(n, wires) {
// 	let answer = Number.MAX_SAFE_INTEGER;

// 	let obj = {};

// 	wires.forEach((wire) => {
// 		let [a, b] = wire;

// 		if (!obj[a]) obj[a] = [];
// 		if (!obj[b]) obj[b] = [];

// 		obj[a].push(b);
// 		obj[b].push(a);
// 	});

// 	console.log(obj, "확인");
// 	let cnt = 0;

// 	const bfs = (node) => {
// 		let visited = [];
// 		let needVisit = [node];

// 		while (needVisit.length !== 0) {
// 			let cur = needVisit.shift();
// 			wires.forEach((wire) => {
// 				if (wire.includes(cur)) {
// 					let other = wire[0] === cur ? wire[1] : wire[0];
// 					if (!visited.includes(other)) needVisit.push(other);
// 				}
// 			});
// 			visited.push(cur);
// 		}
// 		return visited.length;
// 	};

// 	while (cnt !== wires.length) {
// 		let cur = wires.shift();
// 		let node1 = cur[0];
// 		let node2 = cur[1];

// 		answer = Math.min(answer, Math.abs(bfs(node1) - bfs(node2)));
// 		wires.push(cur);
// 		cnt++;
// 	}
// 	return answer;
// }

const solution = (n, wires) => {
	const obj = {};

	// 노드 채우기

	wires.forEach((wire) => {
		const [wire1, wire2] = wire;
		if (!obj[wire1]) obj[wire1] = [];
		if (!obj[wire2]) obj[wire2] = [];

		obj[wire1].push(wire2);
		obj[wire2].push(wire1);
	});
	console.log(obj);

	const bfs = (node, exception) => {
		console.log("-----------------------");
		let visited = [];
		let queue = [node];
		let count = 0;
		while (queue.length) {
			let cur = queue.shift();
			console.log(cur, "현재노드");
			visited[cur] = true;
			count++;
			obj[cur].forEach((child) => {
				console.log(child, exception);
				if (!visited[child] && child !== exception) {
					queue.push(child);
				}
			});
		}

		console.log(count, visited.length, "-------------------비교");

		return count;
	};

	let answer = 100;

	wires.forEach((wire) => {
		let node1 = wire[0];
		let node2 = wire[1];
		answer = Math.min(Math.abs(bfs(node1, node2) - bfs(node2, node1)), answer);
	});

	return answer;
};

console.log(
	solution(9, [
		[1, 3],
		[2, 3],
		[3, 4],
		[4, 5],
		[4, 6],
		[4, 7],
		[7, 8],
		[7, 9],
	])
);
