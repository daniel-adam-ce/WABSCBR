#include "altera_up_avalon_video_pixel_buffer_dma.h"
#include "altera_up_avalon_video_character_buffer_with_dma.h"
#include "sys/alt_stdio.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "Altera_UP_SD_Card_Avalon_Interface.h"

void draw_big_A(alt_up_pixel_buffer_dma_dev *);

/********************************************************************************
 * This program demonstrates use of the character and pixel buffer HAL code for
 * the DE2 Media computer. It:
 * 	-- places a blue box on the VGA display, and places a text string inside the box.
 *		-- draws a big A on the screen, for ALTERA
 *		-- "bounces" a colored box around the screen
********************************************************************************/
int main(void)
{
	alt_up_pixel_buffer_dma_dev *pixel_buffer_dev;
	alt_up_char_buffer_dev *char_buffer_dev;
	alt_up_sd_card_dev * sd_card;
	short int handler;
	short att1=0, att2=0, att3=0, att;
	short buffer[512][256];

	sd_card = alt_up_sd_card_open_dev("/dev/SD_Card");

	 	 if (sd_card!=NULL){
			if (alt_up_sd_card_is_Present()){
				printf("An SD Card was found!\n");
			}
			else {
				printf("No SD Card Found. \n Exiting the program.");
				return -1;
			}

	 		if (alt_up_sd_card_is_FAT16()){
				printf("FAT-16 partiton found!\n");

				handler = alt_up_sd_card_fopen("test.bmp", false);
				att = alt_up_sd_card_get_attributes(handler);

				/* initialize the pixel buffer HAL */
				pixel_buffer_dev = alt_up_pixel_buffer_dma_open_dev ("/dev/VGA_Subsystem_VGA_Pixel_DMA");
				if ( pixel_buffer_dev == NULL)
					alt_printf ("Error: could not open VGA pixel buffer device\n");
				else
					alt_printf ("Opened character VGA pixel buffer device\n");

				/* set both the main buffer and back buffer to the allocated space */
				alt_up_pixel_buffer_dma_change_back_buffer_address(pixel_buffer_dev, (unsigned int) buffer);
				alt_up_pixel_buffer_dma_swap_buffers(pixel_buffer_dev);
				while (alt_up_pixel_buffer_dma_check_swap_buffers_status(pixel_buffer_dev));
				alt_up_pixel_buffer_dma_change_back_buffer_address(pixel_buffer_dev, (unsigned int) buffer);

				/* clear the graphics screen */
				alt_up_pixel_buffer_dma_clear_screen(pixel_buffer_dev, 0);
			}
			else{
				printf("No FAT-16 partition found - Exiting!\n");
				return -1;
			}

			printf("The SD Card contains the following files:\n");

			//Call find_files on the root directory
			//find_files (".");

		}

	/* used for drawing coordinates */
	int x1, y1, x2, y2, deltax_1, deltax_2, deltay_1, deltay_2, delay = 0;

	/* create a message to be displayed on the VGA display */
	char text_top_row[40] = "Altera DE2-115\0";
	char text_bottom_row[40] = "Media Computer\0";

    /* allocate space for the pixel buffer
	short buffer[512][256]; */

	/* initialize the pixel buffer HAL
	pixel_buffer_dev = alt_up_pixel_buffer_dma_open_dev ("/dev/VGA_Subsystem_VGA_Pixel_DMA");
	if ( pixel_buffer_dev == NULL)
		alt_printf ("Error: could not open VGA pixel buffer device\n");
	else
		alt_printf ("Opened character VGA pixel buffer device\n");*/

	/* set both the main buffer and back buffer to the allocated space
	alt_up_pixel_buffer_dma_change_back_buffer_address(pixel_buffer_dev, (unsigned int) buffer);
	alt_up_pixel_buffer_dma_swap_buffers(pixel_buffer_dev);
	while (alt_up_pixel_buffer_dma_check_swap_buffers_status(pixel_buffer_dev));
	alt_up_pixel_buffer_dma_change_back_buffer_address(pixel_buffer_dev, (unsigned int) buffer);*/

	/* clear the graphics screen
	alt_up_pixel_buffer_dma_clear_screen(pixel_buffer_dev, 0);*/

	/* output text message in the middle of the VGA monitor */
	/*char_buffer_dev = alt_up_char_buffer_open_dev("/dev/VGA_Subsystem_VGA_Char_Buffer_avalon_char_buffer_slave");
	if (char_buffer_dev == NULL)
	{
		alt_printf ("Error: could not open character buffer device\n");
		return -1;
	}
	else
		alt_printf ("Opened character buffer device\n");
	alt_up_char_buffer_string(char_buffer_dev, text_top_row, 35, 29);
	alt_up_char_buffer_string(char_buffer_dev, text_bottom_row, 35, 30);*/

	/* now draw a background box for the text */
	alt_up_pixel_buffer_dma_draw_box(pixel_buffer_dev, 34*4, 28*4, 50*4, 32*4, 0x187F, 0);

	/* now draw a big A for ALTERA */
	draw_big_A (pixel_buffer_dev);

	/* now draw a red rectangle with diagonal green lines */
	x1 = 20; y1 = 20;
	x2 = 50; y2 = 50;
	alt_up_pixel_buffer_dma_draw_rectangle(pixel_buffer_dev, x1, y1, x2, y2, 0xF800, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, x1, y1, x2, y2, 0x07e0, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, x1, y2, x2, y1, 0x07e0, 0);
	alt_up_pixel_buffer_dma_swap_buffers(pixel_buffer_dev);

	/* set the direction in which the box will move */
	deltax_1 = deltax_2 = deltay_1 = deltay_2 = 1;

	while(1)
	{
		if (alt_up_pixel_buffer_dma_check_swap_buffers_status(pixel_buffer_dev) == 0)
		{
			/* If the screen has been drawn completely then we can draw a new image. This
			 * section of the code will only be entered once every 60th of a second, because
			 * this is how long it take the VGA controller to copy the image from memory to
			 * the screen. */
			delay = 1 - delay;

			if (delay == 0)
			{
				/* The delay is inserted to slow down the animation from 60 frames per second
				 * to 30. Every other refresh cycle the code below will execute. We first erase
				 * the box with Erase Rectangle */
				alt_up_pixel_buffer_dma_draw_rectangle(pixel_buffer_dev, x1, y1, x2, y2, 0, 0);
				alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, x1, y1, x2, y2, 0, 0);
				alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, x1, y2, x2, y1, 0, 0);

				// move the rectangle
				x1 = x1 + deltax_1;
				x2 = x2 + deltax_2;
				y1 = y1 + deltay_1;
				y2 = y2 + deltay_2;
				if ((deltax_1 > 0) && (x1 >= alt_up_pixel_buffer_dma_x_res(pixel_buffer_dev) - 1))
				{
					x1 = alt_up_pixel_buffer_dma_x_res(pixel_buffer_dev) - 1;
					deltax_1 = -deltax_1;
				}
				else if ((deltax_1 < 0) && (x1 <= 0))
				{
					x1 = 0;
					deltax_1 = -deltax_1;
				}
				if ((deltax_2 > 0) && (x2 >= alt_up_pixel_buffer_dma_x_res(pixel_buffer_dev) - 1))
				{
					x2 = alt_up_pixel_buffer_dma_x_res(pixel_buffer_dev) - 1;
					deltax_2 = -deltax_2;
				}
				else if ((deltax_2 < 0) && (x2 <= 0))
				{
					x2 = 0;
					deltax_2 = -deltax_2;
				}
				if ((deltay_1 > 0) && (y1 >= alt_up_pixel_buffer_dma_y_res(pixel_buffer_dev) - 1))
				{
					y1 = alt_up_pixel_buffer_dma_y_res(pixel_buffer_dev) - 1;
					deltay_1 = -deltay_1;
				}
				else if ((deltay_1 < 0) && (y1 <= 0))
				{
					y1 = 0;
					deltay_1 = -deltay_1;
				}
				if ((deltay_2 > 0) && (y2 >= alt_up_pixel_buffer_dma_y_res(pixel_buffer_dev) - 1))
				{
					y2 = alt_up_pixel_buffer_dma_y_res(pixel_buffer_dev) - 1;
					deltay_2 = -deltay_2;
				}
				else if ((deltay_2 < 0) && (y2 <= 0))
				{
					y2 = 0;
					deltay_2 = -deltay_2;
				}

				// redraw Rectangle with diagonal lines
				alt_up_pixel_buffer_dma_draw_rectangle(pixel_buffer_dev, x1, y1, x2, y2, 0xF800, 0);
				alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, x1, y1, x2, y2, 0x07e0, 0);
				alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, x1, y2, x2, y1, 0x07e0, 0);

				// redraw the box in the foreground
				alt_up_pixel_buffer_dma_draw_box(pixel_buffer_dev, 34*4, 28*4, 50*4, 32*4, 0x187F, 0);

				draw_big_A (pixel_buffer_dev);
			}

			/* Execute a swap buffer command. This will allow us to check if the screen has
			 * been redrawn before generating a new animation frame. */
			alt_up_pixel_buffer_dma_swap_buffers(pixel_buffer_dev);
		}
	}
}

/* draws a big letter A on the screen */
void draw_big_A(alt_up_pixel_buffer_dma_dev *pixel_buffer_dev )
{
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 10, 88, 44, 10, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 44, 10, 72, 10, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 72, 10, 106, 88, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 106, 88, 81, 88, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 81, 88, 75, 77, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 75, 77, 41, 77, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 41, 77, 35, 88, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 35, 88, 10, 88, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 47, 60, 58, 32, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 58, 32, 69, 60, 0xffff, 0);
	alt_up_pixel_buffer_dma_draw_line(pixel_buffer_dev, 69, 60, 47, 60, 0xffff, 0);
}
