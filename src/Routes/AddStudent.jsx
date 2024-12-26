import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    profilePicture: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "Male",
    programStudy: "Ekonomi",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      faculty: determineFaculty(value),
    }));
  };

  const determineFaculty = (programStudy) => {
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        return "Fakultas Ekonomi";
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        return "Fakultas Ilmu Sosial dan Politik";
      case "Teknik Sipil":
      case "Arsitektur":
        return "Fakultas Teknik";
      case "Matematika":
      case "Fisika":
      case "Informatika":
        return "Fakultas Teknologi Informasi dan Sains";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/student");
      }
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="fullname">Fullname</FormLabel>
          <Input
            id="fullname"
            name="fullname"
            data-testid="name"
            value={formData.fullname}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
          <Input
            id="profilePicture"
            name="profilePicture"
            data-testid="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            id="address"
            name="address"
            data-testid="address"
            value={formData.address}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            data-testid="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
          <Input
            id="birthDate"
            name="birthDate"
            type="date"
            data-testid="date"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={(value) => setFormData({ ...formData, gender: value })}
          >
            <Stack direction="row">
              <Radio value="Male" data-testid="gender">
                Male
              </Radio>
              <Radio value="Female" data-testid="gender">
                Female
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="programStudy">Program Study</FormLabel>
          <Select
            id="programStudy"
            name="programStudy"
            data-testid="prody"
            value={formData.programStudy}
            onChange={handleChange}
          >
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

        <Button type="submit" data-testid="add-btn" colorScheme="blue" mt={4}>
          Add Student
        </Button>
      </form>
    </Box>
  );
}

export default AddStudent;
