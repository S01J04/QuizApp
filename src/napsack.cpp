#include <iostream>
using namespace std;
     
       int max(int a, int b){
        return (a>=b?a:b);
       }
      void napsack(){
        int p[]={0,1,2,5,6};
        int wt[]={0,2,3,4,5};
        int k[5][9];
        for(int i=0;i<5;i++) {
            for (int w = 0;w < 9; w++){
                if(w==0 || i==0){
                    k[i][w] = 0;
                }else if(wt[i]<=w){
                    k[i][w]=max(p[i]+k[i-1][w-wt[i]],k[i-1][w]);
                }else{
                    k[i][w]=k[i-1][w];
                }
                cout<<k[i][w]<<" ";
            }
            cout<<endl;
        }
        cout<<endl;
        int i=4,j=8;
        while(i>0 && j>0){
            if(k[i][j]==k[i-1][j])
            {cout<<i<<"=0"<<endl;i--;}
            else
            {
                cout<<i<<"=1"<<endl;
                i--;
                j=j-wt[i];
            }
        }
      }
int main(){
    napsack();


    return 0;
}