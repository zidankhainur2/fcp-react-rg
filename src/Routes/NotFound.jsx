import { Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" p="8">
      <h1>404 | Not Found</h1>
      <Button
        data-testid="back"
        onClick={() => navigate(-1)}
        colorScheme="blue"
      >
        Go Back
      </Button>
    </Box>
  );
}

export default NotFound;
