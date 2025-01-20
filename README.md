# Primebet
## UWAGA: TO NIE JEST STRONA OFERUJACA USLUGI BUCHMACHERSKIE JEST TO JEDYNIE MAKIETA BEZ FUNKCJONALNOSCI UDZIALU W GRACH HAZARDOWYCH ZA PIENIĄDZE BĄDŹ INNE ODPOWIEDNIKI JAKICHKOLWIEK WALUT

# Uruchamianie
1) Poproś Marcela / Maksa o klucze do firebase (inaczej nie pojdzie) ((Marcel Panu raczej wysłał klucze dostępu na discordzie))
2) Pobierz repo z githuba używając clone. Wersja zawsze jest aktualna bo pushowaliśmy wyłącznie do mastera 😊
3) Przejdź w folder, i wykonaj `npm install`
4) Pozniej, ponownie przejdz do folderu `primebet` komendą `cd ./primebet` zawartego w folderze repo
5) Wykonaj komende `npm run dev`
6) wpisz w terminalu `o + enter` lub przejdź do `https://localhost:5137`
   
# Użytkowanie
1) Załóż konto używając zakladki `log in`, gdzie przejdziesz do funkcji `register`
2) Po założeniu, będziesz przekierowany do głównego ekranu, gdzie widać statystyki konta (pobierane z Firebase'a)
3) Po lewej, znajduje się mały dzyndzel, który otwiera pasek boczny. Nacisnij go i nacisnij `Recommended`
4) W stronie rekomendowanych zakładów, możesz zbudować swój betslip. Potem, za kredyty przydzielane do konta przy tworzeniu, możesz kupić swój zakład
5) Zakład będzie wyświetlony w zakładce `my bets`, do której możesz przejść paskiem nawigacyjnym
6) Tam będziesz mógł zobaczyć aktywne zakłady, pregrane zakłady i wygrane zakłady
7) Potem, można przejść do strony głównej poprzez naciśnięcie loga, gdzie wyświetlą się statystyki dot. wygranych, przegranych, sumy obstawionych zakładów itp.
8) Wylogowanie z konta poprzez przycisk na pasku nawigacji
9) Zapomniane hasło można zresetować poprzez opcje `reset password` przy logowaniu

# Technologie
- Firebase (jest mocny)
- Lottie (fajne animacje, też mocne)
- react-router-dom (router)
- Zustand (state manager, nie potrzeba było redux)
- React (lol)
- TailwindCSS (stylizacja)
- Vite (też lol)
- Backend: Firebase Cloud Functions (link do repo: [Primebet-Firebase](https://github.com/Marc3usz/Primebet-Firebase/tree/master), ma pan dostęp)
- API: [the odds api](https://the-odds-api.com/)