module diffieHellman(
	input in,
	output reg [127:0] publicKey,
	output reg [127:0] encryptionKey);
	
	reg [60:0] p;
	reg [55:0] A;
	reg [60:0] Bob1, ekey;
	reg [26:0] g;
	reg [3:0] a,b; 
	
	assign p = 7'd67;
	assign g = 2'd2;

	assign a = 4'd15; //alices hardcoded value
	
	assign b = $urandom+4; //bobs value; 5-15

	assign A = (g ** a)% p; //alices public key

	assign Bob1 = (g ** b)%p; // bobs public key 

	assign ekey = (A ** b)%p; // commonKey

	always @(*) begin  
		case(b)
			4'd5: 
				begin 
					encryptionKey = {68'b0,ekey[59:0]};
					publicKey = {67'b0,Bob1[60:0]};
				end
			4'd6: 
				begin 
					encryptionKey = {67'b0,ekey[60:0]};
					publicKey = {67'b0,Bob1[60:0]};
				end
			4'd7: 
				begin 
					encryptionKey = {69'b0,ekey[58:0]};
					publicKey = {67'b0,Bob1[60:0]};
				end
			4'd8: 
				begin 
					encryptionKey = {67'b0,ekey[60:0]};
					publicKey = {67'b0,Bob1[60:0]};
				end
			4'd9: 
				begin 
					encryptionKey = {74'b0,ekey[53:0]};
					publicKey = {67'b0,Bob1[60:0]};
				end
			4'd10: 
				begin 
					encryptionKey = {67'b0,ekey[60:0]};
					publicKey = {67'b0,Bob1[60:0]};
				end
			4'd11: 
				begin 
					encryptionKey = {67'b0,ekey[60:0]};
					publicKey = {68'b0,Bob1[59:0]};
				end
			4'd12: 
				begin 
					encryptionKey = {67'b0,ekey[60:0]};
					publicKey = {68'b0,Bob1[59:0]};
				end
			4'd13: 
				begin 
					encryptionKey = {67'b0,ekey[60:0]};
					publicKey = {67'b0,Bob1[60:0]};
				end
			4'd14: 
				begin 
					encryptionKey = {71'b0,ekey[57:0]};
					publicKey = {67'b0,Bob1[60:0]};
				end
			4'd15: 
				begin 
					encryptionKey = {68'b0,ekey[59:0]};
					publicKey = {72'b0,Bob1[55:0]};
				end
		endcase
	end
endmodule 
