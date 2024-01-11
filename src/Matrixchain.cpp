#include <iostream>
using namespace std;

  
    void matrixchain(){
        int m[5][5]={0};
        int s[5][5]={0};
        int p[]={5,4,6,2,7};
        int min,j,q;
        int n=5;
        for (int d= 1; d < n-1; d++)
        {
            for (int i = 0; i < n-d; i++)
            {
             j=i+d;
             min=12312;
             for(int k=i;k<j-1;j++){
                q=m[i][k]+m[k+1][j]+p[i-1]*p[k]*p[j];
                if(q<min){
                    min=q;
                    s[i][j]=k;
                }
                m[i][j]=min;    
             }              
          }
        }
        
    }
int main(){
    
     matrixchain();

    return 0;
}