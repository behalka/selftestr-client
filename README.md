# selftestr-web client

## .env

Několik env proměnných je nutných pro běh aplikace. Příklad `.env` souboru:

``` bash
  # API_HOST=http://selftester-api.herokuapp.com
  API_HOST=http://localhost:3000
  NODE_ENV=development
  PORT=3003
  HOST=localhost
```

Jak pustit aplikaci lokálně:

``` bash
  $ npm install
  $ npm run dev
```

Aplikace potřebuje být napojena na API. To se dá pustit taky lokálně, nebo použít to, co běží na Heroku.
