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
    <section className="min-h-screen text-white bg-[rgba(0,31,63,0.1)] px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 mt-16 sm:mt-20">
      <GlassCard className="w-full max-w-2xl sm:max-w-3xl md:max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
        
        <Tabs value={activeTabValue} className="mb-8 sm:mb-10 md:mb-12">
          <TabsList className="mx-auto w-fit gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center">
            {tabs.map(({ to, label }) => (
              
              <TabsTrigger 
                key={to} 
                value={to} 
                asChild 
                className="text-xs sm:text-sm md:text-base"
              >
                <NavLink 
                    to={to} 
                    className="flex-1 min-w-max sm:w-auto h-full flex items-center justify-center px-2 sm:px-4" 
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