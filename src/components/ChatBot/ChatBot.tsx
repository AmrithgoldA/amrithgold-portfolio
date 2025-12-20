import { useState, useRef, useEffect } from "react";
import { SendHorizonal, X, MessageCircle, Trash2 } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your portfolio assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showClear, setShowClear] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const checkIfAtBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 50);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  useEffect(() => {
    scrollToBottom("auto");
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkIfAtBottom);
      return () => container.removeEventListener('scroll', checkIfAtBottom);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const cancelTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(false);
    setShowClear(true);
  };

  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    let displayedText = "";
    const words = text.split(' ');

    // Set timeout to cancel typing if it takes too long (8 seconds)
    typingTimeoutRef.current = setTimeout(() => {
      cancelTyping();
      setMessages(prev => [...prev.slice(0, -1), { role: "assistant", content: text }]);
      scrollToBottom();
    }, 8000);

    try {
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const baseDelay = 30 + Math.random() * 50;

        for (let j = 0; j <= word.length; j++) {
          await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 20));
          displayedText = words.slice(0, i).join(' ') + ' ' + word.substring(0, j);
          setMessages(prev => [...prev.slice(0, -1), { role: "assistant", content: displayedText }]);
          scrollToBottom();
        }

        if (/[.,!?]/.test(word)) {
          await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
        } else {
          await new Promise(resolve => setTimeout(resolve, baseDelay));
        }
      }
    } finally {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setIsTyping(false);
      setShowClear(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowClear(false);

    try {
      const res = await fetch("http://localhost:3001/portfolio/chatBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      await simulateTyping(data.reply);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
      setShowClear(true);
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
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[rgb(216,180,254)] hover:bg-[rgb(200,160,240)] text-[rgb(0,3,25)] shadow-lg flex items-center justify-center z-40 transition-all duration-300 hover:scale-110 ${isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
      >
        <MessageCircle size={24} />
      </button>

      <div
        className={`fixed bottom-6 right-6 w-80 h-[500px] rounded-2xl shadow-xl bg-[rgb(0,3,25)] border border-[rgb(216,180,254,0.2)] z-50 overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <div className="flex justify-between items-center p-3 bg-[rgb(216,180,254)] text-[rgb(0,3,25)]">
          <h3 className="font-medium">Portfolio Assistant</h3>
          <div className="flex space-x-2">
            {showClear && (
              <button
                onClick={clearChat}
                className="p-1 rounded-full hover:bg-[rgb(216,180,254,0.3)] transition-colors"
                title="Clear chat"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-[rgb(216,180,254,0.3)] transition-colors"
              title="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex-1 p-4 overflow-y-auto"
          style={{ maxHeight: '400px' }}
        >
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-sm whitespace-pre-wrap ${msg.role === "user"
                  ? "bg-[rgb(216,180,254,0.2)] text-[rgb(219,234,254)] ml-auto rounded-br-none w-fit max-w-[85%]"
                  : "bg-[rgb(216,180,254,0.1)] text-[rgb(216,180,254)] rounded-bl-none min-w-[120px] max-w-[85%]"
                  }`}
              >
                {msg.content}
                {msg.role === "assistant" && i === messages.length - 1 && isTyping && (
                  <span className="typing-cursor">|</span>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="p-3 rounded-xl text-sm bg-[rgb(216,180,254,0.1)] text-[rgb(216,180,254)] rounded-bl-none w-[60px]">
                <div className="flex space-x-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-[rgb(216,180,254)]"
                      style={{
                        animation: `wave 1.2s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                        opacity: 0.4
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-[rgb(216,180,254,0.2)] p-3">
          <div className="flex items-center bg-[rgb(216,180,254,0.1)] rounded-lg px-3">
            <input
              type="text"
              className="flex-1 py-2 bg-transparent focus:outline-none text-sm text-[rgb(219,234,254)] placeholder-[rgb(216,180,254,0.6)]"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || isTyping}
              className="ml-2 p-1 text-[rgb(216,180,254)] hover:text-[rgb(219,234,254)] disabled:text-[rgb(216,180,254,0.4)] disabled:cursor-not-allowed"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .overflow-y-auto::-webkit-scrollbar {
            width: 4px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: rgba(216, 180, 254, 0.05);
            border-radius: 2px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: rgba(216, 180, 254, 0.2);
            border-radius: 2px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(216, 180, 254, 0.3);
          }
          @keyframes wave {
            0%, 60%, 100% { 
              transform: translateY(0);
              opacity: 0.4;
            }
            30% { 
              transform: translateY(-5px);
              opacity: 1;
            }
          }
          .typing-cursor {
            display: inline-block;
            margin-left: 2px;
            animation: blink 0.7s infinite;
            color: rgb(216, 180, 254);
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}
      </style>
    </>
  );
}