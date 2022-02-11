module system ( CLOCK_50, CLOCK2_50, KEY, SRAM_DQ, DRAM_DQ, SD_CMD, SD_DAT, SRAM_ADDR, SRAM_CE_N, SRAM_WE_N, SRAM_OE_N, SRAM_UB_N, SRAM_LB_N, DRAM_ADDR, DRAM_BA, DRAM_CAS_N, DRAM_RAS_N, DRAM_CLK, DRAM_CKE, DRAM_CS_N, DRAM_WE_N, DRAM_DQM, VGA_CLK, VGA_HS, VGA_VS, VGA_BLANK_N, VGA_SYNC_N, VGA_R, VGA_G, VGA_B, SD_CLK);
	input CLOCK_50, CLOCK2_50;
	input [3:0] KEY;
	inout [15:0] SRAM_DQ;
	inout [31:0] DRAM_DQ;
	inout SD_CMD;
	inout [3:0] SD_DAT;
	output [19:0] SRAM_ADDR;
	output SRAM_CE_N;
	output SRAM_WE_N;
	output SRAM_OE_N;
	output SRAM_UB_N;
	output SRAM_LB_N;
	output [12:0] DRAM_ADDR;
	output [1:0] DRAM_BA;
	output DRAM_CAS_N;
	output DRAM_RAS_N;
	output DRAM_CLK;
	output DRAM_CKE;
	output DRAM_CS_N;
	output DRAM_WE_N;
	output [3:0] DRAM_DQM;
	output VGA_CLK;
	output VGA_HS;
	output VGA_VS;
	output VGA_BLANK_N;
	output VGA_SYNC_N;
	output [7:0] VGA_R, VGA_G, VGA_B;
	output SD_CLK;

	nios_system NiosII (
		.system_pll_ref_clk_clk (CLOCK_50),
		.system_pll_ref_reset_reset (~KEY[0]),
		.sdram_clk_clk (DRAM_CLK),
		.sdram_addr (DRAM_ADDR),
		.sdram_ba (DRAM_BA),
		.sdram_cas_n (DRAM_CAS_N),
		.sdram_cke (DRAM_CKE),
		.sdram_cs_n (DRAM_CS_N),
		.sdram_dq (DRAM_DQ),
		.sdram_dqm (DRAM_DQM),
		.sdram_ras_n (DRAM_RAS_N),
		.sdram_we_n (DRAM_WE_N),
		.sram_DQ (SRAM_DQ),
		.sram_ADDR (SRAM_ADDR),
		.sram_LB_N (SRAM_LB_N),
		.sram_UB_N (SRAM_UB_N),
		.sram_CE_N (SRAM_CE_N),
		.sram_OE_N (SRAM_OE_N),
		.sram_WE_N (SRAM_WE_N),
		.sd_card_b_SD_cmd (SD_CMD),
		 .sd_card_b_SD_dat (SD_DAT[0]),
		 .sd_card_b_SD_dat3 (SD_DAT[3]),
		 .sd_card_o_SD_clock (SD_CLK),
		.pushbuttons_export ({KEY[3:1], 1'b1}),
		.vga_CLK (VGA_CLK),
		.vga_HS (VGA_HS),
		.vga_VS (VGA_VS),
		.vga_BLANK (VGA_BLANK_N),
		.vga_SYNC (VGA_SYNC_N),
		.vga_R (VGA_R),
		.vga_G (VGA_G),
		.vga_B (VGA_B),
		.vga_pll_ref_clk_clk (CLOCK2_50),
		.vga_pll_ref_reset_reset (~KEY[0])
	);
endmodule