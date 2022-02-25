
module DE2_115_Qsys (
	button_pio_external_connection_export,
	clk_100_clk_in_clk,
	clk_100_clk_in_reset_reset_n,
	clk_io_clk_in_clk,
	cy7c67200_if_0_conduit_end_DATA,
	cy7c67200_if_0_conduit_end_ADDR,
	cy7c67200_if_0_conduit_end_RD_N,
	cy7c67200_if_0_conduit_end_WR_N,
	cy7c67200_if_0_conduit_end_CS_N,
	cy7c67200_if_0_conduit_end_RST_N,
	cy7c67200_if_0_conduit_end_INT,
	lcd_16207_0_external_RS,
	lcd_16207_0_external_RW,
	lcd_16207_0_external_data,
	lcd_16207_0_external_E,
	led_green_external_connection_export,
	led_red_external_connection_export,
	sdram_0_wire_addr,
	sdram_0_wire_ba,
	sdram_0_wire_cas_n,
	sdram_0_wire_cke,
	sdram_0_wire_cs_n,
	sdram_0_wire_dq,
	sdram_0_wire_dqm,
	sdram_0_wire_ras_n,
	sdram_0_wire_we_n,
	seg7_display_conduit_end_oSEG0,
	seg7_display_conduit_end_oSEG1,
	seg7_display_conduit_end_oSEG2,
	seg7_display_conduit_end_oSEG3,
	seg7_display_conduit_end_oSEG4,
	seg7_display_conduit_end_oSEG5,
	seg7_display_conduit_end_oSEG6,
	seg7_display_conduit_end_oSEG7,
	switch_pio_external_connection_export);	

	input	[3:0]	button_pio_external_connection_export;
	input		clk_100_clk_in_clk;
	input		clk_100_clk_in_reset_reset_n;
	input		clk_io_clk_in_clk;
	inout	[15:0]	cy7c67200_if_0_conduit_end_DATA;
	output	[1:0]	cy7c67200_if_0_conduit_end_ADDR;
	output		cy7c67200_if_0_conduit_end_RD_N;
	output		cy7c67200_if_0_conduit_end_WR_N;
	output		cy7c67200_if_0_conduit_end_CS_N;
	output		cy7c67200_if_0_conduit_end_RST_N;
	input		cy7c67200_if_0_conduit_end_INT;
	output		lcd_16207_0_external_RS;
	output		lcd_16207_0_external_RW;
	inout	[7:0]	lcd_16207_0_external_data;
	output		lcd_16207_0_external_E;
	output	[8:0]	led_green_external_connection_export;
	output	[17:0]	led_red_external_connection_export;
	output	[12:0]	sdram_0_wire_addr;
	output	[1:0]	sdram_0_wire_ba;
	output		sdram_0_wire_cas_n;
	output		sdram_0_wire_cke;
	output		sdram_0_wire_cs_n;
	inout	[31:0]	sdram_0_wire_dq;
	output	[3:0]	sdram_0_wire_dqm;
	output		sdram_0_wire_ras_n;
	output		sdram_0_wire_we_n;
	output	[6:0]	seg7_display_conduit_end_oSEG0;
	output	[6:0]	seg7_display_conduit_end_oSEG1;
	output	[6:0]	seg7_display_conduit_end_oSEG2;
	output	[6:0]	seg7_display_conduit_end_oSEG3;
	output	[6:0]	seg7_display_conduit_end_oSEG4;
	output	[6:0]	seg7_display_conduit_end_oSEG5;
	output	[6:0]	seg7_display_conduit_end_oSEG6;
	output	[6:0]	seg7_display_conduit_end_oSEG7;
	input	[17:0]	switch_pio_external_connection_export;
endmodule
