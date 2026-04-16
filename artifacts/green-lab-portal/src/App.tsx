import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ServiceDetail from "@/pages/service-detail";
import Dashboard from "@/pages/dashboard";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Credentials from "@/pages/credentials";
import Equipment from "@/pages/equipment";
import Services from "@/pages/services";
import Login from "@/pages/login";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  const { isLoggedIn } = useAuth();

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/services/:id" component={ServiceDetail} />

            {/* <Route path="/dashboard">
              {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
            </Route> */}
            <Route path="/contact" component={Contact} />
            <Route path="/credentials" component={Credentials} />
            <Route path="/equipment" component={Equipment} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="green-lab-theme">
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
