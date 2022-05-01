module MulRC(
	input [31:0] val,
	input [31:0] round,
	output reg [31:0] out);
	
	always@(*) begin
	case(round) 
	32'h1: out = val ^ 32'h01000000;
	32'h2: out = val ^ 32'h02000000;
	32'h3: out = val ^ 32'h04000000;
	32'h4: out = val ^ 32'h08000000;	
	32'h5: out = val ^ 32'h10000000;
	32'h6: out = val ^ 32'h20000000;
	32'h7: out = val ^ 32'h40000000;
	32'h8: out = val ^ 32'h80000000;
	32'h9: out = val ^ 32'h1B000000;
	32'hA: out = val ^ 32'h36000000;
	endcase
	end
endmodule 