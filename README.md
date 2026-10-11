# Ski Race Pals

Mobile web app for picking the top five in each alpine World Cup race. Women and men are separate. A skier in your five who finishes in the top five scores 1 point. The correct rank scores 3 instead.

## Setup

This project uses its own MariaDB on port 3307, so it stays separate from the Windows MariaDB service. The first time, create the data directory and the database:

```powershell
& "C:\Program Files\MariaDB 12.2\bin\mariadb-install-db.exe" --datadir="C:\dev\dev-ren\skiracepals\.mariadb"
npm run db
```

In another terminal, while that server is running:

```powershell
& "C:\Program Files\MariaDB 12.2\bin\mariadb.exe" --port=3307 -u root -e "source C:/dev/dev-ren/skiracepals/server/sql/setup-db.sql"
```

Copy `.env.example` to `.env` and set `JWT_SECRET` and `ADMIN_PASSWORD`. The administrator nickname is `ren`.

```powershell
npm install
npm run db
npm run dev
```

Open http://localhost:5173. On a phone on the same Wi-Fi, use this computer's address on port 5173. To use the Windows MariaDB service instead, run `setup-db.sql` there as root and set `DB_PORT=3306` in `.env`.

Betting closes when the race date starts in Europe/Zurich. After the race, log in as `ren` and enter the official top five. The ranking lists every user who has placed a bet.
