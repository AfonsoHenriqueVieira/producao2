# Controle de Produção

## Estrutura

- `public/index.html` — tela inicial
- `public/dashboard.html` — dashboard
- `public/producao.html` — lançamento de produção
- `public/ultimos.html` — iframe com os 12 últimos registros
- `public/relatorio/relatorio.html` — relatório completo
- `public/js/storage.js` — LocalStorage
- `public/js/api.js` — comunicação com a API
- `server/db.js` — conexão MySQL
- `server/server.js` — API Node/Express
- `server/schema.sql` — tabela MySQL

## Observação

O navegador NÃO deve conectar diretamente ao MySQL. O `db.js` fica no servidor e o navegador conversa com `server.js` por HTTP.

## Instalação

1. Instale Node.js.
2. Crie o banco executando `server/schema.sql` no MySQL.
3. Copie `.env.example` para `.env` e preencha as credenciais.
4. Execute:
   `npm install`
5. Depois:
   `npm start`
6. Abra:
   `http://localhost:3000`

O LocalStorage continua funcionando mesmo sem o MySQL. Quando a API estiver disponível, o lançamento também é enviado ao banco.
