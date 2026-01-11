import type { ActiveTab } from "@/types/activeTab";
import { useState } from "react";
import { Dashboard, Products, Sales, Categories, Header } from "@/layout";
import { Toaster } from "react-hot-toast";
import { CircleCheckBig, CircleX, MessageSquareWarning } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  function handleTabChange(tab: ActiveTab) {
    setActiveTab(tab);
  }

  return (
    <div className="bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff"
          },
          success: {
            style: {
              background: "#508B26",
              color: "#fff"
            },
            icon: <CircleCheckBig />
          },
          error: {
            style: {
              background: "#ff4d4f", // vermelho
              color: "#fff"
            },
            icon: <CircleX />
          },
          loading: {
            style: {
              background: "#ffc53d",
              color: "#fff"
            },
            icon: <MessageSquareWarning />
          },
          duration: 3000
        }}
      />
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
