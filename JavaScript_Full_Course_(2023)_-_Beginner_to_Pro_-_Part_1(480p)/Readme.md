####################################################################################################################
                                            JAVASCRIPT CHEAT SHEET
                                            #####################
        
----------SABBIN ABUBUWA------------
[+] ` ` | Wann ana kiransu da 'Backtics',  sannan kuma suna da wani sunan bayan haka, shine: 'Templete string'. Bayan haka suna da wadansu features hakan ma yasa ake kiran su da Templete string. Daga cikin features din akwae: => 'Interpolation': Yana baka damar hada string and numbers a lokaci guda. misali ga yadda syntax din shi yake ${}
=> 'Multi-line string': Yana baka damar rubuta code a layi sama da daya a lokaci guda, kamar dai tripple quotes a python. ga misalin syntax din shi yadda yake `Hello
                                              i am a programmer
                                              This is multi-line in javascript`

[+] let variable = 10; variable += 1; | wannan dai dai yake da 'let variable = variable + 1;' kuma dai dai yake da 'variable++'. abinda wannan ke nufi shine: gomar(10) da muke da ita Da, yanxu an qara mata daya(1), sannan kuma ki sake saving din wannan sabuwar number wandda itace (11) cikin wannan variable din. idan da za muyi visualizing din abin, tohm ga abinda zai bamu: 'let variable = variable(10) + 1'.

[+] Akwae shortcut na increment by +1 da kuma decrement by -1:
######################################################################################################
    Increment by 1                                                  Decrement by 1
#####################################################################################################
=> hanyar farko: variable = variable + 1;         |         => hanyar farko: variable = variable - 1;
=> hanya ta biyu: variable += 1;                  |         => hanya ta biyu: variable -= 1;
=> hanyar karshe: variable++;                     |         => hanyar karshe: variable--s;

[+] Tracing the code | shine following the code line by line a lokacing da code ke executing.

[+] Muna amfani da === domin comparison tsakanin 2 values. sbd == yana converting din int & str into int kawae ma'ana ba accuracy!

// TRUTHY & FALSY STATEMENT
[+] FALSY VALUES ARE: false, 0, '', NaN, undefined, null
[+] EXCLUDING THE ABOVED MENTIONED IS OTHERWISE THE TRUTHY VALUE!
[+] E.G 
        const cartQuantity = 10;
        if (cartQuantity > 10){
            ....
        } instead sai mu kayi HAKA:
        
        const cartQuantity = 10;
        if (cartQuantity){
            ....
        } KAGA AI MUN RAGE CODE SNN MUN SAMU SAUKI.!
        