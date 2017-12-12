# Pellini ScreenLine

Adds support for Pellini ScreenLine Blinds

Signal Definition:
Received 48 bits [0-47]

0000000000011111111122222222223333333333444444444
0123456789012345678901234567890123456789012345678
cccccccccccUUUUaaaaaaaaaaaaaaaaaayaaaaaaaaaaaYaa
001000000001101101111011110001110001100010100101 Ch 4 Down 1101
001000000000111101111011110001110101100010100001 Ch 4 Up   0111

Decoded:
ccccccccccc 	== Channel  / .length = 11 / .slice 0,11 / 0x0 => Group /LSB
UUUU 			== Up/Down  / .length = 4  / .slice 11,15
y 				== u[2] / Y =!y
aaaaa...aa 		== address  / .length = 31 / .slice 15,33 + 34,45 + 46,48
total.length = 11+4+2+31 = 48
