// 문제 설명
// 스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

// 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
// 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
// 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
// 노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

// 제한사항
// genres[i]는 고유번호가 i인 노래의 장르입니다.
// plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
// genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
// 장르 종류는 100개 미만입니다.
// 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
// 모든 장르는 재생된 횟수가 다릅니다.
// 입출력 예
// genres	plays	return
// ["classic", "pop", "classic", "classic", "pop"]	[500, 600, 150, 800, 2500]	[4, 1, 3, 0]

// function solution(genres, plays) {
// 	const categories = {};
// 	genres.forEach((key, idx) => {
// 		if (!categories[key]) {
// 			categories[key] = [[plays[idx], idx]];
// 		} else {
// 			categories[key].push([plays[idx], idx]);
// 		}
// 	});

// 	const keySort = [];

// 	for (const [key, value] of Object.entries(categories)) {
// 		value.sort((a, b) => b[0] - a[0]);
// 		categories[key] = [...value];
// 		const sum = value.reduce((prev, curr) => {
// 			prev += curr[0];
// 			return prev;
// 		}, 0);
// 		keySort.push({ key: key, value: sum });
// 	}

// 	keySort.sort((a, b) => b.value - a.value);
// 	const res = [];
// 	for (let i = 0, limit = keySort.length; i < limit; i++) {
// 		const key = keySort[i].key;
// 		if (categories[key].length >= 2) {
// 			res.push(categories[key][0][1]);
// 			res.push(categories[key][1][1]);
// 		} else {
// 			res.push(categories[key][0][1]);
// 		}
// 	}

// 	return res;
// }

/**
 * 베스트 답안
 * @param {string[]} genres - 장르
 * @param {string[]} plays - 노래 재생횟수
 * @returns string[]
 */
function solution(genres, plays) {
	var dic = {};

	// 총 재생횟수를 구합니다
	genres.forEach((key, i) => {
		dic[key] = dic[key] ? dic[key] + plays[i] : plays[i];
	});

	var dupDic = {};
	/**
	 * map - genre에 장르, 총 재생횟수, 재생횟수의 index를 구한다
	 * sort - 총 재생횟수가 높은것을 첫번째로. 장르가 같으면 비용이 높은것을. 비용이 같으면 앞에있는 것 을 우선으로 정렬
	 * filter - dup 객체안에 횟수를 카운팅해 문제 조건중 2회를 넘어갈경우 넘기기 위한 로직
	 * map - filter로 생성된 배열의 고유번호만 가져와 리턴
	 */
	return genres
		.map((t, i) => ({ genre: t, count: plays[i], index: i }))
		.sort((a, b) => {
			if (a.genre !== b.genre) return dic[b.genre] - dic[a.genre];
			if (a.count !== b.count) return b.count - a.count;
			return a.index - b.index;
		})
		.filter((t) => {
			if (dupDic[t.genre] >= 2) return false;
			dupDic[t.genre] = dupDic[t.genre] ? dupDic[t.genre] + 1 : 1;
			return true;
		})
		.map((t) => t.index);
}
console.log(solution(["classic", "pop", "classic", "classic", "bob", "bob"], [500, 600, 150, 800, 2500, 100]));
