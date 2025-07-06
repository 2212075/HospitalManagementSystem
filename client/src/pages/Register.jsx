import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Register = () => {
  const [formData, setFormData] = useState({
    emailID: "",
    password: "",
    userType: "Patient",
    name: "",
    phoneNumber: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    chronicConditions: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    const errors = {};
    const today = new Date();

    // Email
    if (!/\S+@\S+\.\S+/.test(formData.emailID)) {
      errors.emailID = "Enter a valid email address.";
    }

    // Password
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Name
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    // Phone
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits.";
    }

    // Gender
    if (!formData.gender) {
      errors.gender = "Please select a gender.";
    }

    // Address
    if (!formData.address.trim()) {
      errors.address = "Address is required.";
    }

    // DOB
    const dob = new Date(formData.dateOfBirth);
    if (!formData.dateOfBirth || dob >= today) {
      errors.dateOfBirth = "Please select a valid date of birth.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.registerBox}>
          <h2 style={styles.heading}>Register</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="email" name="emailID" placeholder="Email" onChange={handleChange} style={styles.input} />
            {formErrors.emailID && <span style={styles.error}>{formErrors.emailID}</span>}

            <input type="password" name="password" placeholder="Password" onChange={handleChange} style={styles.input} />
            {formErrors.password && <span style={styles.error}>{formErrors.password}</span>}

            <select name="userType" onChange={handleChange} disabled style={styles.input}>
              <option value="Patient">Patient</option>
            </select>

            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />
            {formErrors.name && <span style={styles.error}>{formErrors.name}</span>}

            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} style={styles.input} />
            {formErrors.phoneNumber && <span style={styles.error}>{formErrors.phoneNumber}</span>}

            <select name="gender" onChange={handleChange} style={styles.input}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.gender && <span style={styles.error}>{formErrors.gender}</span>}

            <input type="text" name="address" placeholder="Address" onChange={handleChange} style={styles.input} />
            {formErrors.address && <span style={styles.error}>{formErrors.address}</span>}

            <input type="date" name="dateOfBirth" onChange={handleChange} style={styles.input} />
            {formErrors.dateOfBirth && <span style={styles.error}>{formErrors.dateOfBirth}</span>}

            <input type="text" name="chronicConditions" placeholder="Chronic Conditions (Optional)" onChange={handleChange} style={styles.input} />

            <button type="submit" style={styles.button}>Register</button>
          </form>

          <p style={styles.loginText}>
            Already have an account?
            <span onClick={() => navigate("/login")} style={styles.loginLink}>Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  registerBox: {
    width: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
    textAlign: "left",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "rgb(19, 68, 117)",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  loginText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  loginLink: {
    marginLeft: "5px",
    color: "rgb(19, 68, 117)",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

export default Register;