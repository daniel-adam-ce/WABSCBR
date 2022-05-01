module GMul(
	input [7:0] m0,
	input [7:0] val,
	output reg [7:0] correct);
	
	wire [7:0] two;
	wire [7:0] three;
	
	twosField u2 (.in(val), .out(two));
	threesField u3 (.in(val), .out(three));
	
	always@(*) begin
	case (m0)
	8'b00000001: correct = val;
	8'b00000010: correct = two;
	8'b00000011: correct = three;
	endcase 
	end
endmodule
