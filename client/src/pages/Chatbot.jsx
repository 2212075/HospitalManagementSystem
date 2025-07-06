import React, { useState } from "react";
import chatbotData from "./chatbotData";
import Fuse from "fuse.js";

const fuse = new Fuse(chatbotData, {
  keys: ['question'],
  threshold: 0.4, 
});

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    const input = userInput.trim();
    const result = fuse.search(input);

    const botReply = result.length > 0
      ? result[0].item.answer
      : "Sorry, I don't understand that.";

    setChat([
      ...chat,
      { type: "user", text: userInput },
      { type: "bot", text: botReply },
    ]);

    setUserInput("");
  };

  return (
    <div style={chatbotWindowStyles}>
      <div style={headerStyles}>
        <h3>🤖 Chatbot</h3>
      </div>
      <div style={chatAreaStyles}>
        {chat.map((msg, index) => (
          <div key={index} style={msg.type === "user" ? userMessageStyles : botMessageStyles}>
            <p><strong>{msg.type === "user" ? "You" : "Bot"}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <div style={inputAreaStyles}>
        <input
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask a question..."
          style={inputStyles}
        />
        <button onClick={handleSend} style={sendButtonStyles}>Send</button>
      </div>
    </div>
  );
};

const chatbotWindowStyles = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const headerStyles = {
  backgroundColor: "rgb(19, 68, 117)",
  color: "#fff",
  padding: "10px",
  borderRadius: "10px 10px 0 0",
  textAlign: "center",
};

const chatAreaStyles = {
  flex: 1,
  overflowY: "auto",
  padding: "10px",
  backgroundColor: "#f1f1f1",
  borderRadius: "0 0 10px 10px",
  marginBottom: "10px",
};

const userMessageStyles = {
  textAlign: "right",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "rgb(19, 68, 117)",
  borderRadius: "20px",
  maxWidth: "80%",
  marginLeft: "auto",
};

const botMessageStyles = {
  textAlign: "left",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "rgb(19, 68, 117)",
  borderRadius: "20px",
  maxWidth: "80%",
  marginRight: "auto",
};

const inputAreaStyles = {
  display: "flex",
  padding: "10px",
  borderTop: "1px solid #ccc",
};

const inputStyles = {
  width: "80%",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const sendButtonStyles = {
  padding: "8px 15px",
  backgroundColor: "rgb(19, 68, 117)",
  color: "white",
  borderRadius: "5px",
  border: "none",
  marginLeft: "10px",
  cursor: "pointer",
};

export default Chatbot;
