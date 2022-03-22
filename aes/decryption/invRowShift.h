#include <iostream>
using namespace std;

 void cyclicShift(int row0[4],int it){
    int temp[4];

     for(int i = 0; i<4; i++) {
         temp[i] = row0[i];
     }

     for(int x = 0; x<4-it; x++){
         row0[x+it] = temp[x];
     }
     int A = 0;
     for(int y = 4-it; y<4 ;y++){
         row0[A] = temp[y];
         A++;
     }

     return;
 }

void rowShift( int array[16]){
    int row0[4];
    int row1[4];
    int row2[4];
    int row3[4];
    row0[0]=array[0];
    row1[0]=array[1];
    row2[0]=array[2];
    row3[0]=array[3];
    row0[1]=array[4];
    row1[1]=array[5];
    row2[1]=array[6];
    row3[1]=array[7];
    row0[2]=array[8];
    row1[2]=array[9];
    row2[2]=array[10];
    row3[2]=array[11];
    row0[3]=array[12];
    row1[3]=array[13];
    row2[3]=array[14];
    row3[3]=array[15];

    cyclicShift(row1,1);
    cyclicShift(row2,2);
    cyclicShift(row3,3);


    array[1] = row1[0];
    array[2] = row2[0];
    array[3] = row3[0];
 
    array[5] = row1[1];
    array[6] = row2[1];
    array[7] = row3[1];

    array[9] = row1[2];
    array[10] = row2[2];
    array[11] = row3[2];

    array[13] = row1[3];
    array[14] = row2[3];
    array[15] = row3[3];
 
    

    
}

