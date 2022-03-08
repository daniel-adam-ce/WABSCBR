/*
#include <iostream> 
using namespace std;

int standardKey[10] = {0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1B,0x36};
unsigned long int keyExpand(int data[16],int round){
    unsigned long int keyVal;
    unsigned long int w0 = (data[0]<<24) + (data[4]<<16) + (data[8]<<8) + (data[12]);
    unsigned long int w1 = (data[1]<<24) + (data[5]<<16) + (data[9]<<8) + (data[13]);
    unsigned long int w2 = (data[2]<<24) + (data[6]<<16) + (data[10]<<8) + (data[14]);
    unsigned long int w3 = (data[3]<<24) + (data[7]<<16) + (data[11]<<8) + (data[15]);

    cout << w1;
    return keyVal;
}


int main(){
    int data[16] = {0x01,0xc6,0xd5,0x8e,
					0x01,0xc6,0xd5,0x4d,
					0x01,0xc6,0xd7,0xa1,
					0x01,0xc6,0xd6,0xbc};
    keyExpand(data,1);

    return 0;
}
/*

#include <iostream>
using namespace std;


void GFunct(int array[4],int round){
    unsigned long int w0 = (array[0] << 24) + (array[1] << 16) + (array[02] << 8) + array[3];

    switch (round){
        case 1:
            w0 = w0 ^ 0x01;
            break;
        case 2:
           w0 = w0 ^ 0x02; 
           break;
        case 3: 
            w0 = w0 ^ 0x04; 
           break;
        case 4:
            w0 = w0 ^ 0x08; 
           break;
        case 5:
            w0 = w0 ^ 0x10; 
           break;
        case 6:
            w0 = w0 ^ 0x20; 
           break;
        case 7:
            w0 = w0 ^ 0x40; 
           break;
        case 8:
            w0 = w0 ^ 0x80; 
           break;
        case 9:
            w0 = w0 ^ 0x1B; 
           break;
        case 10:
            w0 = w0 ^ 0x36; 
            break;
    }
    cout << w0 << endl;
    array[3] = w0 >> 24;
    unsigned long int temp0 = w0 >> 16;
    array[2] = temp0 << 8;
    cout << array[2];
    unsigned long int temp1 = w0 >> 8;
    array[1] = temp1 << 16;
    array[0] = w0 << 24;

    return;
}


int keyExpand (int array[16], int round){
     int key =0;
    

//  1111    1111    1111    1111    1111    1111    1111    1111
//  w3[1]   w3[0]   w2[1]   w2[0]   w1[1]   w1[0]   w0[1]   w0[0]

    // 0    4   8   12
    // 1    5   9   13
    // 2    6   10  14
    // 3    7   11  15
    /*
    unsigned long int w0 = (array[4] << 24) + (array[8] << 16) + (array[12] << 8) + array[0];
    cout << w0 << "\t" << endl;
    unsigned long int w1 = (array[5] << 24) + (array[9] << 16) + (array[13] << 8) + array[1];
    cout << w1 << "\t" << endl;
    unsigned long int w2 = (array[6] << 24) + (array[10] << 16) + (array[14] << 8) + array[2];
    cout << w2 << "\t" << endl;
    unsigned long int w3 = (array[7] << 24) + (array[11] << 16) + (array[15] << 8) + array[3];
    cout << w3 << "\t" << endl;
     */
    
    int w0[4] = {array[4] , array[8] , array[12] , array[0]};
    int w1[4] = {array[5] , array[9] , array[13] , array[1]};
    int w2[4] = {array[6] , array[10] , array[14] , array[2]};
    int w3[4] = {array[7] , array[11] , array[15] , array[3]};
    
    //call the sbox here
    
    GFunct(w0,round);
    GFunct(w0,round);
    GFunct(w0,round);
    GFunct(w0,round);

    
    //
    

    return key;

}

int main(){
    

    int data[16] = { 0x01, 0x12, 0x3, 0x4,
                     0x01, 0x32, 0x3, 0x4,
                     0x01, 0x22, 0x3, 0x4,
                     0x01, 0x42, 0x3, 0x4, };
    
    int c = keyExpand(data,1);
    return 0;
}
 
