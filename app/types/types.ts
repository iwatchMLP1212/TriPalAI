export interface Message {
  content: string;
  outgoing: boolean;
}

export interface ParsedMessageServerResponse {
  response: {
    type: string;
    topic: string;
    answer: string;
    suggest: string[];
    error: string | null;
  };
}
