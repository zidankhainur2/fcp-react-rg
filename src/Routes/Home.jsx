import { Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Box p="8" textAlign="center">
      <Button
        data-testid="student-btn"
        colorScheme="blue"
        onClick={() => navigate("/student")}
      >
        All Student
      </Button>
    </Box>
  );
}

export default Home;
