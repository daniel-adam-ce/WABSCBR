from machine import SPI
from machine import Pin
from rp2 import CAN, CANFrame, CANID


#miso = machine.Pin(16)
csn = machine.Pin(2)
csn.value(1)
#sclk = machine.Pin(18)
#mosi = machine.Pin(19)

spi = SPI(0)
spi = SPI(0, 100_000)
spi = SPI(0, 100_000, polarity=1, phase=1)

csn.value(0)
spi.write('test')
csn.value(1)
#spi.read(5)

buf = bytearray(3)
spi.write_readinto('out', buf)