import type { ActiveTab } from "@/types/activeTab";
import { useState } from "react";
import { Dashboard, Products, Sales, Categories, Header } from "@/layout";

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  function handleTabChange(tab: ActiveTab) {
    setActiveTab(tab);
  }

  return (
    <div className="bg-gray-50">
      <Header active={activeTab} onTabChange={handleTabChange} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "products" && <Products />}
        {activeTab === "sales" && <Sales />}
        {activeTab === "categories" && <Categories />}
      </main>
    </div>
  );
}

export default App;
