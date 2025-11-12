// src/pages/dashboard/DashboardLayout.tsx
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { GlassCard } from "../components/GlassCard"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useEffect } from "react";

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userExists = localStorage.getItem("authToken");

   useEffect(() => {
    if (!userExists ) {
      navigate("/");
    }
  }, [])

  const pathSegments = location.pathname.split('/');
  const activeTabValue = pathSegments[pathSegments.length - 1];

  const tabs = [
    { to: "experience", label: "Experience" },
    { to: "projects", label: "Projects" },
    { to: "articles", label: "Blog" },
    { to: "newsletter", label: "Newsletter" },
  ];

  return (
    <section className="min-h-screen text-white bg-[rgba(0,31,63,0.1)] px-6 py-10 mt-20">
      <GlassCard className="max-w-5xl mx-auto p-6">
        
        <Tabs value={activeTabValue} className="mb-10">
          <TabsList className="mx-auto w-fit gap-4">
            {tabs.map(({ to, label }) => (
              
              <TabsTrigger 
                key={to} 
                value={to} 
                asChild 
              >
                <NavLink 
                    to={to} 
                    className="flex-1 w-full h-full flex items-center justify-center" 
                >
                    {label}
                </NavLink>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Outlet />
      </GlassCard>
    </section>
  )
}