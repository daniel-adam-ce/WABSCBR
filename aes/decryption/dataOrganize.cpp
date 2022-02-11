#include <iostream>
using namespace std;


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
