const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "basic_programming_100_knocks.md"), "utf8");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function groupFor(no) {
  if (no <= 19) return ["超基礎", "表示・変数・計算・入力"];
  if (no <= 29) return ["条件分岐", "if / else"];
  if (no <= 59) return ["繰り返し", "for / while / 図形 / 素数"];
  if (no <= 69) return ["配列", "配列・2次元配列"];
  if (no <= 77) return ["文字列", "char配列"];
  if (no <= 88) return ["関数", "引数・戻り値"];
  if (no <= 95) return ["switch", "switch / 盤面"];
  return ["ゲーム", "乱数・ミニゲーム"];
}

const lines = source.split(/\r?\n/);
const title = lines.find((line) => line.startsWith("# "))?.replace(/^# /, "") || "基礎プロ 100本ノック";
const intro = [];
const usage = [];
const problems = [];
let mode = "intro";
let current = null;

for (const line of lines.slice(1)) {
  const problemMatch = line.match(/^### No\. (\d{2}) (.+)$/);
  if (problemMatch) {
    if (current) problems.push(current);
    const no = Number(problemMatch[1]);
    const [group, detail] = groupFor(no);
    current = {
      no,
      noText: problemMatch[1],
      title: problemMatch[2],
      body: [],
      group,
      detail,
    };
    mode = "problem";
    continue;
  }

  if (line.startsWith("## 使い方")) {
    mode = "usage";
    continue;
  }
  if (line.startsWith("## 100本ノック")) {
    mode = "beforeProblems";
    continue;
  }
  if (line.startsWith("#") || line.trim() === "") continue;

  if (mode === "intro") intro.push(line);
  if (mode === "usage" && line.startsWith("- ")) usage.push(line.replace(/^- /, ""));
  if (mode === "problem" && current) current.body.push(line);
}
if (current) problems.push(current);

const groups = [...new Map(problems.map((problem) => [problem.group, problem.detail])).entries()];

function c(strings, ...values) {
  return strings.reduce((result, part, index) => result + part + (values[index] ?? ""), "").trim();
}

function solutionFor(no) {
  const code = {
    0: c`#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
    1: c`#include <stdio.h>

int main(void) {
    printf("Hello,\\n");
    printf("C language!\\n");
    return 0;
}`,
    2: c`#include <stdio.h>

int main(void) {
    printf("山田太郎\\n");
    printf("1年\\n");
    printf("プログラミング\\n");
    return 0;
}`,
    3: c`#include <stdio.h>

int main(void) {
    printf("商品名\\t価格\\n");
    printf("pen\\t120\\n");
    printf("book\\t980\\n");
    return 0;
}`,
    4: c`#include <stdio.h>

int main(void) {
    int year = 2026;
    printf("%d\\n", year);
    return 0;
}`,
    5: c`#include <stdio.h>

int main(void) {
    printf("%d\\n", 15 + 27);
    return 0;
}`,
    6: c`#include <stdio.h>

int main(void) {
    int a = 20;
    int b = 6;
    printf("%d\\n", a + b);
    printf("%d\\n", a - b);
    printf("%d\\n", a * b);
    printf("%d\\n", a / b);
    printf("%d\\n", a % b);
    return 0;
}`,
    7: c`#include <stdio.h>

int main(void) {
    printf("%.2f\\n", 10.0 / 3.0);
    return 0;
}`,
    8: c`#include <stdio.h>

int main(void) {
    double r = 5.0;
    printf("%.2f\\n", 3.14 * r * r);
    return 0;
}`,
    9: c`#include <stdio.h>

int main(void) {
    int price = 1200;
    printf("%d\\n", price * 110 / 100);
    return 0;
}`,
    10: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    printf("%d\\n", x);
    return 0;
}`,
    11: c`#include <stdio.h>

int main(void) {
    double x;
    scanf("%lf", &x);
    printf("%.1f\\n", x);
    return 0;
}`,
    12: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    printf("%d\\n", x * 2);
    return 0;
}`,
    13: c`#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d%d", &a, &b);
    printf("%d\\n", a + b);
    return 0;
}`,
    14: c`#include <stdio.h>

int main(void) {
    int height, width;
    scanf("%d%d", &height, &width);
    printf("%d\\n", height * width);
    return 0;
}`,
    15: c`#include <stdio.h>

int main(void) {
    double base, height;
    scanf("%lf%lf", &base, &height);
    printf("%.2f\\n", base * height / 2.0);
    return 0;
}`,
    16: c`#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d%d", &a, &b);
    printf("商 %d\\n", a / b);
    printf("余り %d\\n", a % b);
    return 0;
}`,
    17: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\\n", n / 100);
    printf("%d\\n", n / 10 % 10);
    printf("%d\\n", n % 10);
    return 0;
}`,
    18: c`#include <stdio.h>

int main(void) {
    int price;
    scanf("%d", &price);
    printf("%d\\n", price * 9 / 10);
    printf("%d\\n", price * 7 / 10);
    printf("%d\\n", price * 5 / 10);
    return 0;
}`,
    19: c`#include <stdio.h>

int main(void) {
    int yen;
    scanf("%d", &yen);
    printf("%.2f\\n", yen / 150.0);
    return 0;
}`,
    20: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    if (x == 0) {
        printf("zero\\n");
    }
    return 0;
}`,
    21: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    if (x > 0) {
        printf("positive\\n");
    }
    return 0;
}`,
    22: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    if (x % 2 == 0) {
        printf("even\\n");
    }
    return 0;
}`,
    23: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    if (x % 2 == 0) {
        printf("even\\n");
    } else {
        printf("odd\\n");
    }
    return 0;
}`,
    24: c`#include <stdio.h>

int main(void) {
    int score;
    scanf("%d", &score);
    if (score >= 60) {
        printf("pass\\n");
    } else {
        printf("fail\\n");
    }
    return 0;
}`,
    25: c`#include <stdio.h>

int main(void) {
    int score;
    scanf("%d", &score);
    if (score >= 80) {
        printf("great\\n");
    } else if (score >= 60) {
        printf("pass\\n");
    } else {
        printf("fail\\n");
    }
    return 0;
}`,
    26: c`#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d%d", &a, &b);
    if (a >= b) {
        printf("%d\\n", a);
    } else {
        printf("%d\\n", b);
    }
    return 0;
}`,
    27: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    if (x < 0) {
        x = -x;
    }
    printf("%d\\n", x);
    return 0;
}`,
    28: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    if (x >= 10 && x <= 20) {
        printf("OK\\n");
    } else {
        printf("NG\\n");
    }
    return 0;
}`,
    29: c`#include <stdio.h>

int main(void) {
    int answer = 7;
    int x;
    scanf("%d", &x);
    if (x > answer) {
        printf("smaller\\n");
    } else if (x < answer) {
        printf("larger\\n");
    } else {
        printf("correct\\n");
    }
    return 0;
}`,
    30: c`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 10; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
    31: c`#include <stdio.h>

int main(void) {
    for (int i = 10; i >= 1; i--) {
        printf("%d\\n", i);
    }
    return 0;
}`,
    32: c`#include <stdio.h>

int main(void) {
    for (int i = 0; i < 5; i++) {
        printf("Hello\\n");
    }
    return 0;
}`,
    33: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        printf("Hello\\n");
    }
    return 0;
}`,
    34: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
    35: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = n; i >= 0; i--) {
        printf("%d\\n", i);
    }
    return 0;
}`,
    36: c`#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("%d\\n", sum);
    return 0;
}`,
    37: c`#include <stdio.h>

int main(void) {
    int n, sum = 0;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    printf("%d\\n", sum);
    return 0;
}`,
    38: c`#include <stdio.h>

int main(void) {
    int n, x, sum = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &x);
        sum += x;
    }
    printf("%d\\n", sum);
    return 0;
}`,
    39: c`#include <stdio.h>

int main(void) {
    int x;
    while (1) {
        scanf("%d", &x);
        if (x == 0) {
            break;
        }
    }
    return 0;
}`,
    40: c`#include <stdio.h>

int main(void) {
    int x, sum = 0;
    while (1) {
        scanf("%d", &x);
        if (x == 0) {
            break;
        }
        sum += x;
    }
    printf("%d\\n", sum);
    return 0;
}`,
    41: c`#include <stdio.h>

int main(void) {
    int x, sum = 0;
    while (1) {
        scanf("%d", &x);
        sum += x;
        if (sum % 7 == 0) {
            break;
        }
    }
    printf("%d\\n", sum);
    return 0;
}`,
    42: c`#include <stdio.h>

int main(void) {
    int n, x, sum = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &x);
        sum += x;
    }
    printf("%d\\n", sum);
    printf("%.1f\\n", (double)sum / n);
    return 0;
}`,
    43: c`#include <stdio.h>

int main(void) {
    int x, max;
    scanf("%d", &max);
    for (int i = 1; i < 5; i++) {
        scanf("%d", &x);
        if (x > max) {
            max = x;
        }
    }
    printf("%d\\n", max);
    return 0;
}`,
    44: c`#include <stdio.h>

int main(void) {
    int x, min;
    scanf("%d", &min);
    for (int i = 1; i < 5; i++) {
        scanf("%d", &x);
        if (x < min) {
            min = x;
        }
    }
    printf("%d\\n", min);
    return 0;
}`,
    45: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        printf("*");
    }
    printf("\\n");
    return 0;
}`,
    46: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        printf("*");
        if (i % 5 == 0) {
            printf(" ");
        }
    }
    printf("\\n");
    return 0;
}`,
    47: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
    48: c`#include <stdio.h>

int main(void) {
    int height, width;
    scanf("%d%d", &height, &width);
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
    49: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
    50: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = n; i >= 1; i--) {
        for (int j = 0; j < i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
    51: c`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < n - i; j++) {
            printf(" ");
        }
        for (int j = 0; j < i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
    52: c`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= 9; j++) {
            printf("%3d", i * j);
        }
        printf("\\n");
    }
    return 0;
}`,
    53: c`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 50; i++) {
        if (i % 3 == 0) {
            printf("bar\\n");
        } else {
            printf("%d\\n", i);
        }
    }
    return 0;
}`,
    54: c`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 50; i++) {
        if (i % 3 == 0 || i % 10 == 3) {
            printf("aho\\n");
        } else {
            printf("%d\\n", i);
        }
    }
    return 0;
}`,
    55: c`#include <stdio.h>

int main(void) {
    int n;
    int prime = 1;
    scanf("%d", &n);
    if (n < 2) {
        prime = 0;
    }
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            prime = 0;
        }
    }
    if (prime) {
        printf("prime\\n");
    } else {
        printf("not prime\\n");
    }
    return 0;
}`,
    56: c`#include <stdio.h>

int main(void) {
    for (int n = 1; n <= 100; n++) {
        int prime = 1;
        if (n < 2) {
            prime = 0;
        }
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                prime = 0;
            }
        }
        if (prime) {
            printf("%d\\n", n);
        } else {
            printf("x\\n");
        }
    }
    return 0;
}`,
    57: c`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 10; i++) {
        printf("%d\\n", i);
        if (i == 5) {
            break;
        }
    }
    return 0;
}`,
    58: c`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 10; i++) {
        if (i == 5) {
            continue;
        }
        printf("%d\\n", i);
    }
    return 0;
}`,
    59: c`#include <stdio.h>

int main(void) {
    int x;
    do {
        scanf("%d", &x);
    } while (x > 10);
    printf("%d\\n", x);
    return 0;
}`,
    60: c`#include <stdio.h>

int main(void) {
    int a[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        printf("%d\\n", a[i]);
    }
    return 0;
}`,
    61: c`#include <stdio.h>

int main(void) {
    int a[5];
    for (int i = 0; i < 5; i++) {
        scanf("%d", &a[i]);
    }
    for (int i = 0; i < 5; i++) {
        printf("%d\\n", a[i]);
    }
    return 0;
}`,
    62: c`#include <stdio.h>

int main(void) {
    int score[5];
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        scanf("%d", &score[i]);
        sum += score[i];
    }
    printf("%d\\n", sum);
    return 0;
}`,
    63: c`#include <stdio.h>

int main(void) {
    int score[5];
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        scanf("%d", &score[i]);
        sum += score[i];
    }
    printf("%.1f\\n", sum / 5.0);
    return 0;
}`,
    64: c`#include <stdio.h>

int main(void) {
    int a[5], max;
    for (int i = 0; i < 5; i++) {
        scanf("%d", &a[i]);
    }
    max = a[0];
    for (int i = 1; i < 5; i++) {
        if (a[i] > max) {
            max = a[i];
        }
    }
    printf("%d\\n", max);
    return 0;
}`,
    65: c`#include <stdio.h>

int main(void) {
    int score[5];
    for (int i = 0; i < 5; i++) {
        scanf("%d", &score[i]);
    }
    for (int i = 0; i < 5; i++) {
        if (score[i] >= 60) {
            printf("pass\\n");
        } else {
            printf("fail\\n");
        }
    }
    return 0;
}`,
    66: c`#include <stdio.h>

int main(void) {
    int a[5];
    for (int i = 0; i < 5; i++) {
        scanf("%d", &a[i]);
    }
    for (int i = 4; i >= 0; i--) {
        printf("%d\\n", a[i]);
    }
    return 0;
}`,
    67: c`#include <stdio.h>

int main(void) {
    int a[5], target;
    int found = 0;
    for (int i = 0; i < 5; i++) {
        scanf("%d", &a[i]);
    }
    scanf("%d", &target);
    for (int i = 0; i < 5; i++) {
        if (a[i] == target) {
            found = 1;
        }
    }
    if (found) {
        printf("found\\n");
    } else {
        printf("not found\\n");
    }
    return 0;
}`,
    68: c`#include <stdio.h>

int main(void) {
    int kuku[10][10];
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= 9; j++) {
            kuku[i][j] = i * j;
        }
    }
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= 9; j++) {
            printf("%3d", kuku[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
    69: c`#include <stdio.h>

int main(void) {
    int score[6][2];
    for (int i = 0; i < 6; i++) {
        scanf("%d%d", &score[i][0], &score[i][1]);
    }
    for (int i = 0; i < 6; i++) {
        int sum = score[i][0] + score[i][1];
        printf("%d %.1f\\n", sum, sum / 2.0);
    }
    return 0;
}`,
    70: c`#include <stdio.h>

int main(void) {
    char name[100];
    scanf("%99s", name);
    printf("Hello, %s\\n", name);
    return 0;
}`,
    71: c`#include <stdio.h>

int main(void) {
    char s[100];
    scanf("%99s", s);
    printf("%c\\n", s[0]);
    printf("%c\\n", s[2]);
    return 0;
}`,
    72: c`#include <stdio.h>

int main(void) {
    char family[100], given[100];
    scanf("%99s%99s", family, given);
    printf("%c.%c.\\n", given[0], family[0]);
    return 0;
}`,
    73: c`#include <stdio.h>

int main(void) {
    char words[5][100];
    for (int i = 0; i < 5; i++) {
        scanf("%99s", words[i]);
    }
    for (int i = 0; i < 5; i++) {
        printf("%s\\n", words[i]);
    }
    return 0;
}`,
    74: c`#include <stdio.h>

int main(void) {
    char words[5][100];
    for (int i = 0; i < 5; i++) {
        scanf("%99s", words[i]);
    }
    for (int i = 0; i < 5; i++) {
        if (words[i][0] == 'a') {
            printf("%s\\n", words[i]);
        }
    }
    return 0;
}`,
    75: c`#include <stdio.h>

int main(void) {
    char words[5][100];
    int count = 0;
    for (int i = 0; i < 5; i++) {
        scanf("%99s", words[i]);
    }
    for (int i = 0; i < 5; i++) {
        for (int j = 0; words[i][j] != '\\0'; j++) {
            if (words[i][j] == 'o') {
                count++;
            }
        }
    }
    printf("%d\\n", count);
    return 0;
}`,
    76: c`#include <stdio.h>

int main(void) {
    char s[100];
    scanf("%99s", s);
    for (int i = 0; s[i] != '\\0'; i++) {
        printf("%c\\n", s[i]);
    }
    return 0;
}`,
    77: c`#include <stdio.h>

int main(void) {
    char s[100];
    scanf("%99s", s);
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] == 'a') {
            printf("1");
        } else if (s[i] == 'b') {
            printf("2");
        } else if (s[i] == 'c') {
            printf("3");
        } else {
            printf("%c", s[i]);
        }
    }
    printf("\\n");
    return 0;
}`,
    78: c`#include <stdio.h>

void hello(void) {
    printf("Hello\\n");
}

int main(void) {
    hello();
    return 0;
}`,
    79: c`#include <stdio.h>

void print_tax_included(int price) {
    printf("%d\\n", price * 110 / 100);
}

int main(void) {
    print_tax_included(1000);
    return 0;
}`,
    80: c`#include <stdio.h>

int sum2(int a, int b) {
    return a + b;
}

int main(void) {
    int a, b;
    scanf("%d%d", &a, &b);
    printf("%d\\n", sum2(a, b));
    return 0;
}`,
    81: c`#include <stdio.h>

int max2(int a, int b) {
    if (a >= b) {
        return a;
    }
    return b;
}

int main(void) {
    int a, b;
    scanf("%d%d", &a, &b);
    printf("%d\\n", max2(a, b));
    return 0;
}`,
    82: c`#include <stdio.h>

int max3(int a, int b, int c) {
    int max = a;
    if (b > max) {
        max = b;
    }
    if (c > max) {
        max = c;
    }
    return max;
}

int main(void) {
    int a, b, c;
    scanf("%d%d%d", &a, &b, &c);
    printf("%d\\n", max3(a, b, c));
    return 0;
}`,
    83: c`#include <stdio.h>

double average3(int a, int b, int c) {
    return (a + b + c) / 3.0;
}

int main(void) {
    int a, b, c;
    scanf("%d%d%d", &a, &b, &c);
    printf("%.1f\\n", average3(a, b, c));
    return 0;
}`,
    84: c`#include <stdio.h>

void print_square(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            printf("*");
        }
        printf("\\n");
    }
}

int main(void) {
    int n;
    scanf("%d", &n);
    print_square(n);
    return 0;
}`,
    85: c`#include <stdio.h>

int sum_to_n(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\\n", sum_to_n(n));
    return 0;
}`,
    86: c`#include <stdio.h>

int input_until_max(int max) {
    int x;
    do {
        scanf("%d", &x);
    } while (x > max);
    return x;
}

int main(void) {
    int x = input_until_max(10);
    printf("%d\\n", x);
    return 0;
}`,
    87: c`#include <stdio.h>

int absolute(int x) {
    if (x < 0) {
        return -x;
    }
    return x;
}

int main(void) {
    int x;
    scanf("%d", &x);
    printf("%d\\n", absolute(x));
    return 0;
}`,
    88: c`#include <stdio.h>

void calculate(int a, int b, char op) {
    switch (op) {
        case '+':
            printf("%d\\n", a + b);
            break;
        case '-':
            printf("%d\\n", a - b);
            break;
        case '*':
            printf("%d\\n", a * b);
            break;
        case '/':
            printf("%d\\n", a / b);
            break;
    }
}

int main(void) {
    int a, b;
    char op;
    scanf("%d %c %d", &a, &op, &b);
    calculate(a, b, op);
    return 0;
}`,
    89: c`#include <stdio.h>

int main(void) {
    int x;
    scanf("%d", &x);
    switch (x % 3) {
        case 0:
            printf("remainder 0\\n");
            break;
        case 1:
            printf("remainder 1\\n");
            break;
        case 2:
            printf("remainder 2\\n");
            break;
    }
    return 0;
}`,
    90: c`#include <stdio.h>

int main(void) {
    int month;
    scanf("%d", &month);
    switch (month) {
        case 3:
        case 4:
        case 5:
            printf("spring\\n");
            break;
        case 6:
        case 7:
        case 8:
            printf("summer\\n");
            break;
        case 9:
        case 10:
        case 11:
            printf("autumn\\n");
            break;
        case 12:
        case 1:
        case 2:
            printf("winter\\n");
            break;
        default:
            printf("input error\\n");
            break;
    }
    return 0;
}`,
    91: c`#include <stdio.h>

int main(void) {
    int month;
    scanf("%d", &month);
    switch (month) {
        case 4:
        case 6:
        case 9:
        case 11:
            printf("30\\n");
            break;
        case 2:
            printf("28\\n");
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            printf("31\\n");
            break;
        default:
            printf("input error\\n");
            break;
    }
    return 0;
}`,
    92: c`#include <stdio.h>

int main(void) {
    int day;
    scanf("%d", &day);
    switch (day % 7) {
        case 0:
            printf("Sunday\\n");
            break;
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        case 4:
            printf("Thursday\\n");
            break;
        case 5:
            printf("Friday\\n");
            break;
        case 6:
            printf("Saturday\\n");
            break;
    }
    return 0;
}`,
    93: c`#include <stdio.h>

int main(void) {
    int menu;
    printf("1: start\\n");
    printf("2: help\\n");
    printf("3: end\\n");
    scanf("%d", &menu);
    switch (menu) {
        case 1:
            printf("start\\n");
            break;
        case 2:
            printf("help\\n");
            break;
        case 3:
            printf("end\\n");
            break;
        default:
            printf("input error\\n");
            break;
    }
    return 0;
}`,
    94: c`#include <stdio.h>

void show_stage(int x, int y) {
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            if (i == y && j == x) {
                printf("*");
            } else {
                printf("-");
            }
        }
        printf("\\n");
    }
}

int main(void) {
    int x, y;
    scanf("%d%d", &x, &y);
    show_stage(x, y);
    return 0;
}`,
    95: c`#include <stdio.h>

void show_stage(int x, int y) {
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            if (i == y && j == x) {
                printf("*");
            } else {
                printf("-");
            }
        }
        printf("\\n");
    }
}

int main(void) {
    int x = 2;
    int y = 2;
    char command;
    while (1) {
        show_stage(x, y);
        scanf(" %c", &command);
        if (command == 'w') {
            y--;
        } else if (command == 's') {
            y++;
        } else if (command == 'a') {
            x--;
        } else if (command == 'd') {
            x++;
        }
        if (x < 0 || x >= 5 || y < 0 || y >= 5) {
            printf("GAME OVER\\n");
            break;
        }
    }
    return 0;
}`,
    96: c`#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned int)time(NULL));
    for (int i = 0; i < 3; i++) {
        printf("%d\\n", rand());
    }
    return 0;
}`,
    97: c`#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned int)time(NULL));
    printf("%d\\n", rand() % 6 + 1);
    return 0;
}`,
    98: c`#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    int prev = 0;
    int dice;
    srand((unsigned int)time(NULL));
    while (1) {
        dice = rand() % 6 + 1;
        printf("%d\\n", dice);
        if (dice == prev) {
            break;
        }
        prev = dice;
    }
    return 0;
}`,
    99: c`#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    int answer, guess;
    srand((unsigned int)time(NULL));
    answer = rand() % 100 + 1;
    for (int i = 0; i < 7; i++) {
        scanf("%d", &guess);
        if (guess < answer) {
            printf("larger\\n");
        } else if (guess > answer) {
            printf("smaller\\n");
        } else {
            printf("correct\\n");
            break;
        }
    }
    return 0;
}`,
  };

  return code[no] || "";
}

const problemCards = problems
  .map((problem) => {
    const text = `${problem.noText} ${problem.title} ${problem.body.join(" ")} ${problem.group} ${problem.detail}`;
    return `
      <article class="problem-card" id="knock-${problem.noText}" data-group="${escapeHtml(problem.group)}" data-search="${escapeHtml(text.toLowerCase())}">
        <div class="problem-meta">
          <span class="problem-number">No. ${problem.noText}</span>
          <span class="problem-group">${escapeHtml(problem.group)}</span>
        </div>
        <h3>${inlineMarkdown(problem.title)}</h3>
        <p>${inlineMarkdown(problem.body.join(" "))}</p>
        <div class="problem-actions">
          <label class="check-label">
            <input type="checkbox" data-check="${problem.noText}">
            <span>完了</span>
          </label>
          <a href="#knock-${problem.noText}" aria-label="No. ${problem.noText}へのリンク">#</a>
        </div>
      </article>`;
  })
  .join("\n");

const answerCards = problems
  .map((problem) => {
    const answer = solutionFor(problem.no);
    const text = `${problem.noText} ${problem.title} ${problem.body.join(" ")} ${problem.group} ${problem.detail} ${answer}`;
    return `
      <article class="answer-card" id="answer-${problem.noText}" data-group="${escapeHtml(problem.group)}" data-search="${escapeHtml(text.toLowerCase())}">
        <div class="problem-meta">
          <span class="problem-number">No. ${problem.noText}</span>
          <span class="problem-group">${escapeHtml(problem.group)}</span>
        </div>
        <h3>${inlineMarkdown(problem.title)}</h3>
        <p>${inlineMarkdown(problem.body.join(" "))}</p>
        <pre><code>${escapeHtml(answer)}</code></pre>
        <div class="problem-actions">
          <a href="./index.html#knock-${problem.noText}" aria-label="No. ${problem.noText}の問題へ">問題</a>
          <a href="#answer-${problem.noText}" aria-label="No. ${problem.noText}の回答へのリンク">#</a>
        </div>
      </article>`;
  })
  .join("\n");

const groupButtons = groups
  .map(([group, detail]) => `<button class="filter-button" type="button" data-filter="${escapeHtml(group)}"><span>${escapeHtml(group)}</span><small>${escapeHtml(detail)}</small></button>`)
  .join("\n");

const groupStats = groups
  .map(([group, detail]) => {
    const count = problems.filter((problem) => problem.group === group).length;
    return `<li><span>${escapeHtml(group)}</span><strong>${count}</strong><small>${escapeHtml(detail)}</small></li>`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="C言語の基礎を学ぶための100本ノック。超基礎から乱数ゲームまで段階的に練習できます。">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="ページ先頭へ">
      <span class="brand-mark" aria-hidden="true"></span>
      <span>KAMIYAMA<br>MARUGOTO<br>KOSEN</span>
    </a>
    <nav class="top-nav" aria-label="ページ内ナビゲーション">
      <a href="#about">概要</a>
      <a href="#knocks">100本ノック</a>
      <a href="#usage">使い方</a>
      <a href="./answers.html">回答コード</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="page-title">
      <div class="hero-copy">
        <p class="eyebrow">C LANGUAGE PRACTICE / 01-16</p>
        <h1 id="page-title">${escapeHtml(title)}</h1>
        <p class="lead">${intro.map(inlineMarkdown).join("<br>")}</p>
      </div>
      <div class="hero-panel" aria-label="問題数と範囲">
        <span>001</span>
        <strong>100</strong>
        <small>KNOCKS</small>
      </div>
    </section>

    <section class="overview" id="about" aria-label="学習範囲">
      <div class="section-heading">
        <p>STEPS</p>
        <h2>基礎から順番に積む</h2>
      </div>
      <ul class="stats-grid">
        ${groupStats}
      </ul>
    </section>

    <section class="usage" id="usage" aria-labelledby="usage-title">
      <div class="section-heading">
        <p>HOW TO USE</p>
        <h2 id="usage-title">使い方</h2>
      </div>
      <ol>
        ${usage.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("\n")}
      </ol>
    </section>

    <section class="workspace" id="knocks" aria-labelledby="knocks-title">
      <aside class="control-panel">
        <div>
          <p class="panel-label">PROGRESS</p>
          <strong><span id="done-count">0</span> / 100</strong>
          <progress id="progress" value="0" max="100"></progress>
        </div>
        <div>
          <label class="panel-label" for="search">SEARCH</label>
          <input id="search" type="search" placeholder="例: 配列, while, No. 52">
        </div>
        <div class="filters" aria-label="カテゴリで絞り込み">
          <button class="filter-button active" type="button" data-filter="all"><span>すべて</span><small>100問</small></button>
          ${groupButtons}
        </div>
      </aside>

      <div class="problem-area">
        <div class="section-heading">
          <p>PROBLEMS</p>
          <h2 id="knocks-title">100本ノック</h2>
        </div>
        <div class="problem-grid">
          ${problemCards}
        </div>
        <p class="empty-state" id="empty-state" hidden>条件に合う問題がありません。</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <span>基礎プロ 100本ノック</span>
    <span>C / KAMIYAMA MARUGOTO KOSEN STYLE</span>
  </footer>

  <script src="./app.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, "index.html"), html);

const answersHtml = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} 回答コード</title>
  <meta name="description" content="基礎プロ 100本ノックの回答コード例。">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="./index.html" aria-label="問題ページへ">
      <span class="brand-mark" aria-hidden="true"></span>
      <span>KAMIYAMA<br>MARUGOTO<br>KOSEN</span>
    </a>
    <nav class="top-nav" aria-label="ページナビゲーション">
      <a href="./index.html">問題</a>
      <a href="#answers">回答コード</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero answer-hero" aria-labelledby="page-title">
      <div class="hero-copy">
        <p class="eyebrow">C LANGUAGE PRACTICE / ANSWERS</p>
        <h1 id="page-title">回答コード</h1>
        <p class="lead">100本ノックの回答例です。答えは1つではないので、まず自分で書いてから、考え方や書き方の確認に使ってください。</p>
      </div>
      <div class="hero-panel" aria-label="回答数">
        <span>CODE</span>
        <strong>100</strong>
        <small>ANSWERS</small>
      </div>
    </section>

    <section class="workspace" id="answers" aria-labelledby="answers-title">
      <aside class="control-panel">
        <div>
          <p class="panel-label">ANSWERS</p>
          <strong>100</strong>
        </div>
        <div>
          <label class="panel-label" for="search">SEARCH</label>
          <input id="search" type="search" placeholder="例: 配列, switch, No. 52">
        </div>
        <div class="filters" aria-label="カテゴリで絞り込み">
          <button class="filter-button active" type="button" data-filter="all"><span>すべて</span><small>100問</small></button>
          ${groupButtons}
        </div>
      </aside>

      <div class="problem-area">
        <div class="section-heading">
          <p>ANSWERS</p>
          <h2 id="answers-title">回答コード一覧</h2>
        </div>
        <div class="answer-grid">
          ${answerCards}
        </div>
        <p class="empty-state" id="empty-state" hidden>条件に合う回答がありません。</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <span>基礎プロ 100本ノック 回答コード</span>
    <span>C / KAMIYAMA MARUGOTO KOSEN STYLE</span>
  </footer>

  <script src="./app.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, "answers.html"), answersHtml);
console.log(`Generated ${problems.length} problems and answers.`);
