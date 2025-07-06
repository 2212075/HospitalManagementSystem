import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/patient/doctors1", {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          setError(errorMessage || "Failed to fetch doctors.");
          return;
        }

        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        setError("Something went wrong while fetching doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewSlots = (doctorID) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
        navigate("/available-slots/${doctor.userID}");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}></div>
      <Header />
      <div style={styles.mainContainer}>
        {isLoggedIn && <Sidebar />}
        <div style={styles.contentContainer}>
          <h2 style={styles.title}>Available Doctors</h2>

          {loading && <p style={styles.loading}>Loading...</p>}
          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.gridContainer}>
            {doctors.map((doctor) => (
              <div key={doctor.userID} style={styles.card}>
                <img
                  src={doctor.photoURL || "https://via.placeholder.com/100"}
                  alt={doctor.name}
                  style={styles.image}
                />
                <h3 style={styles.name}>{doctor.name}</h3>
                <p><strong>Specialty:</strong> {doctor.speciality}</p>
                <p><strong>Email:</strong> {doctor.emailID}</p>
                <p><strong>Phone:</strong> {doctor.phoneNumber || "N/A"}</p>
                <button
                  onClick={() => handleViewSlots(doctor.userID)}
                  style={styles.button}
                >
                  View Available Slots
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    position: "relative",
    minHeight: "100vh",
    backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    flexDirection: "column",
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    position: "relative",
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    marginTop: "30px",
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  loading: {
    textAlign: "center",
    color: "blue",
    fontSize: "18px",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: "18px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "3px solid #007BFF",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Doctors;
