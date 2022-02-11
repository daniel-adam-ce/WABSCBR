module rightcyclicshifter (unsh2,sh2);
	parameter INLENGTH = 8, SHIFTNUM = 1;
	input [INLENGTH-1:0] unsh2;
	output [INLENGTH-1:0] sh2;
		
	reg [SHIFTNUM-1:0] rec;
	wire [INLENGTH-1:0] out;
	wire [INLENGTH-SHIFTNUM-1:0] hold;
	
	assign hold = unsh2[INLENGTH-1:SHIFTNUM];
	assign rec = unsh2[SHIFTNUM-1:0];
	assign sh2 = {rec,hold};
	
endmodule
//DONE AND OPTIMIZED
