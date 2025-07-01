import { useState, useRef, useEffect } from "react";
import { SendHorizonal, X, MessageCircle, Trash2 } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your portfolio assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Added proper type

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/portfolio/chatBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { role: "assistant", content: "Hi! I'm your portfolio assistant. Ask me anything!" },
    ]);
  };

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center z-40 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 rounded-2xl shadow-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 z-50 overflow-hidden flex flex-col">
          {/* Chat header */}
          <div className="flex justify-between items-center p-3 bg-blue-500 text-white">
            <h3 className="font-medium">Portfolio Assistant</h3>
            <div className="flex space-x-2">
              <button
                onClick={clearChat}
                className="p-1 rounded-full hover:bg-blue-400 transition-colors"
                title="Clear chat"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-blue-400 transition-colors"
                title="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl text-sm whitespace-pre-wrap max-w-[85%] ${msg.role === "user"
                    ? "bg-blue-100 text-blue-900 ml-auto rounded-br-none"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                    }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="p-3 rounded-xl text-sm bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-bl-none w-[85%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 dark:border-zinc-700 p-3">
            <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-lg px-3">
              <input
                type="text"
                className="flex-1 py-2 bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="ml-2 p-1 text-blue-500 hover:text-blue-700 disabled:text-gray-400"
              >
                <SendHorizonal size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom scrollbar styles - moved to a style tag without jsx attribute */}
      <style>
        {`
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
          .dark .overflow-y-auto::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }
          .dark .overflow-y-auto::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
          }
          .dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `}
      </style>
    </>
  );
}