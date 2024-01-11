#include <iostream>
using namespace std;

void multistage() {
    int stage = 4, min;
    int n = 8;
    int cost[9], path[9], d[9];
    int c[9][9] =
        {
            {0, 0, 0, 0, 0, 0, 0, 0, 0},
            {0, 0, 2, 1, 3, 0, 0, 0, 0},
            {0, 0, 0, 0, 0, 2, 3, 0, 0},
            {0, 0, 0, 0, 0, 6, 7, 0, 0},
            {0, 0, 0, 0, 0, 6, 8, 9, 0},
            {0, 0, 0, 0, 0, 0, 0, 0, 6},
            {0, 0, 0, 0, 0, 0, 0, 0, 4},
            {0, 0, 0, 0, 0, 0, 0, 0, 5},
            {0, 0, 0, 0, 0, 0, 0, 0, 0}};

    cost[n] = 0;
    for (int i = n - 1; i >= 1; i--) {
        min = 12321;
        for (int k = i + 1; k <= n; k++) {
            if (c[i][k] != 0 && c[i][k] + cost[k] < min) {
                min = c[i][k] + cost[k];
                d[i] = k;
            }
        }
        cost[i] = min;
    }

    for (int i = 0; i <= n; i++) {
        for (int j = 0; j < n; j++) {
            cout << c[i][j] << " ";
        }
        cout << endl;
    }

    for (int i = 2; i <= stage + 1; i++) {
        path[i] = d[path[i - 1]];
        cout << path[i - 1] << "--";
    }
    cout << endl;

    for (int i = 0; i <= n; i++) {
        cout << cost[i] << " ";
    }
    cout << endl;

    for (int i = 0; i <= n; i++) {
        cout << path[i] << " ";
    }
}

int main() {
    multistage();

    return 0;
}
