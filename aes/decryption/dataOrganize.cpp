#include <iostream>
#include <C:\Users\nicej\Documents\School\Y4S2\186B\WABSCBR\aes\decryption\invAddRoundKey.h>
#include <C:\Users\nicej\Documents\School\Y4S2\186B\WABSCBR\aes\decryption\invColumnMix.h>
#include <C:\Users\nicej\Documents\School\Y4S2\186B\WABSCBR\aes\decryption\invRowShift.h>
#include <C:\Users\nicej\Documents\School\Y4S2\186B\WABSCBR\aes\decryption\invSbox.h>
using namespace std;

/*
int main(int argc, char** argv){
    
    int ciphertxt[16];
    
    for (int i = 0; i < 16; i++) {
        ciphertxt[i] = 0;
    }
    std::cout << argv[1] << std::endl;
    char tempCString[3] = {0};
    int size = 0;
    for (int i = 0, j = 0; i < 16; (i=i+2), j++){
        tempCString[0] = argv[1][i];
        tempCString[1] = argv[1][i+1];
        std::cout << tempCString[0] << " " << tempCString[1] << std::endl;
        ciphertxt[j] = std::strtoul(tempCString, nullptr, 16);
        size = j;
    }

    for (int x = 0; x<= size; x++){
        std::cout << ciphertxt[x] << endl;
    }
    

    return 0;
}
*/

void printArray(int array[16]){{
    for(int i = 0; i<16; i++){
        cout << std::hex << array[i] << "\t";
    }
    cout << endl;
}

    return;
}

int main(){
    int ciphertxt[16];
    int words[44][4];
    ciphertxt[0] = 0xc7 ;
    ciphertxt[1] = 0xd1 ;
    ciphertxt[2] = 0x24 ;
    ciphertxt[3] = 0x19 ;
    ciphertxt[4] = 0x48 ;
    ciphertxt[5] = 0x9e ;
    ciphertxt[6] = 0x3b ;
    ciphertxt[7] = 0x62 ;
    ciphertxt[8] = 0x33 ;
    ciphertxt[9] = 0xa2 ;
    ciphertxt[10] = 0xc5 ;
    ciphertxt[11] = 0xa7 ;
    ciphertxt[12] = 0xf4 ;
    ciphertxt[13] = 0x56 ;
    ciphertxt[14] = 0x31 ;
    ciphertxt[15] = 0x72 ;

    int key[16];

    for(int i=0; i<16;i++){
        key[i] = 0x0;
        //ciphertxt[i] = 0x0;
    }

    keyExpand(words,key);

    int exkeys[11][16];

    exkeys[0][0] = words[0][0];
    exkeys[0][1] = words[0][1];
    exkeys[0][2] = words[0][2];
    exkeys[0][3] = words[0][3];
    exkeys[0][4] = words[1][0];
    exkeys[0][5] = words[1][1];
    exkeys[0][6] = words[1][2];
    exkeys[0][7] = words[1][3];
    exkeys[0][8] = words[2][0];
    exkeys[0][9] = words[2][1];
    exkeys[0][10] = words[2][2];
    exkeys[0][11] = words[2][3];
    exkeys[0][12] = words[3][0];
    exkeys[0][13] = words[3][1];
    exkeys[0][14] = words[3][2];
    exkeys[0][15] = words[3][3];
    
    for(int i = 1; i<11; i++){
        exkeys[i][0] = words[i*4][0];
        exkeys[i][1] = words[i*4][1];
        exkeys[i][2] = words[i*4][2];
        exkeys[i][3] = words[i*4][3];

        exkeys[i][4] = words[((i*4)+1)][0];
        exkeys[i][5] = words[((i*4)+1)][1];
        exkeys[i][6] = words[((i*4)+1)][2];
        exkeys[i][7] = words[((i*4)+1)][3];

        exkeys[i][8] = words[((i*4)+2)][0];
        exkeys[i][9] = words[((i*4)+2)][1];
        exkeys[i][10] = words[((i*4)+2)][2];
        exkeys[i][11] = words[((i*4)+2)][3];

        exkeys[i][12] = words[((i*4)+3)][0];
        exkeys[i][13] = words[((i*4)+3)][1];
        exkeys[i][14] = words[((i*4)+3)][2];
        exkeys[i][15] = words[((i*4)+3)][3];
    }
        addRndKey(ciphertxt, exkeys[10]);
       


    for(int i=9; i>0; i--){
        //cout << "Rowhsift Output:" ;
        rowShift(ciphertxt);
        //printArray(ciphertxt);

        //cout << "SBox Output: " ;
        invSBox(ciphertxt);
        //printArray(ciphertxt);

        //cout << "AddRoundKey Output:" ;
        addRndKey(ciphertxt, exkeys[i]);
        //printArray(ciphertxt);

        //cout << "ColumnMix Output:" ;
        ColumnMix(ciphertxt);
        //printArray(ciphertxt);

        //cout << endl;
    }

        //cout << "Rowhsift Output:" ;
        rowShift(ciphertxt);
        //printArray(ciphertxt);

        //cout << "SBox Output: " ;
        invSBox(ciphertxt);
        //printArray(ciphertxt);

        //cout << "AddRoundKey Output:" ;
        addRndKey(ciphertxt, exkeys[0]);
        //printArray(ciphertxt);
    
    printArray(ciphertxt);

    return 0;

}
