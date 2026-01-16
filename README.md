# Duck Drive - En lokal selfhosting filhanterare byggd i Angular

En liten och vänlig demo för att ladda upp, ladda ner och radera filer mot en lokal Node-server, med fokus på att lära oss ramverket Angular och skapa utifrån dess arbetsflöde.

## Huvudfunktioner
- Drag & drop för uppladdning: Dra en fil över `mainview` för att ladda upp.
- Visning av filer: Lista med namn, ägare, datum och storlek.
- Ladda ner: Klicka för att ladda ner en fil från servern.
- Radera: Ta bort filer från både UI och server.
- Proxy routing: Dev-servern proxar API-anrop till den lokala Node-servern.
- Lokalt uppladdningslager: Filer sparas i `server/uploads/`.

## Kör lokalt
1. Starta backend (i `server/`):
   - `cd server`
   - `npm install`
   - `npm run dev` (eller `npm start` beroende på skriptet)

2. Starta frontend (i `client/`):
   - `cd client`
   - `npm install`
   - `npm start` (kör Angular dev-server med `proxy.conf.json`)

3. Öppna appen i webbläsaren:
   - `http://localhost:4200`

## Anteckningar
- Proxy-configen (`client/proxy.conf.json`) skickar API-anrop till Node-servern så CORS hanteras enkelt under utveckling.
- Uppladdningar sparas i `server/uploads/`.
- Drag-overlay visar visuellt när en fil dras över `mainview`. UI stänger overlay vid drop eller när musen lämnar området.

Tack — hoppas detta hjälper dig att komma igång!
