#include <iostream> 
using namespace std;

int sboxlookup(int x);

int main(){
    int a; 
    int x = 0x0b ;
    a = sboxlookup(x);
    cout << a << endl;
    return 0;
}

int sboxlookup(int x){
    int out; 
    switch(x){
        case 0x0:
        out = 0x52;
        break;
        case 0x1:
        out = 0x09	;
        break;
        case 0x2:
        out = 0x6a	;
        break;
        case 0x3:
        out = 0xd5	;
        break;
        case 0x4:
        out = 0x30	;
        break;
        case 0x5:
        out = 0x36	;
        break;
        case 0x6:
        out = 0xa5	;
        break;
        case 0x7:
        out = 0x38	;
        break;
        case 0x8:
        out = 0xbf	;
        break;
        case 0x9:
        out = 0x40	;
        break;
        case 0xA:
        out = 0xa3	;
        break;
        case 0xB:
        out = 0x9e	;
        break;
        case 0xC:
        out = 0x81	;
        break;
        case 0xD:
        out = 0xf3	;
        break;
        case 0xE:
        out = 0xd7	;
        break;
        case 0xF:
        out = 0xfb;
        break;
        case 0x10:
        out = 0x7c	;
        break;
        case 0x11:
        out = 0xe3	;
        break;
        case 0x12:
        out = 0x39	;
        break;
        case 0x13:
        out = 0x82	;
        break;
        case 0x14:
        out = 0x9b	;
        break;
        case 0x15:
        out = 0x2f	;
        break;
        case 0x16:
        out = 0xff	;
        break;
        case 0x17:
        out = 0x87	;
        break;
        case 0x18:
        out = 0x34	;
        break;
        case 0x19:
        out = 0x8e	;
        break;
        case 0x1A:
        out = 0x43	;
        break;
        case 0x1B:
        out = 0x44	;
        break;
        case 0x1C:
        out = 0xc4	;
        break;
        case 0x1D:
        out = 0xde	;
        break;
        case 0x1E:
        out = 0xe9	;
        break;
        case 0x1F:
        out = 0xcb;
        break;
        case 0x20:
        out = 0x54;
        break;
        case 0x21:
        out = 0x7b	;
        break;
        case 0x22:
        out = 0x94	;
        break;
        case 0x23:
        out = 0x32	;
        break;
        case 0x24:
        out = 0xa6	;
        break;
        case 0x25:
        out = 0xc2	;
        break;
        case 0x26:
        out = 0x23	;
        break;
        case 0x27:
        out = 0x3d	;
        break;
        case 0x28:
        out = 0xee	;
        break;
        case 0x29:
        out = 0x4c	;
        break;
        case 0x2A:
        out = 0x95	;
        break;
        case 0x2B:
        out = 0x0b	;
        break;
        case 0x2C:
        out = 0x42	;
        break;
        case 0x2D:
        out = 0xfa	;
        break;
        case 0x2E:
        out = 0xc3	;
        break;
        case 0x2F:
        out = 0x4e;
        break;
        case 0x30:
        out = 0x08	;
        break;
        case 0x31:
        out = 0x2e	;
        break;
        case 0x32:
        out = 0xa1	;
        break;
        case 0x33:
        out = 0x66	;
        break;
        case 0x34:
        out = 0x28	;
        break;
        case 0x35:
        out = 0xd9	;
        break;
        case 0x36:
        out = 0x24	;
        break;
        case 0x37:
        out = 0xb2	;
        break;
        case 0x38:
        out = 0x76	;
        break;
        case 0x39:
        out = 0x5b	;
        break;
        case 0x3A:
        out = 0xa2	;
        break;
        case 0x3B:
        out = 0x49	;
        break;
        case 0x3C:
        out = 0x6d	;
        break;
        case 0x3D:
        out = 0x8b	;
        break;
        case 0x3E:
        out = 0xd1	;
        break;
        case 0x3F:
        out = 0x25;
        break;
        case 0x40:
        out = 0x72	;
        break;
        case 0x41:
        out = 0xf8	;
        break;
        case 0x42:
        out = 0xf6	;
        break;
        case 0x43:
        out = 0x64	;
        break;
        case 0x44:
        out = 0x86	;
        break;
        case 0x45:
        out = 0x68	;
        break;
        case 0x46:
        out = 0x98	;
        break;
        case 0x47:
        out = 0x16	;
        break;
        case 0x48:
        out = 0xd4	;
        break;
        case 0x49:
        out = 0xa4	;
        break;
        case 0x4A:
        out = 0x5c	;
        break;
        case 0x4B:
        out = 0xcc	;
        break;
        case 0x4C:
        out = 0x5d	;
        break;
        case 0x4D:
        out = 0x65	;
        break;
        case 0x4E:
        out = 0xb6	;
        break;
        case 0x4F:
        out = 0x92;
        break;
        case 0x50:
        out = 0x6c	;
        break;
        case 0x51:
        out = 0x70	;
        break;
        case 0x52:
        out = 0x48	;
        break;
        case 0x53:
        out = 0x50	;
        break;
        case 0x54:
        out = 0xfd	;
        break;
        case 0x55:
        out = 0xed	;
        break;
        case 0x56:
        out = 0xb9	;
        break;
        case 0x57:
        out = 0xda	;
        break;
        case 0x58:
        out = 0x5e	;
        break;
        case 0x59:
        out = 0x15	;
        break;
        case 0x5A:
        out = 0x46	;
        break;
        case 0x5B:
        out = 0x57	;
        break;
        case 0x5C:
        out = 0xa7	;
        break;
        case 0x5D:
        out = 0x8d	;
        break;
        case 0x5E:
        out = 0x9d	;
        break;
        case 0x5F:
        out = 0x84;
        break;
        case 0x60:
        out = 0x90	;
        break;
        case 0x61:
        out = 0xd8	;
        break;
        case 0x62:
        out = 0xab	;
        break;
        case 0x63:
        out = 0x00	;
        break;
        case 0x64:
        out = 0x8c	;
        break;
        case 0x65:
        out = 0xbc	;
        break;
        case 0x66:
        out = 0xd3	;
        break;
        case 0x67:
        out = 0x0a	;
        break;
        case 0x68:
        out = 0xf7	;
        break;
        case 0x69:
        out = 0xe4	;
        break;
        case 0x6A:
        out = 0x58	;
        break;
        case 0x6B:
        out = 0x05	;
        break;
        case 0x6C:
        out = 0xb8	;
        break;
        case 0x6D:
        out = 0xb3	;
        break;
        case 0x6E:
        out = 0x45	;
        break;
        case 0x6F:
        out = 0x06;
        break;
        case 0x70:
        out = 0xd0	;
        break;
        case 0x71:
        out = 0x2c	;
        break;
        case 0x72:
        out = 0x1e	;
        break;
        case 0x73:
        out = 0x8f	;
        break;
        case 0x74:
        out = 0xca	;
        break;
        case 0x75:
        out = 0x3f	;
        break;
        case 0x76:
        out = 0x0f	;
        break;
        case 0x77:
        out = 0x02	;
        break;
        case 0x78:
        out = 0xc1	;
        break;
        case 0x79:
        out = 0xaf	;
        break;
        case 0x7A:
        out = 0xbd	;
        break;
        case 0x7B:
        out = 0x03	;
        break;
        case 0x7C:
        out = 0x01	;
        break;
        case 0x7D:
        out = 0x13	;
        break;
        case 0x7E:
        out = 0x8a	;
        break;
        case 0x7F:
        out = 0x6b;
        break;
        case 0x80:
        out = 0x3a	;
        break;
        case 0x81:
        out = 0x91	;
        break;
        case 0x82:
        out = 0x11	;
        break;
        case 0x83:
        out = 0x41	;
        break;
        case 0x84:
        out = 0x4f	;
        break;
        case 0x85:
        out = 0x67	;
        break;
        case 0x86:
        out = 0xdc	;
        break;
        case 0x87:
        out = 0xea	;
        break;
        case 0x88:
        out = 0x97	;
        break;
        case 0x89:
        out = 0xf2	;
        break;
        case 0x8A:
        out = 0xcf	;
        break;
        case 0x8B:
        out = 0xce	;
        break;
        case 0x8C:
        out = 0xf0	;
        break;
        case 0x8D:
        out = 0xb4	;
        break;
        case 0x8E:
        out = 0xe6	;
        break;
        case 0x8F:
        out = 0x73;
        break;
        case 0x90:
        out = 0x96	;
        break;
        case 0x91:
        out = 0xac	;
        break;
        case 0x92:
        out = 0x74	;
        break;
        case 0x93:
        out = 0x22	;
        break;
        case 0x94:
        out = 0xe7	;
        break;
        case 0x95:
        out = 0xad	;
        break;
        case 0x96:
        out = 0x35	;
        break;
        case 0x97:
        out = 0x85	;
        break;
        case 0x98:
        out = 0xe2	;
        break;
        case 0x99:
        out = 0xf9	;
        break;
        case 0x9A:
        out = 0x37	;
        break;
        case 0x9B:
        out = 0xe8	;
        break;
        case 0x9C:
        out = 0x1c	;
        break;
        case 0x9D:
        out = 0x75	;
        break;
        case 0x9E:
        out = 0xdf	;
        break;
        case 0x9F:
        out = 0x6e;
        break;
        case 0xA0:
        out = 0x47	;
        break;
        case 0xA1:
        out = 0xf1	;
        break;
        case 0xA2:
        out = 0x1a	;
        break;
        case 0xA3:
        out = 0x71	;
        break;
        case 0xA4:
        out = 0x1d	;
        break;
        case 0xA5:
        out = 0x29	;
        break;
        case 0xA6:
        out = 0xc5	;
        break;
        case 0xA7:
        out = 0x89	;
        break;
        case 0xA8:
        out = 0x6f	;
        break;
        case 0xA9:
        out = 0xb7	;
        break;
        case 0xAA:
        out = 0x62	;
        break;
        case 0xAB:
        out = 0x0e	;
        break;
        case 0xAC:
        out = 0xaa	;
        break;
        case 0xAD:
        out = 0x18	;
        break;
        case 0xAE:
        out = 0xbe	;
        break;
        case 0xAF:
        out = 0x1b;
        break;
        case 0xB0:
        out = 0xfc	;
        break;
        case 0xB1:
        out = 0x56	;
        break;
        case 0xB2:
        out = 0x3e	;
        break;
        case 0xB3:
        out = 0x4b	;
        break;
        case 0xB4:
        out = 0xc6	;
        break;
        case 0xB5:
        out = 0xd2	;
        break;
        case 0xB6:
        out = 0x79	;
        break;
        case 0xB7:
        out = 0x20	;
        break;
        case 0xB8:
        out = 0x9a	;
        break;
        case 0xB9:
        out = 0xdb	;
        break;
        case 0xBA:
        out = 0xc0	;
        break;
        case 0xBB:
        out = 0xfe	;
        break;
        case 0xBC:
        out = 0x78	;
        break;
        case 0xBD:
        out = 0xcd	;
        break;
        case 0xBE:
        out = 0x5a	;
        break;
        case 0xBF:
        out = 0xf4;
        break;
        case 0xC0:
        out = 0x1f	;
        break;
        case 0xC1:
        out = 0xdd	;
        break;
        case 0xC2:
        out = 0xa8	;
        break;
        case 0xC3:
        out = 0x33	;
        break;
        case 0xC4:
        out = 0x88	;
        break;
        case 0xC5:
        out = 0x07	;
        break;
        case 0xC6:
        out = 0xc7	;
        break;
        case 0xC7:
        out = 0x31	;
        break;
        case 0xC8:
        out = 0xb1	;
        break;
        case 0xC9:
        out = 0x12	;
        break;
        case 0xCA:
        out = 0x10	;
        break;
        case 0xCB:
        out = 0x59	;
        break;
        case 0xCC:
        out = 0x27	;
        break;
        case 0xCD:
        out = 0x80	;
        break;
        case 0xCE:
        out = 0xec	;
        break;
        case 0xCF:
        out = 0x5f;
        break;
        case 0xD0:
        out = 0x60	;
        break;
        case 0xD1:
        out = 0x51	;
        break;
        case 0xD2:
        out = 0x7f	;
        break;
        case 0xD3:
        out = 0xa9	;
        break;
        case 0xD4:
        out = 0x19	;
        break;
        case 0xD5:
        out = 0xb5	;
        break;
        case 0xD6:
        out = 0x4a	;
        break;
        case 0xD7:
        out = 0x0d	;
        break;
        case 0xD8:
        out = 0x2d	;
        break;
        case 0xD9:
        out = 0xe5	;
        break;
        case 0xDA:
        out = 0x7a	;
        break;
        case 0xDB:
        out = 0x9f	;
        break;
        case 0xDC:
        out = 0x93	;
        break;
        case 0xDD:
        out = 0xc9	;
        break;
        case 0xDE:
        out = 0x9c	;
        break;
        case 0xDF:
        out = 0xef;
        break;
        case 0xE0:
        out = 0xa0	;
        break;
        case 0xE1:
        out = 0xe0	;
        break;
        case 0xE2:
        out = 0x3b	;
        break;
        case 0xE3:
        out = 0x4d	;
        break;
        case 0xE4:
        out = 0xae	;
        break;
        case 0xE5:
        out = 0x2a	;
        break;
        case 0xE6:
        out = 0xf5	;
        break;
        case 0xE7:
        out = 0xb0	;
        break;
        case 0xE8:
        out = 0xc8	;
        break;
        case 0xE9:
        out = 0xeb	;
        break;
        case 0xEA:
        out = 0xbb	;
        break;
        case 0xEB:
        out = 0x3c	;
        break;
        case 0xEC:
        out = 0x83	;
        break;
        case 0xED:
        out = 0x53	;
        break;
        case 0xEE:
        out = 0x99	;
        break;
        case 0xEF:
        out = 0x61;
        break;
        case 0xF0:
        out = 0x17	;
        break;
        case 0xF1:
        out = 0x2b	;
        break;
        case 0xF2:
        out = 0x04	;
        break;
        case 0xF3:
        out = 0x7e	;
        break;
        case 0xF4:
        out = 0xba	;
        break;
        case 0xF5:
        out = 0x77	;
        break;
        case 0xF6:
        out = 0xd6	;
        break;
        case 0xF7:
        out = 0x26	;
        break;
        case 0xF8:
        out = 0xe1	;
        break;
        case 0xF9:
        out = 0x69	;
        break;
        case 0xFA:
        out = 0x14	;
        break;
        case 0xFB:
        out = 0x63	;
        break;
        case 0xFC:
        out = 0x55	;
        break;
        case 0xFD:
        out = 0x21	;
        break;
        case 0xFE:
        out = 0x0c	;
        break;
        case 0xFF:
        out = 0x7d;
        break;
        default: 
        out = 0x00;
        break;
    }
    return out;
}