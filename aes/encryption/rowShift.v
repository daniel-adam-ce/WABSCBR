module rowShift (
	input [127:0] indata,
	output [127:0] outdata);

	assign outdata = {indata[95:88],indata[55:48],indata[15:8],indata[103:96],indata[63:56],indata[23:16],indata[111:104],indata[71:64],indata[31:24], indata[119:112],indata[79:72],indata[39:32],indata[127:120],indata[87:80],indata[47:40],indata[7:0]};
endmodule 