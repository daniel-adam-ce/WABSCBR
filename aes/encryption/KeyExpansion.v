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
	reg reg1, reg2, reg3;

	reg [31:0] words [43:0];
	wire [31:0] reg_wirel;

	assign words[0] = key[31:0];
	assign words[1] = key[63:32];
	assign words[2] = key[95:64];
	assign words[3] = key[127:96];
	parameter [31:0] r=0; 

	GFunction u0 (.val(words[3]) , .round(r),.gVal(reg_wirel[31:0]));
	assign reg0[0] = reg_wirel;
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