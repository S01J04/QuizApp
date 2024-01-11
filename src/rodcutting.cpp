#include <iostream>
#include <climits>
using namespace std;

int max(int num1, int num2) {
    return (num1 > num2 ? num1 : num2);
}

int rodCutting(int price[], int n) {
    int d[n + 1];
    d[0] = 0; // Initialize the base case

    for (int i = 1; i <= n; i++) {
        d[i] = INT_MIN; // Initialize to a very small value
        for (int j = 0; j < i; j++) {
            d[i] = max(d[i], price[j] + d[i - j - 1]);
        }
    }

    return d[n];
}

int main() {
    int price[] = {1, 5, 8, 9, 10, 17, 17, 20};
    int n = sizeof(price) / sizeof(price[0]);

    int maxRevenue = rodCutting(price, n);

    cout << "Maximum revenue: " << maxRevenue << endl;

    return 0;
}
