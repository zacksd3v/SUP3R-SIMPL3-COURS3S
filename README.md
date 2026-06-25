"This are the small projects that i have buld when i was a beginner. Have fun! " 


###############################################################################################################################################################################
#                                                                        JAVASCRIPT CHEAT SHEET                                                                               #
###############################################################################################################################################################################
        
----------SABBIN ABUBUWA------------
[+] ` ` | Wann ana kiransu da 'Backtics',  sannan kuma suna da wani sunan bayan haka, shine: 'Templete string'. Bayan haka suna da wadansu features hakan ma yasa ake kiran su da Templete string. Daga cikin features din akwae: => 'Interpolation': Yana baka damar hada string and numbers a lokaci guda. misali ga yadda syntax din shi yake ${}
=> 'Multi-line string': Yana baka damar rubuta code a layi sama da daya a lokaci guda, kamar dai tripple quotes a python. ga misalin syntax din shi yadda yake `Hello
                                              i am a programmer
                                              This is multi-line in javascript`

[+] let variable = 10; variable += 1; | wannan dai dai yake da 'let variable = variable + 1;' kuma dai dai yake da 'variable++'. abinda wannan ke nufi shine: gomar(10) da muke da ita Da, yanxu an qara mata daya(1), sannan kuma ki sake saving din wannan sabuwar number wandda itace (11) cikin wannan variable din. idan da za muyi visualizing din abin, tohm ga abinda zai bamu: 'let variable = variable(10) + 1'.

[+] Akwae shortcut na increment by +1 da kuma decrement by -1:
#################################################################################################################################################################################
#    Increment by 1                                                  Decrement by 1                                                                                             #
#################################################################################################################################################################################
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

[+] Typecoarsion: shine mu hada number & string snn ya bada wrong result.   
[+] Hoisting: shine ka kira fnx tun kafin ka qirqire shi. NB: fnx wanda akayi svaing nasa cikin variable to baya daukan wann feature din hoisting!    

[+] Minification: shine ayi compressing js code domin mu dora a internet a matsayin library.
[+] Default export: import zacks from 'https://zacks.com/js/1.0.1
[+] Name eport: import { account, credit_card } from 'nan.js'

[+] Reccursion: Abinda ake nufi shine ka kira fnx din ka a cikin kansa da kansa.


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ REACT CLASS  JUNE-2026 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
## React:
    [+] shine External Libs in short!
## React.js:
    [+] Muna amfani da shi ne sbd mobile app da web.
## React-dom.js:
    [+] Muna amfani da shi specific for web kadai.
## Babel:
    [+] Babel compiler ce. tana transalate JSX(HTML & JS A hade) izuwa JS.
        [+] type="text/babel" Muna amfani da wnn always duk sadda zamu rubuta code na react.

## Lesson 2:
    [+] Duk wani taga da bashi da wani abu a tsakanin sa misali: <input></input> zamu yi masa shorthand <input /> da ire-iren sa.
    [+] Muna amfani da fragment: <></> a matsayin <div></div>, saboda mu rage yawan tara divs din cikin Code namu. sbd amfani da divs tag na qara musu yawa.
    [+] Muna iya shigo da js code fnx e.t.c ta hanyar amfani da {}. Toh harma da component muna iya shigo da shi, ta hanyar amfani Tag: <sunan Component></ sunan Component>. || in a shorter way <sunan Component />.
    [+] Muna kiran wnn da < /> self closing element.
    [+] NB: Duk wani component ana fara rubuta sunan sa da UPPER CASE!
    [+] NB: Kowanne fnx na component yana da 1 parameter called 'props'.
    [+] porps = properties. in short. NB: props are object!
    [+] Parenthesis yana bamu dama mu sanya code a multiple line.

## Some Self Closing Elements are:
        FULL ELEMENT                     SHORTHAND
    -------------------------------------------------
    [+] <input></input>                 <input />
    [+] <Component></Component>         <Component /> (wnn Sunan Component NE!)
    [+] <img></img>                     <img /> 

## HOOKS:
    => USE STATE:

    [+] yana da alaqa da HTML. duk lokacin da mukai updating code a react! idan bamuyi aiki da useState ba to HTML bazai Updating ba.
    [+] UseState yana da abu 2:
        1 - The current data.
        2- Snn sae Fnx wanda da shine muke updating koma menene da shi.
        NB: Abin lura anan shine idan kazo zakai updating na useState fnx naka! toh dole ne kayi amfani da ...varNameNka a.k.a spread Operator!! domin samar da photoCopy na waccan abinda kake aiki akai! idan ba haka ba zai overridden array, var, objct ..... koma dai me kake so kayi updating naka OK!
    [+] Snn yana da SHORTCUT called array Destructing. using { sai props namu}

    => USE EFFECT:

    [+] Aikin sa shine ya mana runnign some code duk sadda muka creating component | mukai updating wani code.
    [+] UseEffect yana da paramater 2.
        1. funx da zai runnig with some code inside.
        2. [] empty array. idan muka bashi empty array zai running once ko sau 1. sbd ta nan muke controlling sai nawa zai running.
    [+] Best practice dae shine ka bashi empty array. a.k.a ya zama dependancy array, to avoid runnig tooo often.

    => USEREF:

    [+] Shi kuma useRef amfanin sa shine: a react idan muna son muyi getting html element toh fa ba kamar js bane da zamuyi amfani da DOM ba. sai dai muyi dabara. to wnn dabarar itace useRef.
    [+] UseRef is container | yana bamu dama muyi creating container | saving HTML from the component namu. Tanan ne zamu iya accessing abinda ke cikin return namu na HTML.
    [+] Ta Cikin tag din HTML zamu sanya prop na useRef. ta haka zasu gane juna.
    [+] useRef yana farawa da initial value i.e (null)
