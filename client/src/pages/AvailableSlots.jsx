import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header"; // Importing Header component
import Sidebar from "../components/Sidebar"; // Importing Sidebar component

const AvailableSlots = () => {
  const { doctorID } = useParams();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const patientID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchSlots = async () => {
      const token = localStorage.getItem("token");
      if (!patientID || !token) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/patient/${patientID}/doctor/${doctorID}/available-slots`,
          {
            method: "GET",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.clear();
            navigate("/login");
            return;
          }
          setError(data.error || "Error fetching slots");
        } else {
          setAvailableSlots(data.availableSlots || []);
        }
      } catch (error) {
        setError("Something went wrong while fetching slots.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [doctorID, navigate, patientID]);

  const bookAppointment = async (availabilityID) => {
    try {
      const response = await fetch("http://localhost:5000/patient/book_appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientID, availabilityID }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
        setAvailableSlots((prevSlots) =>
          prevSlots.filter((slot) => slot.availabilityID !== availabilityID)
        );
      } else {
        alert(data.error || "Failed to book appointment.");
      }
    } catch (error) {
      alert("Something went wrong while booking the appointment.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.contentContainer}>
        <Sidebar />
        <div style={styles.container}>
          <header style={styles.header}>Doctor's Available Slots</header>
          <button onClick={() => navigate(-1)} style={styles.backButton}>Back</button>

          {loading && <p style={styles.loading}>Loading...</p>}
          {error && <p style={styles.error}>{error}</p>}

          {availableSlots.length > 0 ? (
            <div style={styles.slotsContainer}>
              {availableSlots.map((slot) => (
                <div key={slot.availabilityID} style={styles.slotCard}>
                  <p>{slot.day_of_week} | {slot.start_time} - {slot.end_time}</p>
                  <button
                    onClick={() => bookAppointment(slot.availabilityID)}
                    style={styles.bookButton}
                  >
                    Book Slot
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No available slots found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  contentContainer: {
    display: "flex",
    flexGrow: 1,
  },
  container: {
    flex: 1,
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
  },
  header: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
  },
  loading: { textAlign: "center", color: "blue" },
  error: { textAlign: "center", color: "red" },
  backButton: {
    padding: "8px 12px",
    marginBottom: "10px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  slotsContainer: { marginTop: "10px" },
  slotCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  bookButton: {
    padding: "6px 10px",
    backgroundColor: "#28A745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AvailableSlots;
