
module Qsys (
	altpll_0_areset_conduit_export,
	altpll_0_c1_clk,
	altpll_0_locked_conduit_export,
	clk_clk,
	hc_05_uart_external_connection_rxd,
	hc_05_uart_external_connection_txd,
	pio_key_external_connection_export,
	reset_reset_n,
	sdram_wire_addr,
	sdram_wire_ba,
	sdram_wire_cas_n,
	sdram_wire_cke,
	sdram_wire_cs_n,
	sdram_wire_dq,
	sdram_wire_dqm,
	sdram_wire_ras_n,
	sdram_wire_we_n,
	gpio_controller_external_connection_export);	

	input		altpll_0_areset_conduit_export;
	output		altpll_0_c1_clk;
	output		altpll_0_locked_conduit_export;
	input		clk_clk;
	input		hc_05_uart_external_connection_rxd;
	output		hc_05_uart_external_connection_txd;
	input		pio_key_external_connection_export;
	input		reset_reset_n;
	output	[12:0]	sdram_wire_addr;
	output	[1:0]	sdram_wire_ba;
	output		sdram_wire_cas_n;
	output		sdram_wire_cke;
	output		sdram_wire_cs_n;
	inout	[31:0]	sdram_wire_dq;
	output	[3:0]	sdram_wire_dqm;
	output		sdram_wire_ras_n;
	output		sdram_wire_we_n;
	output		gpio_controller_external_connection_export;
endmodule
