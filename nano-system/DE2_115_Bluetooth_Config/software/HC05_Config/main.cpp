/*
 * "Hello World" example.
 *
 * This example prints 'Hello from Nios II' to the STDOUT stream. It runs on
 * the Nios II 'standard', 'full_featured', 'fast', and 'low_cost' example
 * designs. It runs with or without the MicroC/OS-II RTOS and requires a STDOUT
 * device in your system's hardware.
 * The memory footprint of this hosted application is ~69 kbytes by default
 * using the standard reference design.
 *
 * For a reduced footprint version of this template, and an explanation of how
 * to reduce the memory footprint for a given application, see the
 * "small_hello_world" template.
 *
 */

#include <stdio.h>
#include "terasic_includes.h"
#include "CUart.h"



int main()
{
  CUart Uart;
  Uart.Open(HC_05_UART_NAME);
  printf("Press KEY1 to Config HC-05\r\n");
  while(IORD(PIO_KEY_BASE,0));

  //AT
  Uart.WriteString("AT\r\n");
  usleep(1000000);
  //Restore original
  Uart.WriteString("AT+ORGL\r\n");
  usleep(1000000);
  //Set Baud Rate
  Uart.WriteString("AT+UART=115200,0,0\r\n");
  usleep(1000000);


  printf("Finish\n");

  return 0;
}
