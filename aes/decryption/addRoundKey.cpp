#include <iostream>
//#include </Users/nicholasskumar 1/Documents/Y4S2/186B/WABSCBR/aes/decryption/invSbox.h>
#include "invSbox.h"
using namespace std;

int sbox[16][16] = 
{{99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118},
{202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192},
{183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21},
{4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117},
{9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132},
{83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207},
{208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168},
{81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210},
{205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115},
{96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219},
{224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121},
{231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8},
{186, 120, 37, 46, 28, 166, 180, 198, 232, 22146116, 31, 75, 189, 139, 138},
{112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158},
{225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223},
{140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22}};

void addRndKey(int data[16], int key[16]){
    for(int i =0; i<16; i++){
        data[i] ^= key[i];
    }
    return;
}
void MulRC(int w0[4],int round){
    switch (round){
        //case 0:
        //    w0[0] = w0[0] ^ 0x08;
        //    w0[1] = w0[1] ^ 0x0;
        //    w0[2] = w0[2] ^ 0x0;
       //     w0[3] = w0[3] ^ 0x0;
        //    break;
        
        case 1:
            w0[0] = w0[0] ^ 0x01;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
            break;
        case 2:
           w0[0] = w0[0] ^ 0x02;
           w0[1] = w0[1] ^ 0x0;
           w0[2] = w0[2] ^ 0x0;
           w0[3] = w0[3] ^ 0x0;
           break;
        case 3: 
            w0[0] = w0[0] ^ 0x04;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
            break;
        case 4:
            w0[0] = w0[0] ^ 0x08;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
           break;
        case 5:
            w0[0] = w0[0] ^ 0x10;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
           break;
        case 6:
            w0[0] = w0[0] ^ 0x20;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
           break;
        case 7:
            w0[0] = w0[0] ^ 0x40;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
            break;
        case 8:
            w0[0] = w0[0] ^ 0x80;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
           break;
        case 9:
            w0[0] = w0[0] ^ 0x1B;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
            break;
        case 10:
            w0[0] = w0[0] ^ 0x36;
            w0[1] = w0[1] ^ 0x0;
            w0[2] = w0[2] ^ 0x0;
            w0[3] = w0[3] ^ 0x0;
            break;
    }
    return;
}
void Print(int array[4]){
    for(int i=0; i<4; i++){
        cout << array[i] << "\t";
    }
    cout << endl;
    return;
}
void RotWord(int w0[4]){
    int tem0[4] = {w0[1] , w0[2] , w0[3] , w0[0]};

    for(int i=0; i<4; i++){
        w0[i] = tem0[i];
    }
}
void invertSubBytes(int w0[4]){
    int d0p;
	int d0 ;
    for (int i=0; i<4; i++) {
        d0p = w0[i] & 15;
	    d0 = ((w0[i] >> 4) & 15);
        w0[i] = sbox[d0][d0p];
    }
}
void GFun(int w0[4],int round){
    int temp[4];
    for(int i =0; i<4; i++){
        temp[i] = w0[i];
    }
    RotWord(temp);
    cout << "RotWord : ";
    Print(temp);
    invertSubBytes(temp);
    cout << "SubBytes : ";
    Print(temp);
    MulRC(temp,round);
    cout << round <<": RCMul : ";
    Print(temp);
    cout << endl << endl;
    for(int i =0; i<4; i++){
      w0[i] = temp[i];
    }
}
void keyExpand (int words [44][4], int array[16]){
    
    words[0][0] = array[0];
    words[0][1] = array[1];
    words[0][2] = array[2];
    words[0][3] = array[3];

    words[1][0] = array[4];
    words[1][1] = array[5];
    words[1][2] = array[6];
    words[1][3] = array[7];

    words[2][0] = array[8];
    words[2][1] = array[9];
    words[2][2] = array[10];
    words[2][3] = array[11];

    words[3][0] = array[12];
    words[3][1] = array[13];
    words[3][2] = array[14];
    words[3][3] = array[15];

    //Do the G Function to every third word
        //invserse Sbox 
        //multiply by the RC constant 
        //start to generate new words    
    int tem[4];
    tem[0] = words[3][0];
    tem[1] = words[3][1];
    tem[2] = words[3][2];
    tem[3] = words[3][3];
    Print(tem);
    GFun(tem,1);

    for(int i=1;i<11;i++){
        for(int n =0; n<4; n++){
            words[(i*4)][n] = tem[n]^words[((i-1)*4)][n];
            //cout << words[i*4][n] << "\t" ;
        }
        for(int c = 0; c<4; c++){
            words[(i*4)+1][c] = words[((i-1)*4)+1][c]^words[(i*4)][c];
            //cout << words[(i*4)+1][c] << "\t" ;
        }
        for(int k =0; k<4; k++){
            words[(i*4)+2][k] = words[((i-1)*4)+2][k]^words[(i*4)+1][k];
            //cout << words[(i*4)+2][k] << "\t" ;
        }
        for(int j = 0; j<4; j++){
            words[(i*4)+3][j] = words[((i-1)*4)+3][j]^words[(i*4)+2][j];
            //cout << words[(i*4)+1][j] << "\t" ;
        }      
        for(int a = 0; a<4; a++){
            tem[a] = words[(i*4)+3][a]; 
        } 
        GFun(tem,i+1);
        //cout << i << ": " << endl;
        //Print(words[(i*4)]);
        //Print(words[(i*4)+1]);
        //Print(words[(i*4)+2]);
        //Print(words[(i*4)+3]);
        Print(tem);
    }
    return;

}

int main(){
    
    int words[44][4];
    //int data[16] = { 0x54, 0x68, 0x61, 0x74,
    //                 0x73, 0x20, 0x6D, 0x79,
    //                 0x20, 0x4B, 0x75, 0x6E,
    //                 0x67, 0x20, 0x46, 0x75};
    int data[16] = { 0x0, 0x0, 0x0, 0x0,
                     0x0, 0x0, 0x0, 0x0,
                     0x0, 0x0, 0x0, 0x0,
                     0x0, 0x0, 0x0, 0x0 };
    
    keyExpand(words,data);
    
    
    
    for(int i =0;i<11;i++){
        for(int j =0; j<4; j++){
            cout << words[i*4][j] << "\t" ;
        }
        cout << "\t";
        for(int j =0; j<4; j++){
            cout << words[(i*4)+1][j] << "\t" ;
        }
        cout << "\t";
        for(int j =0; j<4; j++){
            cout << words[(i*4)+2][j] << "\t" ;
        }
        cout << "\t";
        for(int j =0; j<4; j++){
            cout << words[(i*4)+3][j] << "\t" ;
        }
        cout << "\t";
        cout << endl;
    }
    
    
    return 0;
}
 
