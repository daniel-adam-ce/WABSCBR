module columnMix(
	input [127:0] indata,
	output [127:0] outdata);

	wire [31:0] c0 = {indata[127:120],indata[119:112],indata[111:104],indata[103:96]};
	wire [31:0] c1 = {indata[95:88],indata[87:80],indata[79:72],indata[71:64]};
	wire [31:0] c2 = {indata[63:56],indata[55:48],indata[47:40],indata[39:32]};
	wire [31:0] c3 = {indata[31:24],indata[23:16],indata[15:8],indata[7:0]};
	wire [31:0] m0 = {8'b00000010,8'b00000011,8'b00000001,8'b00000001};
	wire [31:0] m1 = {8'b00000001,8'b00000010,8'b00000011,8'b00000001};
	wire [31:0] m2 = {8'b00000001,8'b00000001,8'b00000010,8'b00000011};
	wire [31:0] m3 = {8'b00000011,8'b00000001,8'b00000001,8'b00000010};

	fullMix u0 (.con(m0),.data(c0), .backdata(outdata[127:120]));
	fullMix u1 (.con(m1),.data(c0), .backdata(outdata[119:112]));
	fullMix u2 (.con(m2),.data(c0), .backdata(outdata[111:104]));
	fullMix u3 (.con(m3),.data(c0), .backdata(outdata[103:96]));
	fullMix u4 (.con(m0),.data(c1), .backdata(outdata[95:88]));
	fullMix u5 (.con(m1),.data(c1), .backdata(outdata[87:80]));
	fullMix u6 (.con(m2),.data(c1), .backdata(outdata[79:72]));
	fullMix u7 (.con(m3),.data(c1), .backdata(outdata[71:64]));
	fullMix u8 (.con(m0),.data(c2), .backdata(outdata[63:56]));
	fullMix u9 (.con(m1),.data(c2), .backdata(outdata[55:48]));
	fullMix u10 (.con(m2),.data(c2), .backdata(outdata[47:40]));
	fullMix u11 (.con(m3),.data(c2), .backdata(outdata[39:32]));
	fullMix u12 (.con(m0),.data(c3), .backdata(outdata[31:24]));
	fullMix u13 (.con(m1),.data(c3), .backdata(outdata[23:16]));
	fullMix u14 (.con(m2),.data(c3), .backdata(outdata[15:8]));
	fullMix u15 (.con(m3),.data(c3), .backdata(outdata[7:0]));
	

endmodule

