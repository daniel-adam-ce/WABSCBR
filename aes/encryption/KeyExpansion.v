module keyExpansion(
	input  [127:0] key,
	output [127:0] eKey0,
	output [127:0] eKey1,
	output [127:0] eKey2,
	output [127:0] eKey3,
	output [127:0] eKey4,
	output [127:0] eKey5,
	output [127:0] eKey6,
	output [127:0] eKey7,
	output [127:0] eKey8,
	output [127:0] eKey9,
	output [127:0] eKey10);


	wire [31:0] reg0 [0:9];
	wire [31:0] words [43:0];
	
	assign words[0] = key[31:0];
	assign words[1] = key[63:32];
	assign words[2] = key[95:64];
	assign words[3] = key[127:96];
	GFunction u0 (.val(words[3]) , .round(r),.gVal(reg0[0]));
	assign words[4] = words[0] ^ reg0[0];
	assign words[5] = words[1] ^ words[4];
	assign words[6] = words[2] ^ words[5];
	assign words[7] = words[3] ^ words[6];
	GFunction u1 (.val(words[7]),.round(),.gVal(reg0[2]));
	assign words[8] = words[4] ^ reg0[1];
	assign words[9] = words[5] ^ words[8];
	assign words[10] = words[6] ^ words[9];
	assign words[11] = words[7] ^ words[10];
	GFunction u2 (.val(words[11]),.round(),.gVal(reg0[3]));
	assign words[12] = words[8] ^ reg0[2];
	assign words[13] = words[9] ^ words[12];
	assign words[14] = words[10] ^ words[13];
	assign words[15] = words[11] ^ words[14];
	GFunction u3 (.val(words[15]),.round(),.gVal(reg0[4]));
	assign words[16] = words[12] ^ reg0[3];
	assign words[17] = words[13] ^ words[16];
	assign words[18] = words[14] ^ words[17];
	assign words[19] = words[15] ^ words[18];
	GFunction u4 (.val(words[19]),.round(),.gVal(reg0[5]));
	assign words[20] = words[16] ^ reg0[4];
	assign words[21] = words[17] ^ words[20];
	assign words[22] = words[18] ^ words[21];
	assign words[23] = words[19] ^ words[22];
	GFunction u5 (.val(words[23]),.round(),.gVal(reg0[6]));
	assign words[24] = words[20] ^ reg0[5];
	assign words[25] = words[21] ^ words[24];
	assign words[26] = words[22] ^ words[25];
	assign words[27] = words[23] ^ words[26];
	GFunction u6 (.val(words[27]),.round(),.gVal(reg0[7]));
	assign words[28] = words[24] ^ reg0[6];
	assign words[29] = words[25] ^ words[28];
	assign words[30] = words[26] ^ words[29];
	assign words[31] = words[27] ^ words[30];
	GFunction u7 (.val(words[31]),.round(),.gVal(reg0[8]));
	assign words[32] = words[28] ^ reg0[7];
	assign words[33] = words[29] ^ words[32];
	assign words[34] = words[30] ^ words[33];
	assign words[35] = words[31] ^ words[34];
	GFunction u8 (.val(words[35]),.round(),.gVal(reg0[9]));
	assign words[36] = words[32] ^ reg0[8];
	assign words[37] = words[33] ^ words[36];
	assign words[38] = words[34] ^ words[37];
	assign words[39] = words[35] ^ words[38];
	GFunction u9 (.val(words[39]),.round(),.gVal(reg0[10]));
	assign words[40] = words[36] ^ reg0[9];
	assign words[41] = words[37] ^ words[40];
	assign words[42] = words[38] ^ words[41];
	assign words[43] = words[39] ^ words[42];
	
	assign ekey1 = {words[4],words[5],words[6],words[7]};
	assign ekey2 = {words[8],words[9],words[10],words[11]};
	assign ekey3 = {words[12],words[13],words[14],words[15]};
	assign ekey4 = {words[16],words[17],words[18],words[19]};
	assign ekey5 = {words[20],words[21],words[22],words[23]};
	assign ekey6 = {words[24],words[25],words[26],words[27]};
	assign ekey7 = {words[28],words[29],words[30],words[31]};
	assign ekey8 = {words[32],words[33],words[34],words[35]};
	assign ekey9 = {words[36],words[37],words[38],words[39]};
	assign ekey10 = {words[40],words[41],words[42],words[43]};

		


	genvar i;
	//always@(*)begin
		//GFunction u0 (.val(words))
		
		generate 
			for(i=4'b0001; i<10; i=i+1) begin
				assign words[i*4] = words[(i-1)*4] ^ reg0[i-1];
				assign words[(i*4)+1] = words[((i-1)*4)+1] ^ words[i*4];
				assign words[(i*4)+2] = words[((i-1)*4)+2] ^ words[(i*4)+1];
				assign words[(i*4)+3] = words[((i-1)*4)+3] ^ words[(i*4)+2];
				assign reg0[i] = words[(i*4)+3];
				GFunction u1 (.val(reg0[i]) , .round(i),.gVal(reg0[i+1]));
			end
		endgenerate
	//end
endmodule 