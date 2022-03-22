module GFunction(
	input [31:0] val,
	input [31:0] round,
	output [31:0] gVal);
	
	wire [7:0] b0;
	wire [7:0] b1;
	wire [7:0] b2;
	wire [7:0] b3;
	
	assign b0 = val[7:0];
	assign b1 = val[15:8];
	assign b2 = val[23:16];
	assign b3 = val[31:24];
	
	//rotWord
	wire [31:0] rotted;
	assign rotted = {b2,b1,b0,b3};
	
	//sbox
	wire [31:0] sboxxed;
	sbox32 u0 (.unboxed(rotted), .boxed(sboxxed));

	//GMul
	MulRC u2 (.val(sboxxed),.round(round),.out(gVal));
	
	
	


endmodule 
