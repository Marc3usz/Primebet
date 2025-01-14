import React from "react";

interface TOSProps {
  onClose: () => void;
}

const TOS: React.FC<TOSProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-800 w-full max-w-2xl p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Regulamin</h2>
        <div className="overflow-y-auto max-h-[80vh] text-sm leading-6">
          <p>
            <strong>1. Postanowienia ogólne</strong>
          </p>
          <p className="mt-2">
            1.1. Niniejsze Warunki Korzystania (zwane dalej „TOS”) określają
            zasady korzystania z usług świadczonych przez PrimeBet (zwaną dalej
            „Stroną”), zajmującą się dostarczaniem usług bukmacherskich online.
          </p>
          <p className="mt-2">
            1.2. Korzystając z Strony, Użytkownik oświadcza, że zapoznał się z
            TOS, akceptuje je w całości oraz zobowiązuje się do ich
            przestrzegania.
          </p>
          <p className="mt-2">
            1.3. PrimeBet zastrzega sobie prawo do zmiany TOS w dowolnym
            momencie, a zmienione warunki będą publikowane na Stronie.
            Korzystanie ze Strony po wprowadzeniu zmian oznacza ich akceptację.
          </p>

          <p className="mt-4">
            <strong>2. Wymagania wiekowe i ograniczenia prawne</strong>
          </p>
          <p className="mt-2">
            2.1. Korzystanie z usług Strony jest dostępne wyłącznie dla osób,
            które ukończyły 18 lat lub osiągnęły wiek pełnoletności w kraju
            zamieszkania.
          </p>
          <p className="mt-2">
            2.2. Użytkownik jest odpowiedzialny za sprawdzenie, czy korzystanie
            z usług PrimeBet jest legalne w jego jurysdykcji.
          </p>

          <p className="mt-4">
            <strong>3. Rejestracja konta</strong>
          </p>
          <p className="mt-2">
            3.1. Aby korzystać z usług PrimeBet, Użytkownik musi zarejestrować
            konto, podając prawidłowe i zgodne z prawdą dane osobowe.
          </p>
          <p className="mt-2">
            3.2. Użytkownik zobowiązuje się do utrzymywania poufności danych
            logowania i nieudostępniania ich osobom trzecim. PrimeBet nie ponosi
            odpowiedzialności za szkody wynikłe z nieautoryzowanego dostępu do
            konta.
          </p>

          <p className="mt-4">
            <strong>4. Zakłady bukmacherskie</strong>
          </p>
          <p className="mt-2">
            4.1. PrimeBet oferuje zakłady bukmacherskie na różne wydarzenia
            sportowe i inne wydarzenia zgodne z ofertą Strony.
          </p>
          <p className="mt-2">
            4.2. PrimeBet zastrzega sobie prawo do anulowania zakładów w
            przypadku podejrzenia oszustwa, błędu technicznego lub naruszenia
            TOS.
          </p>
          <p className="mt-2">
            4.3. Wyniki zakładów oparte są na oficjalnych źródłach i są
            ostateczne.
          </p>

          <p className="mt-4">
            <strong>5. Wpłaty i wypłaty</strong>
          </p>
          <p className="mt-2">
            5.1. PrimeBet oferuje różne metody wpłat i wypłat, szczegółowo
            opisane w sekcji „Płatności” na Stronie.
          </p>
          <p className="mt-2">
            5.2. Użytkownik zobowiązuje się do korzystania wyłącznie z legalnych
            źródeł środków pieniężnych.
          </p>
          <p className="mt-2">
            5.3. Wypłaty środków są przetwarzane w ciągu maksymalnie 5 dni
            roboczych, pod warunkiem weryfikacji tożsamości Użytkownika.
          </p>

          <p className="mt-4">
            <strong>6. Odpowiedzialna gra</strong>
          </p>
          <p className="mt-2">
            6.1. PrimeBet promuje odpowiedzialną grę i oferuje narzędzia do
            zarządzania ryzykiem, takie jak limity wpłat, czasowe wykluczenie
            oraz pomoc w przypadku uzależnienia od hazardu.
          </p>
          <p className="mt-2">
            6.2. Użytkownik ponosi pełną odpowiedzialność za swoje działania na
            Stronie. PrimeBet nie ponosi odpowiedzialności za straty finansowe
            wynikające z nieodpowiedzialnej gry.
          </p>

          <p className="mt-4">
            <strong>7. Ograniczenia odpowiedzialności</strong>
          </p>
          <p className="mt-2">
            7.1. PrimeBet dokłada wszelkich starań, aby usługi były świadczone
            bez zakłóceń, jednak nie gwarantuje ich ciągłej dostępności i
            poprawności działania.
          </p>
          <p className="mt-2">
            7.2. PrimeBet nie ponosi odpowiedzialności za straty wynikłe z
            awarii technicznych, błędów w oprogramowaniu lub innych okoliczności
            niezależnych od Strony.
          </p>

          <p className="mt-4">
            <strong>8. Kontakt i wsparcie</strong>
          </p>
          <p className="mt-2">
            8.1. W przypadku pytań lub problemów Użytkownik może skontaktować
            się z działem obsługi klienta za pośrednictwem adresu e-mail:
            support@primebet.com lub czatu dostępnego na Stronie.
          </p>

          <p className="mt-4">
            <strong>9. Prawo właściwe</strong>
          </p>
          <p className="mt-2">
            9.1. Niniejsze TOS podlegają przepisom prawa obowiązującego w
            jurysdykcji siedziby PrimeBet.
          </p>
          <p className="mt-2">
            9.2. Wszelkie spory wynikłe z TOS będą rozstrzygane przez sądy
            właściwe dla siedziby PrimeBet.
          </p>
        </div>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default TOS;