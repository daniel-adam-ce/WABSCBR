	component DE2_115_Qsys is
		port (
			clk_100_clk_in_clk                    : in    std_logic                     := 'X';             -- clk
			clk_100_clk_in_reset_reset_n          : in    std_logic                     := 'X';             -- reset_n
			sdram_0_wire_addr                     : out   std_logic_vector(12 downto 0);                    -- addr
			sdram_0_wire_ba                       : out   std_logic_vector(1 downto 0);                     -- ba
			sdram_0_wire_cas_n                    : out   std_logic;                                        -- cas_n
			sdram_0_wire_cke                      : out   std_logic;                                        -- cke
			sdram_0_wire_cs_n                     : out   std_logic;                                        -- cs_n
			sdram_0_wire_dq                       : inout std_logic_vector(31 downto 0) := (others => 'X'); -- dq
			sdram_0_wire_dqm                      : out   std_logic_vector(3 downto 0);                     -- dqm
			sdram_0_wire_ras_n                    : out   std_logic;                                        -- ras_n
			sdram_0_wire_we_n                     : out   std_logic;                                        -- we_n
			lcd_16207_0_external_RS               : out   std_logic;                                        -- RS
			lcd_16207_0_external_RW               : out   std_logic;                                        -- RW
			lcd_16207_0_external_data             : inout std_logic_vector(7 downto 0)  := (others => 'X'); -- data
			lcd_16207_0_external_E                : out   std_logic;                                        -- E
			led_red_external_connection_export    : out   std_logic_vector(17 downto 0);                    -- export
			led_green_external_connection_export  : out   std_logic_vector(8 downto 0);                     -- export
			button_pio_external_connection_export : in    std_logic_vector(3 downto 0)  := (others => 'X'); -- export
			switch_pio_external_connection_export : in    std_logic_vector(17 downto 0) := (others => 'X'); -- export
			seg7_display_conduit_end_oSEG0        : out   std_logic_vector(6 downto 0);                     -- oSEG0
			seg7_display_conduit_end_oSEG1        : out   std_logic_vector(6 downto 0);                     -- oSEG1
			seg7_display_conduit_end_oSEG2        : out   std_logic_vector(6 downto 0);                     -- oSEG2
			seg7_display_conduit_end_oSEG3        : out   std_logic_vector(6 downto 0);                     -- oSEG3
			seg7_display_conduit_end_oSEG4        : out   std_logic_vector(6 downto 0);                     -- oSEG4
			seg7_display_conduit_end_oSEG5        : out   std_logic_vector(6 downto 0);                     -- oSEG5
			seg7_display_conduit_end_oSEG6        : out   std_logic_vector(6 downto 0);                     -- oSEG6
			seg7_display_conduit_end_oSEG7        : out   std_logic_vector(6 downto 0);                     -- oSEG7
			cy7c67200_if_0_conduit_end_DATA       : inout std_logic_vector(15 downto 0) := (others => 'X'); -- DATA
			cy7c67200_if_0_conduit_end_ADDR       : out   std_logic_vector(1 downto 0);                     -- ADDR
			cy7c67200_if_0_conduit_end_RD_N       : out   std_logic;                                        -- RD_N
			cy7c67200_if_0_conduit_end_WR_N       : out   std_logic;                                        -- WR_N
			cy7c67200_if_0_conduit_end_CS_N       : out   std_logic;                                        -- CS_N
			cy7c67200_if_0_conduit_end_RST_N      : out   std_logic;                                        -- RST_N
			cy7c67200_if_0_conduit_end_INT        : in    std_logic                     := 'X';             -- INT
			clk_io_clk_in_clk                     : in    std_logic                     := 'X'              -- clk
		);
	end component DE2_115_Qsys;

	u0 : component DE2_115_Qsys
		port map (
			clk_100_clk_in_clk                    => CONNECTED_TO_clk_100_clk_in_clk,                    --                 clk_100_clk_in.clk
			clk_100_clk_in_reset_reset_n          => CONNECTED_TO_clk_100_clk_in_reset_reset_n,          --           clk_100_clk_in_reset.reset_n
			sdram_0_wire_addr                     => CONNECTED_TO_sdram_0_wire_addr,                     --                   sdram_0_wire.addr
			sdram_0_wire_ba                       => CONNECTED_TO_sdram_0_wire_ba,                       --                               .ba
			sdram_0_wire_cas_n                    => CONNECTED_TO_sdram_0_wire_cas_n,                    --                               .cas_n
			sdram_0_wire_cke                      => CONNECTED_TO_sdram_0_wire_cke,                      --                               .cke
			sdram_0_wire_cs_n                     => CONNECTED_TO_sdram_0_wire_cs_n,                     --                               .cs_n
			sdram_0_wire_dq                       => CONNECTED_TO_sdram_0_wire_dq,                       --                               .dq
			sdram_0_wire_dqm                      => CONNECTED_TO_sdram_0_wire_dqm,                      --                               .dqm
			sdram_0_wire_ras_n                    => CONNECTED_TO_sdram_0_wire_ras_n,                    --                               .ras_n
			sdram_0_wire_we_n                     => CONNECTED_TO_sdram_0_wire_we_n,                     --                               .we_n
			lcd_16207_0_external_RS               => CONNECTED_TO_lcd_16207_0_external_RS,               --           lcd_16207_0_external.RS
			lcd_16207_0_external_RW               => CONNECTED_TO_lcd_16207_0_external_RW,               --                               .RW
			lcd_16207_0_external_data             => CONNECTED_TO_lcd_16207_0_external_data,             --                               .data
			lcd_16207_0_external_E                => CONNECTED_TO_lcd_16207_0_external_E,                --                               .E
			led_red_external_connection_export    => CONNECTED_TO_led_red_external_connection_export,    --    led_red_external_connection.export
			led_green_external_connection_export  => CONNECTED_TO_led_green_external_connection_export,  --  led_green_external_connection.export
			button_pio_external_connection_export => CONNECTED_TO_button_pio_external_connection_export, -- button_pio_external_connection.export
			switch_pio_external_connection_export => CONNECTED_TO_switch_pio_external_connection_export, -- switch_pio_external_connection.export
			seg7_display_conduit_end_oSEG0        => CONNECTED_TO_seg7_display_conduit_end_oSEG0,        --       seg7_display_conduit_end.oSEG0
			seg7_display_conduit_end_oSEG1        => CONNECTED_TO_seg7_display_conduit_end_oSEG1,        --                               .oSEG1
			seg7_display_conduit_end_oSEG2        => CONNECTED_TO_seg7_display_conduit_end_oSEG2,        --                               .oSEG2
			seg7_display_conduit_end_oSEG3        => CONNECTED_TO_seg7_display_conduit_end_oSEG3,        --                               .oSEG3
			seg7_display_conduit_end_oSEG4        => CONNECTED_TO_seg7_display_conduit_end_oSEG4,        --                               .oSEG4
			seg7_display_conduit_end_oSEG5        => CONNECTED_TO_seg7_display_conduit_end_oSEG5,        --                               .oSEG5
			seg7_display_conduit_end_oSEG6        => CONNECTED_TO_seg7_display_conduit_end_oSEG6,        --                               .oSEG6
			seg7_display_conduit_end_oSEG7        => CONNECTED_TO_seg7_display_conduit_end_oSEG7,        --                               .oSEG7
			cy7c67200_if_0_conduit_end_DATA       => CONNECTED_TO_cy7c67200_if_0_conduit_end_DATA,       --     cy7c67200_if_0_conduit_end.DATA
			cy7c67200_if_0_conduit_end_ADDR       => CONNECTED_TO_cy7c67200_if_0_conduit_end_ADDR,       --                               .ADDR
			cy7c67200_if_0_conduit_end_RD_N       => CONNECTED_TO_cy7c67200_if_0_conduit_end_RD_N,       --                               .RD_N
			cy7c67200_if_0_conduit_end_WR_N       => CONNECTED_TO_cy7c67200_if_0_conduit_end_WR_N,       --                               .WR_N
			cy7c67200_if_0_conduit_end_CS_N       => CONNECTED_TO_cy7c67200_if_0_conduit_end_CS_N,       --                               .CS_N
			cy7c67200_if_0_conduit_end_RST_N      => CONNECTED_TO_cy7c67200_if_0_conduit_end_RST_N,      --                               .RST_N
			cy7c67200_if_0_conduit_end_INT        => CONNECTED_TO_cy7c67200_if_0_conduit_end_INT,        --                               .INT
			clk_io_clk_in_clk                     => CONNECTED_TO_clk_io_clk_in_clk                      --                  clk_io_clk_in.clk
		);

