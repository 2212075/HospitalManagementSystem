import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import AdminDashboard from "../src/pages/AdminDashboard";
import DoctorDashboard from "../src/pages/DoctorDashboard";
import PatientDashboard from "../src/pages/PatientDashboard";
import Home from "../src/pages/Home";
import AdminManageDoctors from "../src/pages/AdminManageDoctors";
import AdminSetSlots from "../src/pages/AdminSetSlots";
import DoctorPrescriptions from "../src/pages/DoctorPrescriptions";
import PatientBookAppointment from "../src/pages/BookAppointment";
import PatientPrescriptions from "../src/pages/PrescriptionPage";
import Doctors from "../src/pages/Doctors";
import Contacts from "../src/pages/Contact";
import AvailableSlots from "./pages/AvailableSlots";
import PatientProfile from "./pages/PatientProfile";
import LabRecords from "./pages/LabRecords";
import PatientAppointments from "./pages/PatientAppointments";
import AllDoctors from "./pages/AllDoctors";
import About from "./pages/About";
import Chatbot from "./pages/Chatbot";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<AllDoctors/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/admin/manage-doctors" element={<AdminManageDoctors />} />
        <Route path="/admin/set-slots" element={<AdminSetSlots />} />
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
        <Route path="/patient/book-appointment" element={<PatientBookAppointment />} />
        <Route path="/patient/view-prescriptions" element={<PatientPrescriptions />} />
        <Route path="/patient/doctors" element={<Doctors />} />
        <Route path="/contact" element={<Contacts/>}/>
        <Route path="/available-slots/:doctorID" element={<AvailableSlots />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/lab-reports" element={<LabRecords/>}/>
        <Route path="/patient/appointments" element={<PatientAppointments/>}/>
        <Route path="/chatbot" element={<Chatbot/>}/>
      </Routes>
  );
};

export default App;
