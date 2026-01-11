# [SmartMart]([URL do link](https://smart-mart-solutions.vercel.app/))

![Demonstração do Projeto](/smartmart.gif)

O **SmartMart** é um dashboard de gerenciamento de produtos e vendas, projetado para fornecer uma visão clara e detalhada sobre o desempenho do seu negócio. Com ele, você pode cadastrar produtos, importar dados em massa, visualizar vendas, lucros e muito mais.

## ❯ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
- **Estilização:**
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
- **Gerenciamento de Estado e Dados:**
  - [TanStack Query](https://tanstack.com/query/v5)
- **Tabelas e Gráficos:**
  - [TanStack Table](https://tanstack.com/table/v8)
  - [Recharts](https://recharts.org/)
- **Formulários:**
  - [React Hook Form](https://react-hook-form.com/)

---

## ❯ Funcionalidades

- **Dashboard:**
  - Gráficos de quantidade de vendas e lucro por mês.
  - Cards com o total de vendas, lucro total e o produto mais vendido.
  - Filtro de dados por categoria.
- **Produtos:**
  - Cadastro manual de novos produtos.
  - Exportação de produtos através de um arquivo CSV.
  - Listagem de produtos com informações de vendas e lucro.
- **Categorias:**
  - Cadastro de novas categorias.
  - Listagem de categorias existentes.
- **Vendas:**
  - Visualização detalhada de todas as vendas.

---

## ❯ Como Começar

Siga as instruções abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/smartmart.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd smartmart
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) (ou a porta informada no seu terminal) no seu navegador para ver a aplicação.

---

## ❯ Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
├── src
│   ├── api
│   ├── components
│   ├── config
│   ├── hooks
│   ├── layout
│   ├── lib
│   └── types
├── public
├── .gitignore
├── package.json
├── README.md
└── ...
```

- **`src/api`:** Funções de chamada à API para categorias, produtos e vendas.
- **`src/components`:** Componentes reutilizáveis como botões, modais e tabelas.
- **`src/config`:** Configurações do ambiente.
- **`src/hooks`:** Hooks customizados para buscar e gerenciar dados.
- **`src/layout`:** Componentes de página principais, como Dashboard, Produtos, Vendas e Categorias.
- **`src/lib`:** Funções utilitárias.
- **`src/types`:** Definições de tipos TypeScript.

---

## ❯ Licença

Este projeto está sob a licença MIT.
