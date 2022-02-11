#include <iostream> 
#include <string>
using namespace std;

int dataOrganize(){
    int x;

    return x;
}
int main(){
    string indata;
    string ciphertxt[64];
    string temp1;
    string temp2;
    int data2,data1;

    cout << "Enter data" << endl;
    cin >> indata;



    for(int i = 1; i<65 ; i++){
        temp1.append(indata[i]);
    }
    //for (int i = 0; i<64; i++){
   //     temp2.at(i) = indata[i+64];
   // }

 //   data1 = stoi(temp1,0,2);
//    data2 = stoi(temp2,0,2);

   //cout << temp1 << endl;
  // cout << temp2 << endl;

 //  cout << data1 << endl;
 //  cout << data2 << endl;
    cout << indata << endl;
    return 0;
}
