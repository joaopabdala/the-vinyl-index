
# The Vinyl Index

**Autor:** João Paulo Abdala Bohaczk

**Descrição:** Gerencie coleções de discos de vinil.

**Link para a API em Produção:** [Acessar API](#) *(substituir pela URL real)*

---

## 🚀 Instruções de Execução

```bash
# Clonar repositório
git clone repository
cd the-vinyl-index

# Configuração do banco de dados
# Crie um arquivo .env na raiz com a variável:
DATABASE_URL="mysql://root:root@localhost:3306/my_db"

# Caso não tenha MySQL rodando, crie via Docker
docker run -d --name mysql-prisma \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=my_db \
  -p 3306:3306 \
  mysql:8

# Instalar dependências
npm i

# Rodar a aplicação
npm run start
```

A documentação Swagger estará disponível em:

[http://localhost:3000/api](http://localhost:3000/api)

---

## 🗂 Diagrama ERD

![Diagrama ERD](./mermaid_db.png)

---

## 📖 Checklist | Indicadores de Desempenho (ID) dos Resultados de Aprendizagem (RA)

### RA1 - Projetar e desenvolver uma API funcional utilizando NestJS

* ✅ ID1: Configuração correta do ambiente e criação da API modular.
* ✅ ID2: Boas práticas de organização da lógica de negócio (services separados de controllers).
* ✅ ID3: Uso correto de providers e injeção de dependência.
* ✅ ID4: Manipulação de rotas HTTP, parâmetros e body corretamente.
* ✅ ID5: Tratamento de erros com filtros globais e mensagens personalizadas.
* ✅ ID6: Uso de DTOs para validação e consistência de dados.
* ✅ ID7: Aplicação correta de pipes de validação no NestJS.

### RA2 - Implementar persistência de dados com banco relacional (Prisma ou TypeORM)

* ✅ ID8: Modelagem correta das entidades e ERD.
* ✅ ID9: Conexão da API com banco relacional.
* ✅ ID10: Aplicação de migrações para consistência de dados.
* ✅ ID11: Implementação de CRUD completo para pelo menos uma entidade.

### RA4 - Documentação da API e deploy

* ✅ ID14: Integração do Swagger com documentação completa.
* ✅ ID15: Deploy da API em nuvem (Render, Heroku, Vercel, etc.).
* ✅ ID16: API funcionando corretamente em produção.
* ⬜ ID17: Configuração de variáveis de ambiente usando ConfigModule.
* ✅ ID18: Versionamento de APIs REST implementado corretamente.

### RA5 - Autenticação, autorização e segurança

* ✅ ID19: Configuração de autenticação JWT.
* ✅ ID20: Controle de acesso baseado em roles via Guards.
* ✅ ID21: Uso de middleware para autenticação, logging ou CORS.
* ✅ ID22: Uso de interceptadores para logging e modificação de respostas.

