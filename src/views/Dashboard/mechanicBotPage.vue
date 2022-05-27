<template>
  <div>
    <top-navbar></top-navbar>
    <b-jumbotron
      style="width: 80%; margin: auto; margin-top: 10vh; min-height: 60vh"
      bg-variant="primary"
      text-variant="white"
    >
      <b-container>
        <b-row style="height: 100%; width: 100%">
          <b-col
            cols="12"
            md="4"
            class="d-flex align-items-center justify-content-center"
          >
            <img src="../../assets/bot.svg" style="width: 40vh" alt="" />
          </b-col>
          <b-col cols="12" md="8" class="qaCol">
            <div v-if="!isStarted">
              <h1>
                Witaj! Z tej strony BOT Diagnosta.<br />
                Jeśli chcesz zacząć diagnostykę swojego samochodu naciśnij przycisk start
              </h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin-top: 3vh"
                size="lg"
                @click="diagnosticStart()"
              >
                Start</b-button
              >
            </div>
            <div v-else-if="isStarted && q1 == null">
              <h1>1. Czy Twój samochód odpala?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="firstAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="firstAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q1 && q2 == null">
              <h1>2. Czy deska rozdzielcza wyświetla błąd?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="secondAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="secondAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q1 == false && q20 == null">
              <h1>2.Czy rozrusznik zaczyna pracować?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="twentiethAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="twentiethAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q20 == false && q25 == null">
              <h1>3.Czy akumulator jest naładowany?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="twentyFifthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="twentyFifthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q25 == false">
              <h1>Naładuj lub wymień akumulator i spróbuj ponownie.</h1>
            </div>
            <div v-if="q20 && q21 == null">
              <h1>3. Czy w zbiorniku znajduje się paliwo?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="twentyFirstAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="twentyFirstAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q21 == false">
              <h1>Zatankuj pierw paliwo i spróbuj ponownie.</h1>
            </div>
            <div v-if="q2 && q3 == null">
              <h1>3. Czy wyświetlany błąd to Check Engine?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="thirdAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="thirdAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q2 == false && q13 == null">
              <h1>3. Czy samochód wydaje niepokojące dźwięki?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="thirteenthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="thirteenthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q25 && q26 == null">
              <h1>
                4. Czy deska rozdzielcza reaguje na przekręcenie kluczyka w pozycję
                zapłonu?
              </h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="twentySixthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="twentySixthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q26">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Awaria rozrusznika - Uszkodzenie instalacji elektrycznej
              </h1>
            </div>
            <div v-if="q26 == false">
              <h1>
                Prawdopodobna usterka:<br /><br />
                - Uszkodzenie lub zwarcie w instalacji elektyrycznej <br />
                - Uszkodzona stacyjka
              </h1>
            </div>
            <div v-if="q21 && q22 == null">
              <h1>4. Czy samochód próbuje odpalić?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="twentySecondAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="twentySecondAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q22">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Awaria rozrządu
                <br />
                - Awaria cewki zapłonowej <br />
                - Awaria czujnika obrotu wału<br />
                - Zapowietrzony układ paliwowy lub wtryskowy
              </h1>
            </div>
            <div v-if="q13 && q14 == null">
              <h1>4. Czy są to piski?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="fourteenthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="fourteenthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q14">
              <h1>
                Prawdopodobne usterki:<br /><br />
                -Luźny pasek rozrządu
                <br />
                - Duże zużycie sprzęgiełka alternatora <br />
                - Duże zużycie koła sprężarki klimatyzacji<br />
                - Awaria rolek napinacza
              </h1>
            </div>
            <div v-if="q13 == false && q18 == null">
              <h1>4. Czy podczas jazdy występują drgania?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="eighteenthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="eighteenthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q18 == false && q18 !== null">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Awaria dwumasowego koła zamachowego
                <br />
                - Awaria poduszki zawieszenia silnika
              </h1>
            </div>
            <div v-if="q3 && q4 == null">
              <h1>4. Czy samochód jest w trybie awaryjnym?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="fourthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="fourthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q4 && q4 !== null">
              <h1>
                W takim przypadku liczba możliwych usterek jest zbyt duża. Zapraszamy na
                wizytę w celu diagnostyki komputerowej
              </h1>
            </div>
            <div v-if="q3 == false && q10 == null">
              <h1>4. Czy wyświetlany jest błąd systemu ABS?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="tenthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="tenthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q10 && q10 !== null">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Awaria czujnika prędkości obrotowej kół
                <br />
                - Niesprawna pompa ABS lub zawór <br />
                - Awaria modułu ABS<br />
                - Niski poziom płynu hamulcowego - Awaria sterownika silnika
              </h1>
            </div>
            <div v-if="q22 == false && q23 == null">
              <h1>
                5. Czy po przekręceniu stacyjki w pozycję zapłonu słychać pracę pompy
                paliwa?
              </h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="twentyThirdAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="twentyThirdAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q23 == false">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Awaria pompy paliwa
                <br />
                - Uszkodzony bezpiecznik <br />
              </h1>
            </div>
            <div v-if="q18 && q19 == null">
              <h1>5. Czy drgania występują powyżej określonej prędkości?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="nineteenthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="nineteenthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q19 && q19 !== null">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Żle wyważone koła
                <br />
                - Skrzywione felgi
              </h1>
            </div>
            <div v-if="q19 == false && q19 !== null">
              <h1>
                Jeśli drgania występują podczas hamowania, prawdopodobne usterki to:<br /><br />
                - Wysokie zużycie elementów układu hamulcowego
                <br />
                - Nieprawidłowa geometria kół<br />
                - Nieprawidłowy montaż tarczy hamulcowej <br />
                - Uszkodzone łożysko piasty koła <br />
                - Nierównomierne zużycie tarcz hamulcowych
              </h1>
            </div>
            <div v-if="q14 == false && q15 == null">
              <h1>5. Czy jest to metaliczny dźwięk?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="fifteenthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="fifteenthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q15 && q15 !== null">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Awaria pompy wody
                <br />
                - Uszkodzenie uszczelnienia wałka pompy wody
                <br />
                - Awaria łożyska pompy wody<br />
                - Awaria łańcucha rozrządu<br />
                - Duże zużycie panewek <br />
                - Duże zużycie prowadnic zaworowych
              </h1>
            </div>
            <div v-if="q10 == false && q11 == null">
              <h1>5. Czy wyświetlany jest błąd niskiego poziomu oleju?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="eleventhAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="eleventhAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q11 && q11 !== null">
              <h1>
                <h1>
                  Prawdopodobne usterki:<br /><br />
                  - Niski poziom oleju
                  <br />
                  - Awaria czujnika ciśnienia oleju<br />
                  - Awaria przewodu sygnałowego <br />
                  - Zapchany wlot oleju do pompy <br />
                  - Zapchany/uszkodzony filtr oleju
                </h1>
              </h1>
            </div>
            <div v-if="q4 == false && q5 == null">
              <h1>5. Czy samochód podczas jazdy stracił moc?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="fifthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="fifthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q5 && q5 !== null">
              <h1>
                W takim przypadku liczba możliwych usterek jest zbyt duża. Zapraszamy na
                wizytę w celu diagnostyki komputerowej
              </h1>
            </div>
            <div v-if="q23 && q24 == null">
              <h1>6. Czy przy próbie odpalenia samochodu drga wskazówka obrotomierza?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="twentyFourthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="twentyFourthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q24 && q24 !== null">
              <h1>
                W takim przypadku liczba możliwych usterek jest zbyt duża. Zapraszamy na
                wizytę w celu diagnostyki komputerowej
              </h1>
            </div>
            <div v-if="q24 == false && q24 !== null">
              <h1>
                Prawdopodobna usterka:<br /><br />
                - Awaria czujnika położenia wału
              </h1>
            </div>
            <div v-if="q11 == false && q12 == null">
              <h1>
                6. Czy wyświetlany jest błąd wysokiej temperatury płynu chłodniczego?
              </h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="twelfthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="twelfthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q12 && q12 !== null">
              <h1>
                <h1>
                  Prawdopodobne usterki:<br /><br />
                  - Niski poziom płynu chłodniczego
                  <br />
                  - Wyciek z układu chłodniczego<br />
                  - Awaria termostatu <br />
                  - Awaria elektroniki <br />
                  - Uszkodzona uszczelka pod głowicą
                </h1>
              </h1>
            </div>
            <div v-if="q12 == false && q12 !== null">
              <h1>
                <h1>
                  Jeśli wyświetlany jest błąd wspomagania kierownicy prawdopodobne usterki
                  to:<br /><br />
                  - Awaria bezpiecznika<br />
                  - Awaria pompy wspomagania<br />
                  - Awaria elektroniki <br />
                </h1>
              </h1>
            </div>
            <div v-if="q15 == false && q16 == null">
              <h1>6. Czy jest to szum?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="sixteenthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="sixteenthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q16 == false">
              <h1>
                <h1>
                  Jeśli spod maski dochodzi dźwięk stukania prawdopodobne usterki to:<br /><br />
                  - Awaria popychaczy hydraulicznych<br />
                  - Uszkodzony wałek rozrządu<br />
                  - Uszkodzenie panewek <br />
                  - Uszkodzenie sworzni tłokowych <br />
                  - Awaria rozrządu
                </h1>
              </h1>
            </div>
            <div v-if="q5 == false && q6 == null">
              <h1>6. Czy samochód poszarpuje podczas jazdy lub na biegu jałowym?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="sixthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="sixthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q6 && q6 !== null">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Uszkodzone wtryskiwacze lub pompowtryskiwacze
                <br />
                - Uszkodzona listwa wtryskiwaczy lub pompowtryskiwaczy <br />
                - Zapchany lub uszkodzony układ wydechowy
              </h1>
            </div>
            <div v-if="q6 == false && q7 == null">
              <h1>7. Czy z układu wydechowego wydobywa się dym?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="seventhAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="seventhAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q16 && q17 == null">
              <h1>7. Czy dźwięk pochodzi z okolicy kół?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="seventeenthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="seventeenthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q17 && q17 !== null">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Wysokie zużycie lub uszkodzenie łożyska
                <br />
                - Wysokie zużycie uszczelek <br />
                Możliwe jest również szumienie opon, co nie powinno być powodem do obaw
              </h1>
            </div>
            <div v-if="q17 == false && q17 !== null">
              <h1>
                Jeśli szum wydobywa się spod maski prawdopodobne usterki to:<br /><br />
                - Uszkodzony lub stary pasek rozrządu
                <br />
                - Nieszczelność kolektora ssącego <br />
              </h1>
            </div>
            <div v-if="q7 && q8 == null">
              <h1>8. Czy dym jest koloru niebieskiego?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="eighthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="eighthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q8 && q8 !== null">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Wysokie zużycie silnika
                <br />
                - Wyciek oleju <br />
                - Uszkodzona turbina
              </h1>
            </div>
            <div v-if="q8 == false && q9 == null">
              <h1>9. Czy dym jest koloru białego?</h1>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh 1vh 0 auto"
                size="lg"
                @click="ninthAnswer(true)"
              >
                Tak
              </b-button>
              <b-button
                pill
                variant="light"
                style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
                size="lg"
                @click="ninthAnswer(false)"
              >
                Nie
              </b-button>
            </div>
            <div v-if="q9 && q9 !== null">
              <h1>
                Prawdopodobne usterki:<br /><br />
                - Pęknięta głowica
                <br />
                - Wyciek płynu chłodniczego <br />
                - Uszkodzona uszczelka pod głowicą
              </h1>
            </div>
            <div v-if="q9 == false && q9 !== null">
              <h1>
                Jeśli z twojego układu wydechowego wydobywa się czarny dym, prawdopodobne
                usterki to:<br /><br />
                - Uszkodzony układ wtryskowy
                <br />
                - Zapchany układ wydechowy <br />
                - Problem z mapą układu wtryskowego <br />
                - Uszkodzona turbina
              </h1>
            </div>
            <b-button
              pill
              variant="danger"
              style="padding: 1vh 5vh 1vh 5vh; margin: 3vh auto 0 1vh"
              size="lg"
              v-if="isStarted == true"
              @click="diagnosticReset()"
            >
              Zacznij od nowa
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import topNavbar from "../../components/Navbar/topNavbar.vue";
export default {
  data() {
    return {
      isStarted: false,
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
      q9: null,
      q10: null,
      q11: null,
      q12: null,
      q13: null,
      q14: null,
      q15: null,
      q16: null,
      q17: null,
      q18: null,
      q19: null,
      q20: null,
      q21: null,
      q22: null,
      q23: null,
      q24: null,
      q25: null,
      q26: null,
    };
  },
  computed: {
    ...mapGetters(["isAdmin", "isEmployee", "isUser", "isLogged"]),
  },
  components: {
    topNavbar,
  },
  methods: {
    diagnosticStart() {
      this.isStarted = true;
    },
    firstAnswer(answer) {
      if (answer === true) {
        this.q1 = true;
      } else {
        this.q1 = false;
      }
    },
    secondAnswer(answer) {
      if (answer === true) {
        this.q2 = true;
      } else {
        this.q2 = false;
      }
    },
    thirdAnswer(answer) {
      if (answer === true) {
        this.q3 = true;
      } else {
        this.q3 = false;
      }
    },
    fourthAnswer(answer) {
      if (answer === true) {
        this.q4 = true;
      } else {
        this.q4 = false;
      }
    },
    fifthAnswer(answer) {
      if (answer === true) {
        this.q5 = true;
      } else {
        this.q5 = false;
      }
    },
    sixthAnswer(answer) {
      if (answer === true) {
        this.q6 = true;
      } else {
        this.q6 = false;
      }
    },
    seventhAnswer(answer) {
      if (answer === true) {
        this.q7 = true;
      } else {
        this.q7 = false;
      }
    },
    eighthAnswer(answer) {
      if (answer === true) {
        this.q8 = true;
      } else {
        this.q8 = false;
      }
    },
    ninthAnswer(answer) {
      if (answer === true) {
        this.q9 = true;
      } else {
        this.q9 = false;
      }
    },
    tenthAnswer(answer) {
      if (answer === true) {
        this.q10 = true;
      } else {
        this.q10 = false;
      }
    },
    eleventhAnswer(answer) {
      if (answer === true) {
        this.q11 = true;
      } else {
        this.q11 = false;
      }
    },
    twelfthAnswer(answer) {
      if (answer === true) {
        this.q12 = true;
      } else {
        this.q12 = false;
      }
    },
    thirteenthAnswer(answer) {
      if (answer === true) {
        this.q13 = true;
      } else {
        this.q13 = false;
      }
    },
    fourteenthAnswer(answer) {
      if (answer === true) {
        this.q14 = true;
      } else {
        this.q14 = false;
      }
    },
    fifteenthAnswer(answer) {
      if (answer === true) {
        this.q15 = true;
      } else {
        this.q15 = false;
      }
    },
    sixteenthAnswer(answer) {
      if (answer === true) {
        this.q16 = true;
      } else {
        this.q16 = false;
      }
    },
    seventeenthAnswer(answer) {
      if (answer === true) {
        this.q17 = true;
      } else {
        this.q17 = false;
      }
    },
    eighteenthAnswer(answer) {
      if (answer === true) {
        this.q18 = true;
      } else {
        this.q18 = false;
      }
    },
    nineteenthAnswer(answer) {
      if (answer === true) {
        this.q19 = true;
      } else {
        this.q19 = false;
      }
    },
    twentiethAnswer(answer) {
      if (answer === true) {
        this.q20 = true;
      } else {
        this.q20 = false;
      }
    },
    twentyFirstAnswer(answer) {
      if (answer === true) {
        this.q21 = true;
      } else {
        this.q21 = false;
      }
    },
    twentySecondAnswer(answer) {
      if (answer === true) {
        this.q22 = true;
      } else {
        this.q22 = false;
      }
    },
    twentyThirdAnswer(answer) {
      if (answer === true) {
        this.q23 = true;
      } else {
        this.q23 = false;
      }
    },
    twentyFourthAnswer(answer) {
      if (answer === true) {
        this.q24 = true;
      } else {
        this.q24 = false;
      }
    },
    twentyFifthAnswer(answer) {
      if (answer === true) {
        this.q25 = true;
      } else {
        this.q25 = false;
      }
    },
    twentySixthAnswer(answer) {
      if (answer === true) {
        this.q26 = true;
      } else {
        this.q26 = false;
      }
    },
    diagnosticReset() {
      this.q1 = null;
      this.q2 = null;
      this.q3 = null;
      this.q4 = null;
      this.q5 = null;
      this.q6 = null;
      this.q7 = null;
      this.q8 = null;
      this.q9 = null;
      this.q10 = null;
      this.q11 = null;
      this.q12 = null;
      this.q13 = null;
      this.q14 = null;
      this.q15 = null;
      this.q16 = null;
      this.q17 = null;
      this.q18 = null;
      this.q19 = null;
      this.q20 = null;
      this.q21 = null;
      this.q22 = null;
      this.q23 = null;
      this.q24 = null;
      this.q25 = null;
      this.q26 = null;
    },

    employeeChatObserver() {
      if (this.isEmployee) {
        this.connect();
        this.$chatHub.$on("push-notification", (userName, userLastname) => {
          alert(userName + " " + userLastname + " wysłał wiadomość");
        });
        console.log("Employee connected to hub");
      }
    },
  },
  mounted() {
    this.employeeChatObserver();
  },
};
</script>

<style scoped>
.nav {
  min-width: 100%;
}
* {
  padding: 0;
  margin: 0;
}
.qaCol {
  text-align: center;
  margin-top: 15vh;
}
.qaCol h1 {
  font-size: 3vh;
}
</style>
