#include <iostream>
#include <sstream>
#include "invAddRoundKey.h"
#include "invColumnMix.h"
#include "invRowShift.h"
#include "invSbox.h"
using namespace std;

void printArray(int array[16]){
    for(int i = 0; i<16; i++){
        if (array[i] > 0xF) {
            cout << std::hex << array[i];
        } else {
            cout << std::hex << "0" << array[i];
        }
    }
    cout << endl;

    return;
}


int main(int argc, char** argv){
    
    int ciphertxt[16];
    int key[16];
    for (int i = 0; i < 16; i++) {
        ciphertxt[i] = 0;
    }
    std::cout << "arg1 " << argv[1] << std::endl;
    std::cout << "arg2 " << argv[2] << std::endl;
    char tempCString[3] = {0};
    char tempCString2[3] = {0};
    int size = 0;
    for (int i = 0, j = 0; i < 32; (i=i+2), j++){
        tempCString[0] = argv[1][i];
        tempCString[1] = argv[1][i+1];
        tempCString2[0] = argv[2][i];
        tempCString2[1] = argv[2][i+1];
        ciphertxt[j] = std::strtoul(tempCString, nullptr, 16);
        key[j] = std::strtoul(tempCString2, nullptr, 16);
        size = j;
    }
    unsigned long long int key1=0;

    for(int i =0; i<16; i++){
        key1 = key1 + key[i]*(256*(15-i));
    }

    key1 = ((key1 ^ 15) % 67);
    
    int LSB;

    for (int i=0; i<16; i++) {
        LSB = key1 & 31;
        key[15-i] = LSB;
        key1 = key1 >>31; 
    }

    printArray(ciphertxt);
    printArray(key);
    int words[44][4];
    
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
        rowShift(ciphertxt);
        invSBox(ciphertxt);
        addRndKey(ciphertxt, exkeys[i]);;
        ColumnMix(ciphertxt);
    }
        rowShift(ciphertxt);
        invSBox(ciphertxt);
        addRndKey(ciphertxt, exkeys[0]);
    printArray(ciphertxt);
    return 0;

}
