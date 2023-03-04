import CustomerList from "./components/CustomerList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  return (
      <BrowserRouter>
        <Container>
          <Routes>
            <Route index path="/" element={<CustomerList />} />
          </Routes>
        </Container>
      </BrowserRouter>
  );
}

export default App;