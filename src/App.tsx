import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Tags from "./pages/Tags";
import Posts from "./pages/Posts";
import Events from "./pages/Events";
import Directories from "./pages/Directories";
import Tools from "./pages/Tools";
import Courses from "./pages/Courses";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, checking } = useAuth();

  if (checking) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="*" element={<SignIn />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/events" element={<Events />} />
                <Route path="/directories" element={<Directories />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
