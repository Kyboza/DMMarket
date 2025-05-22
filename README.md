## 🃏 Om Projektet

DMMARKET är en webbshop för samlarkort från serien Duel Masters.

### 🛍️ Funktionalitet

- Flera olika kortset att välja mellan
- Möjlighet att lägga till kort i en varukorg
- Checkout via Stripe för säker betalning
- Grundläggande kontosystem – skapa konto, logga in och återställa lösenord.
- Sökfunktion i realtid som filtrerar medan du skriver
- Visa starter decks direkt på hemsidan
- Små artiklar om kortlekar längst ned på sidan

### 🗂️ Teknisk Beskrivning

- Kortinformationen är lagrad i en JSON-fil.
- Inloggningssystemet använder AccessTokens och RefreshTokens.
- Användardata lagras i en MongoDB-databas.
- Även om en SQL-databas hade varit mer optimalt för vissa relationer, fungerar MongoDB bra tack vare möjligheten att koppla samman olika collections.
- Stripe används som betalningslösning för att hantera känslig information på ett säkert sätt.
- Verifikationskoder för reset av lösenord skickas genom "nodemailer"
- Responsivitet för användaren med Swal

# Testa Appen
Kör "npm install" först och sedan "npm start"

