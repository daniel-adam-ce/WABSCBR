
//=======================================================
//  This code is generated by Terasic System Builder
//=======================================================

module DE2_115_BluetoothSPP_Master(

	//////////// CLOCK //////////
	input 		          		CLOCK2_50,
	input 		          		CLOCK3_50,
	input 		          		CLOCK_50,

	//////////// KEY //////////
	input 		     [3:0]		KEY,

	//////////// SW //////////
	input 		    [17:0]		SW,

	//////////// SDRAM //////////
	output		    [12:0]		DRAM_ADDR,
	output		     [1:0]		DRAM_BA,
	output		          		DRAM_CAS_N,
	output		          		DRAM_CKE,
	output		          		DRAM_CLK,
	output		          		DRAM_CS_N,
	inout 		    [31:0]		DRAM_DQ,
	output		     [3:0]		DRAM_DQM,
	output		          		DRAM_RAS_N,
	output		          		DRAM_WE_N,

	//////////// SRAM //////////
	output		    [19:0]		SRAM_ADDR,
	output		          		SRAM_CE_N,
	inout 		    [15:0]		SRAM_DQ,
	output		          		SRAM_LB_N,
	output		          		SRAM_OE_N,
	output		          		SRAM_UB_N,
	output		          		SRAM_WE_N,

	//////////// GPIO, GPIO connect to RFS - RF and Sensor //////////
	inout 		          		BT_KEY,
	input 		          		BT_UART_RX,
	output		          		BT_UART_TX,

	input 		          		UART2USB_CTS,
	output		          		UART2USB_RTS,
	input 		          		UART2USB_RX,
	output		          		UART2USB_TX,
	
	//////////// GPIO, SPIO communcation for CANPico ////////////
	input SPI_CSN,
	input SPI_CSK,
	input SPI_MOSI,
	output SPI_MISO
);




wire tx;
wire rx;
wire Control;

assign  rx = BT_UART_RX;
assign  BT_UART_TX  = tx;
assign  BT_KEY = Control;


    Qsys u0 (
        .clk_clk                                 (CLOCK_50),                                 //                              clk.clk
        .hc_05_uart_external_connection_rxd      (rx),      //   hc_05_uart_external_connection.rxd
        .hc_05_uart_external_connection_txd      (tx),      //                                 .txd
        .gpio_controller_external_connection_export (Control), // mode_control_external_connection.export
        .pio_key_external_connection_export      (KEY[1]),      //      pio_key_external_connection.export
        .reset_reset_n                           (KEY[0]),                           //                            reset.reset_n
        .sdram_wire_addr                         (DRAM_ADDR),                         //                       sdram_wire.addr
        .sdram_wire_ba                           (DRAM_BA),                           //                                 .ba
        .sdram_wire_cas_n                        (DRAM_CAS_N),                        //                                 .cas_n
        .sdram_wire_cke                          (DRAM_CKE),                          //                                 .cke
        .sdram_wire_cs_n                         (DRAM_CS_N),                         //                                 .cs_n
        .sdram_wire_dq                           (DRAM_DQ),                           //                                 .dq
        .sdram_wire_dqm                          (DRAM_DQM),                          //                                 .dqm
        .sdram_wire_ras_n                        (DRAM_RAS_N),                        //                                 .ras_n
        .sdram_wire_we_n                         (DRAM_WE_N),                         //                                 .we_n
        .altpll_0_c1_clk                         (DRAM_CLK),                         //                      altpll_0_c1.clk
        .altpll_0_areset_conduit_export          (),          //          altpll_0_areset_conduit.export
        .altpll_0_locked_conduit_export          (),           //          altpll_0_locked_conduit.export
		  .spi_csn_export                          (SPI_CSN),                             //                             spi_csn.export
		  .spi_miso_export                         (SPI_MISO),                            //                            spi_miso.export
		  .spi_mosi_export                         (SPI_MOSI),                            //                            spi_mosi.export
		  .spi_sck_export                          (SPI_SCK),                              //  
    );
	 
	 wire[127:0] Encryption;
	 
	 AESTopModule(
			.plainText(SPI_MOSI),
			.key(),
			.cipherText(Encryption)
	 );


endmodule