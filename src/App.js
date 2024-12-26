import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Routes/Home";
import Student from "./Routes/Student";
import AddStudent from "./Routes/AddStudent";
import EditStudent from "./Routes/EditStudent";
import NotFound from "./Routes/NotFound";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<Student />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/student/:id" element={<EditStudent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
