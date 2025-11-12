import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import App from "./App"
import "./index.css"
import "./i18n"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { ProjectsPage } from "./pages/dashboard/ProjectsPage"
import { ArticlesPage } from "./pages/dashboard/ArticlesPage"
import { NewsletterPage } from "./pages/dashboard/NewsletterPage"
import { CircuitTracesDynamic } from "./components/CyberBackground"
import BackToTopButton from "./components/ui/BackToTopButton"
import ArticlePage from "./pages/ArticlesViewerPage"
import Home from "./pages/Home"
import { ExperiencesPage } from "./pages/dashboard/ExperiencesPage"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CircuitTracesDynamic />
      <BackToTopButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
          <Route path="" element={<Home />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="projects" replace />} />
            <Route path="experience" element={<ExperiencesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="newsletter" element={<NewsletterPage />} />
          </Route>
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
