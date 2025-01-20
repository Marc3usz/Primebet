# Primebet
## UWAGA: TO NIE JEST STRONA OFERUJACA USLUGI BUCHMACHERSKIE JEST TO JEDYNIE MAKIETA BEZ FUNKCJONALNOSCI UDZIALU W GRACH HAZARDOWYCH ZA PIENIĄDZE BĄDŹ INNE ODPOWIEDNIKI JAKICHKOLWIEK WALUT

# Status strony:
[![Netlify Status](https://api.netlify.com/api/v1/badges/0ce349c8-e1d3-415b-b5d2-de241871402a/deploy-status)](https://app.netlify.com/sites/eclectic-fox-2e13d6/deploys)

# Uruchamianie
- odpal używając [netlify](https://eclectic-fox-2e13d6.netlify.app/) <br>
### lub:
- sklonuj repo (ma pan dostęp)
- wejdź w folder repo i potem w folder `primebet`
- odpal `npm install`
- przeklej zawartość pliku `.env` którą Marcel Panu wysłał
- potem `npm run dev`
   
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
- Hosting: Netlify