import { Route, Routes } from "react-router-dom";
import { NavMenu } from "./components/nav-menu";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import { Membership } from "./pages/membership";
import { TermsAndConditions } from "./pages/tncs";
import { PrivacyPolicy } from "./pages/privacy-policy";
import { Booking } from "./pages/booking";
import { ZooTickets } from "./pages/zoo-tickets";
import { Footer } from "./components/footer";
import { Toaster } from "./components/ui/sonner";
import { HotelRooms } from "./pages/hotel-rooms";
import { InteractiveExperience } from "./pages/interactive-experience";
import { Articles } from "./pages/articles";
import {Article} from "./pages/article"
import { Quizzes } from "./pages/quizzes";

function App() {
  return (
    <div id="app-container">
      <NavMenu />
      {/* All the pages of the website go here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/tncs" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/booking/:type" element={<Booking />} />
        <Route path="/booking/zoo/tickets" element={<ZooTickets />} />
        <Route path="/booking/hotel/rooms" element={<HotelRooms />} />
        <Route
          path="/interactive-experience"
          element={<InteractiveExperience />}
        />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:articleId" element={<Article />} />
        <Route path="/quizzes" element={<Quizzes />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
