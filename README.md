<<<<<<< HEAD
# [SmartMart]([Link URL](https://smart-mart-solutions.vercel.app/))

This project was developed as a practical test for the full-stack development internship selection process at APOLLO SOLUTIONS. The goal is to provide an elegant and intuitive design for managing products, categories, and sales in a fictional retail system, SmartMart.
=======
# [SmartMart](https://smart-mart-solutions.vercel.app/)

![Demonstração do Projeto](https://raw.githubusercontent.com/SamuelOliveiraa/smartmart/refs/heads/main/public/smartmart.gif)
>>>>>>> 2cb1e58d4d9ec89459f72c132d68510ca5c93d06

![Project Demonstration](/smartmart.gif)

**SmartMart** is a product and sales management dashboard, designed to provide a clear and detailed overview of your business performance. With it, you can register products, import data in bulk, view sales, profits, and much more.

## ❯ Technologies Used

This project was built with the following technologies:

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
- **Styling:**
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
- **State and Data Management:**
  - [TanStack Query](https://tanstack.com/query/v5)
- **Tables and Charts:**
  - [TanStack Table](https://tanstack.com/table/v8)
  - [Recharts](https://recharts.org/)
- **Forms:**
  - [React Hook Form](https://react-hook-form.com/)

---

## ❯ Features

- **Dashboard:**
  - Graphs of sales quantity and profit per month.
  - Cards with total sales, total profit, and the best-selling product.
  - Data filtering by category.
- **Products:**
  - Manual registration of new products.
  - Export of products via a CSV file.
  - Product listing with sales and profit information.
- **Categories:**
  - Registration of new categories.
  - Listing of existing categories.
- **Sales:**
  - Detailed view of all sales.

---

## ❯ Getting Started

Follow the instructions below to run the project in your local environment.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/usuario/smartmart.git
   ```
2. Navigate to the project directory:
   ```bash
   cd smartmart
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port indicated in your terminal) in your browser to see the application.

---

## ❯ Project Structure

The project is organized as follows:

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

- **`src/api`:** API call functions for categories, products, and sales.
- **`src/components`:** Reusable components such as buttons, modals, and tables.
- **`src/config`:** Environment configurations.
- **`src/hooks`:** Custom hooks for fetching and managing data.
- **`src/layout`:** Main page components, such as Dashboard, Products, Sales, and Categories.
- **`src/lib`:** Utility functions.
- **`src/types`:** TypeScript type definitions.

---

## ❯ License

This project is licensed under the MIT License.
