import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import App from "./App"
import "./index.css"
import "./i18n"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { ProjectsPage } from "./pages/dashboard/ProjectsPage"
import { ArticlesPage } from "./pages/dashboard/ArticlesPage"
import { NewsletterPage } from "./pages/dashboard/NewsletterPage"
import { CircuitTracesDynamic } from "./components/CyberBackground"
import BackToTopButton from "./components/ui/BackToTopButton"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CircuitTracesDynamic />
      <BackToTopButton />
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="projects" replace />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="newsletter" element={<NewsletterPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
)
