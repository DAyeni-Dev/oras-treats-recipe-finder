import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Treats from "./components/Treats";
import TreatDetails from "./components/TreatDetails";
import MarketBasket from "./components/MarketBasket";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<About />} />
        <Route path="treats" element={<Treats />} />
        <Route path="treats/:id" element={<TreatDetails />} />
        <Route path="grocerylist" element={<MarketBasket />} />
      </Route>
    </Routes>
  );
}

export default App;
