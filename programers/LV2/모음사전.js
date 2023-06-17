// 모음 사전
// 문제 설명
// 사전에 알파벳 모음 'A', 'E', 'I', 'O', 'U'만을 사용하여 만들 수 있는, 길이 5 이하의 모든 단어가 수록되어 있습니다. 사전에서 첫 번째 단어는 "A"이고, 그다음은 "AA"이며, 마지막 단어는 "UUUUU"입니다.

// 단어 하나 word가 매개변수로 주어질 때, 이 단어가 사전에서 몇 번째 단어인지 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// word의 길이는 1 이상 5 이하입니다.
// word는 알파벳 대문자 'A', 'E', 'I', 'O', 'U'로만 이루어져 있습니다.
// 입출력 예
// word	result
// "AAAAE"	6
// "AAAE"	10
// "I"	1563
// "EIO"	1189
// 입출력 예 설명
// 입출력 예 #1

// 사전에서 첫 번째 단어는 "A"이고, 그다음은 "AA", "AAA", "AAAA", "AAAAA", "AAAAE", ... 와 같습니다. "AAAAE"는 사전에서 6번째 단어입니다.

// 입출력 예 #2

// "AAAE"는 "A", "AA", "AAA", "AAAA", "AAAAA", "AAAAE", "AAAAI", "AAAAO", "AAAAU"의 다음인 10번째 단어입니다.

// 입출력 예 #3

// "I"는 1563번째 단어입니다.

// 입출력 예 #4

// "EIO"는 1189번째 단어입니다.

// E 1 I 2 O 3 U 4
// 첫 번째 자리 경우 간격 781 (3905 / 5)
// 두 번째 자리 경우 간격 156 (3905 / 25)
// 세 번째 자리 경우 간격 31 (3905 / 125)
// 네 번째 자리 경우 간격 6 (3905 / 625)
// 다섯 번째 자리 간격 1 (3905 / 3125)
function solution(word) {
	const charArray = word.split("");
	let cases = [781, 156, 31, 6, 1];
	let answer = 0;

	charArray.forEach((char, index) => {
		switch (char) {
			case "A": {
				answer += 1;
				break;
			}
			case "E": {
				answer += cases[index] * 1;
				break;
			}
			case "I": {
				answer += cases[index] * 2;
				break;
			}
			case "O": {
				answer += cases[index] * 3;
				break;
			}
			case "U": {
				answer += cases[index] * 4;
				break;
			}
			default: {
				console.log("?");
			}
		}
	});
	return answer + 1;
}

// console.log(solution("AAAAE")); // 6
console.log(solution("I")); // 10
