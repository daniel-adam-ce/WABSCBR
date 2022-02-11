
module sbox32(
	input [31:0] unboxed,
	output [31:0] boxed);
	
	wire [7:0] w12,w13,w14,w15,p1,p2,p3,p4;
	
	assign p1 = unboxed[7:0];	
	assign p2 = unboxed[15:8];	
	assign p3 = unboxed[23:16];	
	assign p4 = unboxed[31:24];			

	sboxinst1 u15 (.unboxed(p1),.boxed(w15));
	sboxinst1 u14 (.unboxed(p2),.boxed(w14));
	sboxinst1 u13 (.unboxed(p3),.boxed(w13));
	sboxinst1 u12 (.unboxed(p4),.boxed(w12));
	

	assign boxed = {w12,w13,w14,w15};







endmodule 