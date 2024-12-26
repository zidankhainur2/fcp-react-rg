import { Link } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex as="nav" p="4" bg="blue.500" color="white" justify="space-between">
      <Link href="/" data-testid="home-page">
        <Text fontSize="xl" fontWeight="bold">
          Student Portal
        </Text>
      </Link>
      <Flex gap="4">
        <Link href="/student" data-testid="student-page">
          All Student
        </Link>
        <Link href="/add" data-testid="add-page">
          Add Student
        </Link>
      </Flex>
    </Flex>
  );
}

export default Navbar;
