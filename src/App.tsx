import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import SILHouse from "./pages/SILHouse";
import ClientDetail from "./pages/ClientDetail";
import SchedulerRoster from "./pages/SchedulerRoster";
import VacantShifts from "./pages/VacantShifts";
import NotFound from "./pages/NotFound";
import SpotlightSearch from "@/components/SpotlightSearch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              {/* Header with sidebar trigger */}
              <header className="flex items-center h-14 px-4 border-b bg-background">
                <SidebarTrigger className="mr-4" />
                <div className="flex-1" />
                <SpotlightSearch />
              </header>
              
              {/* Main content */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/sil" element={<SILHouse />} />
                  <Route path="/client/:id" element={<ClientDetail />} />
                  <Route path="/scheduler" element={<Navigate to="/scheduler/roster" replace />} />
                  <Route path="/scheduler/roster" element={<SchedulerRoster />} />
                  <Route path="/scheduler/vacant-shifts" element={<VacantShifts />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
