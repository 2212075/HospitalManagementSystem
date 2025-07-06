import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const patientID = localStorage.getItem("userID");

  useEffect(() => {
    if (patientID) {
      axios
        .get(`http://localhost:5000/patient/appointments/${patientID}`)
        .then((res) => {
          setAppointments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
          setError("Failed to fetch appointments.");
          setLoading(false);
        });
    }
  }, [patientID]);

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.mainContainer}>
        <Sidebar />
        <div style={styles.content}>
          <h3 style={styles.heading}>Appointment Details</h3>

          {loading ? (
            <p style={styles.loading}>Loading...</p>
          ) : error ? (
            <p style={styles.error}>{error}</p>
          ) : appointments.length === 0 ? (
            <p style={styles.noAppointments}>No appointments found.</p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Appointment ID</th>
                    <th style={styles.th}>Doctor Name</th>
                    <th style={styles.th}>Appointment Date</th>
                    <th style={styles.th}>Appointment Time</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => {
                    const formattedDate = new Date(appt.appointment_date).toLocaleDateString();
                    const formattedTime = appt.start_time
  ? new Date(`1970-01-01T${appt.start_time}Z`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  : "Time not available";
  console.log(appt);


                    return (
                      <tr key={appt.appointmentID} style={styles.tableRow}>
                        <td style={styles.td}>{appt.appointmentID}</td>
                        <td style={styles.td}>{appt.doctorName}</td>
                        <td style={styles.td}>{formattedDate}</td>
                        <td style={styles.td}>{formattedTime}</td>
                        <td style={styles.td}>
                          <span style={{ ...styles.statusBadge, backgroundColor: getStatusColor(appt.status) }}>
                            {appt.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#ffcc00";
    case "approved":
      return "#28a745";
    case "canceled":
      return "#dc3545";
    default:
      return "#6c757d";
  }
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
  },
  mainContainer: {
    display: "flex",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    margin: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  loading: {
    fontSize: "18px",
    textAlign: "center",
    color: "#666",
  },
  error: {
    fontSize: "18px",
    color: "red",
    textAlign: "center",
  },
  noAppointments: {
    fontSize: "18px",
    textAlign: "center",
    color: "#555",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "left",
    padding: "12px 15px",
  },
  td: {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    transition: "background 0.3s",
    height: "50px",
  },
  statusBadge: {
    padding: "5px 10px",
    borderRadius: "20px",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
    display: "inline-block",
  },
};

export default PatientAppointments;
