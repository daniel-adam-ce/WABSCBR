module AESTopModule(
	input [127:0] plainText,
	input [127:0] key,
	output [127:0] cipherText);

	wire [127:0] eKey0;
	wire [127:0] eKey1;
	wire [127:0] eKey2;
	wire [127:0] eKey3;
	wire [127:0] eKey4;
	wire [127:0] eKey5;
	wire [127:0] eKey6;
	wire [127:0] eKey7;
	wire [127:0] eKey8;
	wire [127:0] eKey9;
	wire [127:0] eKey10;
	
	wire [127:0] round[1:10];
	wire [127:0] sWire[1:10];
	wire [127:0] rSh[1:10];
	wire [127:0] cm[1:10];
	
	//Pre-Round/Round0
	keyExpansion u0 (.key(key),.eKey0(eKey0),.eKey1(eKey1),.eKey2(eKey2),.eKey3(eKey3),.eKey4(eKey4),.eKey5(eKey5),. eKey6(eKey6),.eKey7(eKey7),.eKey8(eKey8),.eKey9(eKey9),.eKey10(eKey10));
	assign round[1] = plainText^eKey0;
	
	//Begin Main Rounds 1-9 
	//Begin Round 1 
	sbox s1 (.indata(round[1]),.outdata(sWire[1]));
	rowShift r1 (.indata(sWire[1]),.outdata(rSh[1]));
	columnMix cm1 (.indata(rSh[1]),.outdata(cm[1]));
	assign round[2] = eKey1^cm[1];

	//Begin Round 2
	sbox s2 (.indata(round[2]),.outdata(sWire[2]));
	rowShift r2 (.indata(sWire[2]),.outdata(rSh[2]));
	columnMix cm2 (.indata(rSh[2]),.outdata(cm[2]));
	assign round[3] = eKey2 ^ cm[2];

	//Begin Round 3
	sbox s3 (.indata(round[3]),.outdata(sWire[3]));
	rowShift r3 (.indata(sWire[3]),.outdata(rSh[3]));
	columnMix cm3 (.indata(rSh[3]),.outdata(cm[3]));
	assign round[4] = eKey3 ^ cm[3];

	//Begin Round 4
	sbox s4 (.indata(round[4]),.outdata(sWire[4]));
	rowShift r4 (.indata(sWire[4]),.outdata(rSh[4]));
	columnMix cm4 (.indata(rSh[4]),.outdata(cm[4]));
	assign round[5] = eKey4 ^ cm[4];

	//Begin Round 5
	sbox s5 (.indata(round[5]),.outdata(sWire[5]));
	rowShift r5 (.indata(sWire[5]),.outdata(rSh[5]));
	columnMix cm5 (.indata(rSh[5]),.outdata(cm[5]));
	assign round[6] = eKey5 ^ cm[5];

	//Begin Round 6
	sbox s6 (.indata(round[6]),.outdata(sWire[6]));
	rowShift r6 (.indata(sWire[6]),.outdata(rSh[6]));
	columnMix cm6 (.indata(rSh[6]),.outdata(cm[6]));
	assign round[7] = eKey6 ^ cm[6];

	//Begin Round 7
	sbox s7 (.indata(round[7]),.outdata(sWire[7]));
	rowShift r7 (.indata(sWire[7]),.outdata(rSh[7]));
	columnMix cm7 (.indata(rSh[7]),.outdata(cm[7]));
	assign round[8] = eKey7 ^ cm[7];

	//Begin Round 8
	sbox s8 (.indata(round[8]),.outdata(sWire[8]));
	rowShift r8 (.indata(sWire[8]),.outdata(rSh[8]));
	columnMix cm8 (.indata(rSh[8]),.outdata(cm[8]));
	assign round[9] = eKey8 ^ cm[8];

	//Begin Round 9
	sbox s9 (.indata(round[9]),.outdata(sWire[9]));
	rowShift r9 (.indata(sWire[9]),.outdata(rSh[9]));
	columnMix cm9 (.indata(rSh[9]),.outdata(cm[9]));
	assign round[10] = eKey9 ^ cm[9];

	//Begin Round 10
	sbox s10 (.indata(round[10]),.outdata(sWire[10]));
	rowShift r10 (.indata(sWire[10]),.outdata(rSh[10]));
	assign cipherText = eKey10 ^ rSh[10];
endmodule 
