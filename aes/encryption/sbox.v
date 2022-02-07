module sbox(
	input [127:0] indata,
	output [127:0] outdata);
	
	wire [7:0] w0,w1,w2,w3,w4,w5,w6,w7,w8,w9,w10,w11,w12,w13,w14,w15;
	
	sboxinst1 u15 (.unboxed(indata[7:0]),.boxed(w15));
	sboxinst1 u14 (.unboxed(indata[15:8]),.boxed(w14));
	sboxinst1 u13 (.unboxed(indata[23:16]),.boxed(w13));
	sboxinst1 u12 (.unboxed(indata[31:24]),.boxed(w12));
	sboxinst1 u11 (.unboxed(indata[39:32]),.boxed(w11));
	sboxinst1 u10 (.unboxed(indata[47:40]),.boxed(w10));
	sboxinst1 u9 (.unboxed(indata[55:48]),.boxed(w9));
	sboxinst1 u8 (.unboxed(indata[63:56]),.boxed(w8));
	sboxinst1 u7 (.unboxed(indata[71:64]),.boxed(w7));
	sboxinst1 u6 (.unboxed(indata[79:72]),.boxed(w6));
	sboxinst1 u5 (.unboxed(indata[87:80]),.boxed(w5));
	sboxinst1 u4 (.unboxed(indata[95:88]),.boxed(w4));
	sboxinst1 u3 (.unboxed(indata[103:96]),.boxed(w3));
	sboxinst1 u2 (.unboxed(indata[111:104]),.boxed(w2));
	sboxinst1 u1 (.unboxed(indata[119:112]),.boxed(w1));
	sboxinst1 u0 (.unboxed(indata[127:120]),.boxed(w0));

	assign outdata = {w0,w1,w2,w3,w4,w5,w6,w7,w8,w9,w10,w11,w12,w13,w14,w15};

endmodule 