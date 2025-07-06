import React, { useState } from "react";
import Header from "../components/Header";
import Chatbot from "./Chatbot";

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev); 
  };

  return (
    <div style={homeContainerStyles}>
      <Header />
      <div style={contentStyles}>
        <h2 style={{ color: "#fff", fontSize: "3em", marginBottom: "20px" }}>Welcome to Aruna Cardiac Care</h2>
        <p style={{ color: "#fff", fontSize: "1.5em", maxWidth: "600px", margin: "0 auto" }}>
          Your health, our priority. We specialize in providing the best cardiac care.
        </p>
      </div>
      <footer style={footerStyles}>
        <div style={footerContentStyles}>
          <p style={{ margin: 0, fontSize: "1.2em", color: "#ccc" }}>
            Aruna Cardiac Care is committed to providing exceptional care to our patients. Our team of experts specializes
            in treating heart diseases and conditions with the latest technology and compassionate care.
          </p>
          <p style={{ fontSize: "1em", color: "#bbb" }}>&copy; 2025 Aruna Cardiac Care. All rights reserved.</p>
        </div>

        {isChatbotOpen && (
          <div style={chatbotWindowStyles}>
            <Chatbot />
          </div>
        )}
      </footer>

      <div
        onClick={toggleChatbot}
        style={chatbotIconStyles}
      >
        🤖
      </div>
    </div>
  );
};

const homeContainerStyles = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundImage: "url('https://www.bhf.org.uk/-/media/news-images/2023/november/ai-heart-640x410.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
};

const contentStyles = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "40px",
  background: "rgba(0, 0, 0, 0.508)",
};

const footerStyles = {
  background: "rgb(19, 68, 117)",
  padding: "30px",
  color: "white",
  textAlign: "center",
  width: "100%",
  boxSizing: "border-box",
};

const footerContentStyles = {
  maxWidth: "800px",
  margin: "0 auto",
  lineHeight: "1.8",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const chatbotWindowStyles = {
  position: "fixed",
  bottom: 80,
  right: 20,
  width: "350px",
  height: "450px", 
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#fff",
  padding: 20,
  zIndex: 999,
  display: "flex",
  flexDirection: "column",
};

const chatbotIconStyles = {
  position: "fixed",
  bottom: 20,
  right: 20,
  backgroundColor: "#007BFF", 
  color: "#fff", 
  borderRadius: "50%",
  padding: "20px", 
  cursor: "pointer",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", 
  fontSize: "30px", 
  transition: "transform 0.3s ease, background-color 0.3s ease", 
  "&:hover": {
    transform: "scale(1.1)", 
    backgroundColor: "#0056b3", 
  },
};


export default Home;
