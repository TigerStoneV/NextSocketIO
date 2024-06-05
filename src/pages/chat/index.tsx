import styled from "styled-components";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSocket } from "@/components/socket-provider";

interface message {
  userId: number;
  content: string;
}
const ChatContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  width: 300px;
  margin: auto;
`;

const MessageContainer = styled.div`
  padding: 1rem;
`;

const MessageBubble = styled.div<{ isCurrentUser: boolean }>`
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  ${({ isCurrentUser }) =>
    isCurrentUser
      ? "margin-left: auto; background-color: #2196F3; color: #fff;"
      : "background-color: #f0f0f0;"}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const InputField = styled.input`
  flex: 1;
  height: 2rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;

const SendButton = styled.button`
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
const ChatPage = () => {
  const [messages, setMessages] = useState<message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, isConnected } = useSocket();
  const [userId, setUserId] = useState(+new Date());

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (data: any) => {
      setMessages((messages) => [...messages, ...[data]]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.post("/api/chat", {
      userId: userId,
      content: currentMessage,
    });
    setCurrentMessage("");
  };

  return (
    <ChatContainer>
      <div>
        <p>{isConnected ? "연결 완료" : "연결중"}</p>
      </div>
      <MessageContainer>
        {messages.map((message, index) => (
          <MessageBubble key={index} isCurrentUser={message.userId === userId}>
            {message.content}
          </MessageBubble>
        ))}
      </MessageContainer>
      <InputContainer>
        <form style={{ flex: "1" }}>
          <InputField
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="메시지 입력"
          />
          <SendButton type="submit" onClick={(e) => sendMessage(e)}>
            전송
          </SendButton>
        </form>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPage;
