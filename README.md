Filmthusiast
Web-ohjelmoinnin sovellusprojekti (Syksy 2023) 

Tekijät
Ville Niemi, Teemu Ritatörmä, Antti Korpua, Miikka Jänesaro. 

Mistä projektissa on kyse?
Projekti on Oulun ammattikorkeakoulu tietotekniikka opiskelijoiden koulutyö, jossa luodaan neljän hengen ryhmässä elokuvaharrastajien websovellus. Kaikki ryhmän jäsenet tekevät työtä kaikilla sovelluksen osa-alueilla (Full-Stack).   

Kuvaus
Websovelluksessa haetaan takaa elokuvaharrastajien sivustoa, johon kuuluu toimintoja, kuten oman käyttäjän luonti, profiilinäkymän muokkaaminen, elokuvien hakeminen, arvostelu ja ryhmien luonti. Etusivulla esitellään kategorioittain eri elokuvia ja TV-sarjoja. Käyttäjä voi esimerkiksi selata parhaiten arvosteltuja elokuvia. 
Sisään kirjautuessa käyttäjä saa joka kerta uniikin “tokenin”, jonka perusteella hän pääsee käsiksi omaan profiiliin ja voi muun muassa arvostella elokuvia, tai lisätä niitä katselulistalle. Ihmiset voivat myös muodostaa keskenään ryhmiä.

Teknologia
Websovellus luotiin käyttämällä React ja Node arkkitehtuuria. Backendin taustalla toimii Nodejs express-kirjasto, joka käsittelee routtausta eli tiedon lähetystä ja on todella helppokäyttöinen.  Tämä mahdollistaa nopean ja skaalautuvan kehityksen palvelinpään logiikalle. Postgre-tietokanta sisältää kaiken sovelluksessa käytettävän tiedon. Esimerkiksi käyttäjänimet, salasanat jne.
 
1.	KUVA. Pala login routtauksen koodia. Tässä verrataan annettua salasanaa sekoitettuun salasanaan. Jos käyttäjätunnus ja salasana ovat tosi, käyttäjälle annetaan tokeni, jolloin hän on kirjautunut sisään.
Frontendissä käytimme Reactia ja Reactin axios-kirjastoa, mikä yhdistää frontendin helposti backendiin. Reactilla toteutettu käyttöliittymä tarjoaa joustavan ja tehokkaan tavan rakentaa dynaamisia käyttöliittymiä.

 ![RegisterUser](https://github.com/TVT22-21/filmthusiast/assets/112549873/196312e4-ca99-4b8c-94ad-922e5932a691)
 
2.	KUVA. Käyttäjän rekisteröinti lomake sivustolle. Rekisteröitymällä käyttäjällä on mahdollisuus lisätä arvosteluja, muokata profiiliaan ja liittyä ryhmiin.

 ![LogIn](https://github.com/TVT22-21/filmthusiast/assets/112549873/c6d37018-8bb3-4bd8-8a5d-be10f278be28)
 
3.	KUVA. Käyttäjän kirjautuminen sivustolle.

 ![ProfileArvostelu](https://github.com/TVT22-21/filmthusiast/assets/112549873/8072097a-7f2a-4fa2-8dda-aa1a85b1a55f)
 
4.	KUVA. Käyttäjän profiili sivun elokuva-arvostelu kortti. Käyttäjällä mahdollisuus poistaa arvostelu tai muokata kyseistä arvostelua.

 ![SearchPage](https://github.com/TVT22-21/filmthusiast/assets/112549873/ca2bdba7-30df-4e4f-934c-d4683a373a33)
 
5.	KUVA. Sivuston elokuvan haku osio. Sivustolla voidaan selata valitsemansa elokuvan arvosteluja. Kirjautuneena käyttäjä voi lisätä elokuvan omalle watchlistille tai luoda arvostelun.
 




