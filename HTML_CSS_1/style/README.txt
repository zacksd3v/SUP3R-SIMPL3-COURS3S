********************************************************************
*	  NewKeyWords For ME In Html, Css & JS Notes               *
********************************************************************
=> <figure><figcation></figcaption></figure>:-
Ana saka rubutu ko a cakuda shi a kasan hoto. A HTML.

=><thead></thead><tbody></body><tfoot></tfoot> :-
Ana amfani da su a table mai tsayi (sama, jiki, kasa). A HTML.

=>Object-fit:cover..; Object-position:middle,center...; :-
Ana saita hoto da su biyun. A CSS.

----Get, Post and Action-----------------------
=>Action:-
Ana amfani da 'action' domin sanin inda bayanai zasu je a cikin server, ta hanyar saka URL din server. A HTML.
misali:
https//www.Bilalibnrabah.org/login.php
NOTE: login.php shine action!.

=>Get:-
Ana amfani da 'get' idan ana bukatar bayanai daga server.
idan ka shigar da bayani, sai ya aza maka su a karshen 'Action' URL. A HTML.
misali: 
-Search engine.(Inda zamu shigar da bayanai)

=>Post:-
Ana amfani da 'Post' idan za'a tura wa server bayanai. A HTML.
misali:
-username&password.
-long data...etc.

---end-------------------------------------------

=><span></span>:-
Ana amfani da shi wurin style a CSS, domin shi baya nuna effect a jikin code. A HTML.

---------Display properties-----------------------------------
=>block element:-
Ana amfani da shi domin jera abubuwa, wani kasan wani. Kuma muna iya fahimtar hakan ta hanyar amfani da 'Inspector'. Asali shi 'block element' by defult yana cinye duka layi. A CSS.
misali:
-<p></p>
-<div></div>

=> inline-block element:-
Ana amfani da shi domin jera abubuwa a bisa layi daya, kuma muna iya fahimtar hakan ta hanyar amfani da 'Inspector'. Asali shi 'inline-block element' by defult baya cinye duka layi, sai dai yana cinye layi ne gwargwadon bukata. A CSS.
misali:
-<button></button>
-<img src="" alt="">..etc

=>Inline element:-
Ana amfani da shi a bisa layi daya ne a cikin code. A CSS.
misali:
-This is a code, <strong>but i'am a beginner</strong> level. Abinda ke tsakanin 'strong tag' shine misalin inline-block, domin shi kadai muke da niyar canzawa fasali.

NOTE: kaso 90% Mun fi amfani da inline-block & block element wurin style din mu.

----end--------------------------------------------------------

=>Nested layout technique:-
Shine abinda ake kira <div> a cikin <div>. muna da Vertical & Horizontal layout(dabara), da su neh muke visualizing din kowanne irin layout na website, da kuma inspector tool shima muna amfani da shi domin visualizing vertical & horizontal layout. A CSS.
misali na software: 
-Paint software	(for drawing vertical & Horizontal)
-google drawing (for drawing vertical & Horizontal)

=>Event:-
Shine yake kaikomo tsakanin HTML, CSS, da Javascript, domin da shine zaka danna button kaga ya canza izuwa wani nau'i na daban. Ko kuma ka shiga browser kaga wani abu yayi popping daga sama. A JS.

=>Grid:- wata hanya ce da ake layout din pages, ta hanyar shirya su a cikin wani gida-gida kamar  2by3, 3by3 etc. Grid yana da colums da rows, sannan muna styling din layout masu Grid acikin Grid.
syntax din kuwa sune: 
-display: grid;
-grid-template-colums: 100px 1fr 300px;
-colums-gap: 50px;
-row-gap: 20px;

=>Flex:- shima kamar grid yake wajen layout na pages sae dai shi yafi grid amfani sosai wajen tsara layout. saboda shi yana yin wasu abubuwa wanda Grid baya iya yi, kamar chanza wuri tare da size din wurin da aka canza zai tafi, amma shi kuma grid baya iya wannan!.
muna styling header ko content da shi.
syntax:
-display: flex;
-flex-direction: row, colums,
-justify-content: strech, start, end...;
-align-items: center, end, start;
-gap: 20px;

=>flex-shrink:- Da shi ne muke hana icons idan munyi shrinking su motse kansu a wuri daya ta hanyar seta shi a 0. A CSS.
misali:
-flex-shrink: 0;

=>max-width: muna amfani da shi domin saka tsayayyen width ta yadda koda an matse browser zai dakatar da abinda aka saka ma max-width a iya width din da muka bashi kamar a search bar na youtube. A CSS.
misali:
-max-width: 500px;

=>margin-left: -1px;:- idan muna abubuwa guda biyu, kuma muna so mu hadasu wani acikin wani kamar search input da button na youtube su zama  border daya a madadin biyu, sai muyi amfani da shi.
misali:
-margin-left: -1px;