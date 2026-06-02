import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home
  from "./pages/Home";

import QuizEngine
  from "./pages/QuizEngine";

import Results
  from "./pages/Results";

// ✅ Importe la nouvelle page
import Leaderboard
  from "./pages/Leaderboard";

import ProtectedRoute
  from "./routes/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizEngine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resultats"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        {/* ✅ Nouvelle route leaderboard — publique, pas besoin de ProtectedRoute */}
        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;