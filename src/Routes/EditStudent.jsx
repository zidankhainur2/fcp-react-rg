import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    profilePicture: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/student/${id}`);
        const data = await response.json();
        setStudent(data);
        setFormData({
          fullname: data.fullname,
          profilePicture: data.profilePicture,
          address: data.address,
          phoneNumber: data.phoneNumber,
          birthDate: data.birthDate,
          gender: data.gender,
          programStudy: data.programStudy,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facultyMap = {
      Ekonomi: "Fakultas Ekonomi",
      Manajemen: "Fakultas Ekonomi",
      Akuntansi: "Fakultas Ekonomi",
      "Administrasi Publik": "Fakultas Ilmu Sosial dan Politik",
      "Administrasi Bisnis": "Fakultas Ilmu Sosial dan Politik",
      "Hubungan Internasional": "Fakultas Ilmu Sosial dan Politik",
      "Teknik Sipil": "Fakultas Teknik",
      Arsitektur: "Fakultas Teknik",
      Matematika: "Fakultas Teknologi Informasi dan Sains",
      Fisika: "Fakultas Teknologi Informasi dan Sains",
      Informatika: "Fakultas Teknologi Informasi dan Sains",
    };

    const faculty = facultyMap[formData.programStudy] || "";

    const updatedStudent = {
      ...formData,
      faculty,
    };

    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });
      navigate("/student");
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Fullname</FormLabel>
          <Input
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            data-testid="name"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            data-testid="profilePicture"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            data-testid="address"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            data-testid="phoneNumber"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Birth Date</FormLabel>
          <Input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            data-testid="date"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            data-testid="gender"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Program Study</FormLabel>
          <Select
            name="programStudy"
            value={formData.programStudy}
            onChange={handleChange}
            data-testid="prody"
          >
            <option value="">Select Program Study</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Administrasi Publik">Administrasi Publik</option>
            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
            <option value="Hubungan Internasional">
              Hubungan Internasional
            </option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Informatika">Informatika</option>
          </Select>
        </FormControl>
        <Button type="submit" data-testid="edit-btn" colorScheme="blue">
          Edit Student
        </Button>
      </form>
    </Box>
  );
}

export default EditStudent;
