import { createContext, useContext, useReducer, ReactNode } from "react";
import { Message } from "@/types/message";

// Declare types
type SendingState = boolean;
type SendingAction = { type: "SET_MESSAGE_SENDING" | "SET_MESSAGE_SENT" };
type SendingActionType = "SET_MESSAGE_SENDING" | "SET_MESSAGE_SENT";

type MessageState = Message[];
type MessageAction = { type: "SEND_MESSAGE"; payload: Message };
type MessageContextType = {
  messages: Message[];
  sendMessage: (msg: Message) => void;
};
type SendingContextType = {
  isSending: boolean;
  setSendingState: (action: SendingActionType) => void;
};

const MessageReducer = (state: MessageState, action: MessageAction) => {
  switch (action.type) {
    case "SEND_MESSAGE": {
      return [...state, action.payload];
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
};

const SendingReducer = (state: SendingState, action: SendingAction) => {
  switch (action.type) {
    case "SET_MESSAGE_SENDING": {
      return true;
    }
    case "SET_MESSAGE_SENT": {
      return false;
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
};

const initialMessageState: MessageState = [];
const initialSendState = false;

const MessageContext = createContext<MessageContextType | undefined>(undefined);
const SendingContext = createContext<SendingContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, messageDispatch] = useReducer(
    MessageReducer,
    initialMessageState
  );
  const [isSending, sendDispatch] = useReducer(
    SendingReducer,
    initialSendState
  );

  const sendMessage = (msg: Message) => {
    messageDispatch({ type: "SEND_MESSAGE", payload: msg });
  };

  const setSendingState = (action: SendingActionType) => {
    switch (action) {
      case "SET_MESSAGE_SENDING": {
        sendDispatch({ type: "SET_MESSAGE_SENDING" });
        break;
      }
      case "SET_MESSAGE_SENT": {
        sendDispatch({ type: "SET_MESSAGE_SENT" });
        break;
      }
      default: {
        throw new Error(`Unknown sending action: ${action}`);
      }
    }
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      <SendingContext.Provider value={{ isSending, setSendingState }}>
        {children}
      </SendingContext.Provider>
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const messages = useContext(MessageContext);
  const sendingContext = useContext(SendingContext);
  if (messages === undefined || sendingContext === undefined) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return { ...messages, ...sendingContext };
};
