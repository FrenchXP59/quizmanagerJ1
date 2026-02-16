import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Diagnostic from "./pages/Diagnostic";
import Analysis from "./pages/Analysis";
import Challenges from "./pages/Challenges";
import Progression from "./pages/Progression";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/progression" element={<Progression />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
