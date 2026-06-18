import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SessionPage from "./components/session/SessionPage";
import SetupPage from "./pages/SetupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;