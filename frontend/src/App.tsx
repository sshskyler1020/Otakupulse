import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Anime from "./pages/Anime";
import Manga from "./pages/Manga";
import Games from "./pages/Games";
import Trophies from "./pages/Trophies";
import Library from "./pages/Library";
import Calendar from "./pages/Calendar";
import News from "./pages/News";
import Community from "./pages/Community";
import Marketplace from "./pages/Marketplace";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function withAuth(el: JSX.Element) {
  return <ProtectedRoute>{el}</ProtectedRoute>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={withAuth(<Dashboard />)} />
      <Route path="/anime" element={withAuth(<Anime />)} />
      <Route path="/manga" element={withAuth(<Manga />)} />
      <Route path="/games" element={withAuth(<Games />)} />
      <Route path="/trophies" element={withAuth(<Trophies />)} />
      <Route path="/library" element={withAuth(<Library />)} />
      <Route path="/calendar" element={withAuth(<Calendar />)} />
      <Route path="/news" element={withAuth(<News />)} />
      <Route path="/community" element={withAuth(<Community />)} />
      <Route path="/marketplace" element={withAuth(<Marketplace />)} />
      <Route path="/friends" element={withAuth(<Friends />)} />
      <Route path="/messages" element={withAuth(<Messages />)} />
      <Route path="/profile" element={withAuth(<Profile />)} />
      <Route path="/settings" element={withAuth(<Settings />)} />

      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
