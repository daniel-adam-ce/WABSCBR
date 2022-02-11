module rowShift (
	input [127:0] indata,
	output [127:0] outdata);

	wire [31:0] row1, row2, row3, row1s, row2s,row3s;
	wire [127:0] outp;

	assign row1={indata[119:112],indata[87:80],indata[55:48],indata[23:16]};
	assign row2={indata[111:104],indata[79:72],indata[47:40],indata[15:8]};
	assign row3={indata[103:96],indata[71:64],indata[39:32],indata[7:0]};

	rightcyclicshifter #(.SHIFTNUM(8),.INLENGTH(32)) u1 (.unsh2(row1),.sh2(row1s));
	rightcyclicshifter #(.SHIFTNUM(16),.INLENGTH(32)) u2 (.unsh2(row2),.sh2(row2s));
	rightcyclicshifter #(.SHIFTNUM(24),.INLENGTH(32)) u3 (.unsh2(row3),.sh2(row3s));
	
	

	assign outdata = {indata[127:120],row1s[31:24],row2s[31:24],row3s[31:24],indata[95:88],row1s[23:16],row2s[23:16],row3s[23:16],indata[63:56], row1s[15:8],row2s[15:8],row3s[15:8],indata[31:24],row1s[7:0],row2s[7:0],row3s[7:0]};
endmodule 