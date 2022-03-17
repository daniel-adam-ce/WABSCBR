module fullMix (
	input [31:0] con,
	input [31:0] data,
	output [7:0] backdata);

	wire [7:0] temp0;
	wire [7:0] temp1;
	wire [7:0] temp2;
	wire [7:0] temp3; 

	GMul u0 (.m0(con[31:24]),.val(data[31:24]),.correct(temp0));
	GMul u1 (.m0(con[23:16]),.val(data[23:16]),.correct(temp1));
	GMul u2 (.m0(con[15:8]),.val(data[15:8]),.correct(temp2));
	GMul u3 (.m0(con[7:0]),.val(data[7:0]),.correct(temp3));
	
	assign backdata = temp0^temp1^temp2^temp3;


endmodule
