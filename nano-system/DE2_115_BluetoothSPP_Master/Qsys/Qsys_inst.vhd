	component Qsys is
		port (
			altpll_0_areset_conduit_export             : in    std_logic                     := 'X';             -- export
			altpll_0_c1_clk                            : out   std_logic;                                        -- clk
			altpll_0_locked_conduit_export             : out   std_logic;                                        -- export
			clk_clk                                    : in    std_logic                     := 'X';             -- clk
			gpio_controller_external_connection_export : out   std_logic;                                        -- export
			hc_05_uart_external_connection_rxd         : in    std_logic                     := 'X';             -- rxd
			hc_05_uart_external_connection_txd         : out   std_logic;                                        -- txd
			pio_key_external_connection_export         : in    std_logic                     := 'X';             -- export
			reset_reset_n                              : in    std_logic                     := 'X';             -- reset_n
			sdram_wire_addr                            : out   std_logic_vector(12 downto 0);                    -- addr
			sdram_wire_ba                              : out   std_logic_vector(1 downto 0);                     -- ba
			sdram_wire_cas_n                           : out   std_logic;                                        -- cas_n
			sdram_wire_cke                             : out   std_logic;                                        -- cke
			sdram_wire_cs_n                            : out   std_logic;                                        -- cs_n
			sdram_wire_dq                              : inout std_logic_vector(31 downto 0) := (others => 'X'); -- dq
			sdram_wire_dqm                             : out   std_logic_vector(3 downto 0);                     -- dqm
			sdram_wire_ras_n                           : out   std_logic;                                        -- ras_n
			sdram_wire_we_n                            : out   std_logic;                                        -- we_n
			spi_csn_export                             : in    std_logic                     := 'X';             -- export
			spi_sck_export                             : in    std_logic                     := 'X';             -- export
			spi_mosi_export                            : in    std_logic                     := 'X';             -- export
			spi_miso_export                            : out   std_logic                                         -- export
		);
	end component Qsys;

	u0 : component Qsys
		port map (
			altpll_0_areset_conduit_export             => CONNECTED_TO_altpll_0_areset_conduit_export,             --             altpll_0_areset_conduit.export
			altpll_0_c1_clk                            => CONNECTED_TO_altpll_0_c1_clk,                            --                         altpll_0_c1.clk
			altpll_0_locked_conduit_export             => CONNECTED_TO_altpll_0_locked_conduit_export,             --             altpll_0_locked_conduit.export
			clk_clk                                    => CONNECTED_TO_clk_clk,                                    --                                 clk.clk
			gpio_controller_external_connection_export => CONNECTED_TO_gpio_controller_external_connection_export, -- gpio_controller_external_connection.export
			hc_05_uart_external_connection_rxd         => CONNECTED_TO_hc_05_uart_external_connection_rxd,         --      hc_05_uart_external_connection.rxd
			hc_05_uart_external_connection_txd         => CONNECTED_TO_hc_05_uart_external_connection_txd,         --                                    .txd
			pio_key_external_connection_export         => CONNECTED_TO_pio_key_external_connection_export,         --         pio_key_external_connection.export
			reset_reset_n                              => CONNECTED_TO_reset_reset_n,                              --                               reset.reset_n
			sdram_wire_addr                            => CONNECTED_TO_sdram_wire_addr,                            --                          sdram_wire.addr
			sdram_wire_ba                              => CONNECTED_TO_sdram_wire_ba,                              --                                    .ba
			sdram_wire_cas_n                           => CONNECTED_TO_sdram_wire_cas_n,                           --                                    .cas_n
			sdram_wire_cke                             => CONNECTED_TO_sdram_wire_cke,                             --                                    .cke
			sdram_wire_cs_n                            => CONNECTED_TO_sdram_wire_cs_n,                            --                                    .cs_n
			sdram_wire_dq                              => CONNECTED_TO_sdram_wire_dq,                              --                                    .dq
			sdram_wire_dqm                             => CONNECTED_TO_sdram_wire_dqm,                             --                                    .dqm
			sdram_wire_ras_n                           => CONNECTED_TO_sdram_wire_ras_n,                           --                                    .ras_n
			sdram_wire_we_n                            => CONNECTED_TO_sdram_wire_we_n,                            --                                    .we_n
			spi_csn_export                             => CONNECTED_TO_spi_csn_export,                             --                             spi_csn.export
			spi_sck_export                             => CONNECTED_TO_spi_sck_export,                             --                             spi_sck.export
			spi_mosi_export                            => CONNECTED_TO_spi_mosi_export,                            --                            spi_mosi.export
			spi_miso_export                            => CONNECTED_TO_spi_miso_export                             --                            spi_miso.export
		);

