import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";

const LandingPage = lazy(() => import("./components/LandingPage"));
const About = lazy(() => import("./components/About"));
const Treats = lazy(() => import("./components/Treats"));
const TreatDetails = lazy(() => import("./components/TreatDetails"));
const MarketBasket = lazy(() => import("./components/MarketBasket"));
const Favorites = lazy(() => import("./components/Favorites"));
const MealPlanner = lazy(() => import("./components/MealPlanner"));
const Community = lazy(() => import("./components/Community"));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8fbf1a]"></div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <Suspense fallback={<LoadingSpinner />}>
            <LandingPage />
          </Suspense>
        } />
        <Route path="about" element={
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        } />
        <Route path="treats" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Treats />
          </Suspense>
        } />
        <Route path="treats/:id" element={
          <Suspense fallback={<LoadingSpinner />}>
            <TreatDetails />
          </Suspense>
        } />
        <Route path="favorites" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Favorites />
          </Suspense>
        } />
        <Route path="planner" element={
          <Suspense fallback={<LoadingSpinner />}>
            <MealPlanner />
          </Suspense>
        } />
        <Route path="grocerylist" element={
          <Suspense fallback={<LoadingSpinner />}>
            <MarketBasket />
          </Suspense>
        } />
        <Route path="message" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Community />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
