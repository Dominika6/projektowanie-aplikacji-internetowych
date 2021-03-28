## Aplikacja obsługująca wypożyczalnię samochodów.

Funkcjonalności:

    • user i admin:
        ◦ logowanie
        ◦ wylogowywanie

    • user
        ◦ rejestracja
        ◦ rezerwacja (wyświetlanie dostępnych aut z ceną za okres i za dzień)
        ◦ modyfikacja rezerwacji
        ◦ anulowanie rezerwacji

    • admin
        ◦ potwierdzenie rezerwacji
        ◦ modyfikacja rezerwacji
        ◦ usuwanie rezerwacji


Baza Danych:

    • users ( userId, username, surname, email, password, role )
    • cars ( carId, carName, status, price, specifications )
    • rents ( rentId, userId, carId, fullPrice, rentFrom, rentTo )

Routes: 

    •users:

        ◦ /registration [ rejestracja ]
        ◦ /login [ logowanie ]
        ◦ /logout [ wylogowanie ]
        ◦ /myAccount [ dane zalogowanego użytkownika ]


    •cars:

        ◦ /addCar [ dodawanie samochodu do bazy ]
        ◦ /availableCarList [ lista dostępnych samochodów w wybranym terminie ]
        ◦ /carSpecifications/id	[ prezentacja ceny za dany okres czasu ]


    •rents:

        ◦ /rent [ tworzenie rezerwacji ] -> problem ze sprawdzaniem czy żądani user i car istnieją

        jeszcze nie zrobione:

        ◦ /reservationsList [ lista zarezerwowanych samochodów ]
        ◦ /modifyRents/id [ modyfikacja danej rezerwacji ]
        ◦ /cancelRents/id [ anulowanie danej rezerwacji ]
        ◦ /manage/id [ lista rezerwacji – możliwość potwierdzenia, modyfikacji, usunięcia ]