# Admin Vibbidi

project vibbidi management

## Requirements

node `^5.0.0`
pm2 `3.2.3`

create file .env and copy content from .env.sample

## Installation

Build and start project

build by name of env "name env"= dev||stg||prod

```bash
npm install
npm run build-(name env)
pm2 start process_(name env).json
```

run in env dev

```bash
npm install
npm start
```
