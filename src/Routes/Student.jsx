import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";

function Student() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [facultyFilter, setFacultyFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3001/student");
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
      });
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
      setFilteredStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleFilterChange = (e) => {
    const selectedFaculty = e.target.value;
    setFacultyFilter(selectedFaculty);
    if (selectedFaculty === "All") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) => student.faculty === selectedFaculty)
      );
    }
  };

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <Box p={8}>
      <Select
        data-testid="filter"
        value={facultyFilter}
        onChange={handleFilterChange}
        mb={4}
        maxW="200px"
      >
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">
          Fakultas Ilmu Sosial dan Politik
        </option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">
          Fakultas Teknologi Informasi dan Sains
        </option>
      </Select>

      <Table id="table-student" variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Full Name</Th>
            <Th>Faculty</Th>
            <Th>Program Study</Th>
            <Th>Option</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredStudents.map((student, index) => (
            <Tr key={student.id} className="student-data-row">
              <Td>{index + 1}</Td>
              <Td>
                <Link
                  to={`/student/${student.id}`}
                  data-testid={`student-link-${student.id}`}
                >
                  {student.fullname}
                </Link>
              </Td>
              <Td>{student.faculty}</Td>
              <Td>{student.programStudy}</Td>
              <Td>
                <Button
                  data-testid={`delete-${student.id}`}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Student;
