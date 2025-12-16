import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AuthLayout from "./components/AuthLayout";
import DefaultLayout from "./components/DefaultLayout copy";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter basename="/Day_42_react/">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
