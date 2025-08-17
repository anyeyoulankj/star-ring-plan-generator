import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import StarRingPlan from "@/pages/StarRingPlan";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { ConfigProvider } from '@/contexts/ConfigContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <ConfigProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/star-ring-plan" element={<StarRingPlan />} />
            <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
          </Routes>
        </div>
      </ConfigProvider>
    </AuthContext.Provider>
  );
}
