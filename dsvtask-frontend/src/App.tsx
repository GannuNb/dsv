import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import UserList from "./pages/UserList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
