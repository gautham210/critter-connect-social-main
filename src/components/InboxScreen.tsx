// src/components/InboxScreen.tsx
import { useNavigate } from "react-router-dom";

const mockChats = [
  { id: "dog", name: "Barky", lastMessage: "bow wow!", avatar: "/dog.png" },
  { id: "cat", name: "Meowzart", lastMessage: "meowww", avatar: "/cat.png" },
  { id: "cow", name: "MooMoo", lastMessage: "moooo", avatar: "/cow.png" },
  { id: "duck", name: "Quackie", lastMessage: "quack quack", avatar: "/duck.png" },
  { id: "lion", name: "Roary", lastMessage: "roaarrr", avatar: "/lion.png" },
  { id: "elephant", name: "Trunky", lastMessage: "phrrr!", avatar: "/elephant.png" },
];

export default function InboxScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-cozy">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center bg-gradient-warm bg-clip-text text-transparent">
            💬 Messages
          </h1>
        </div>
      </div>

      {/* Chat List */}
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <div className="space-y-4">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="flex items-center space-x-4 p-4 bg-card rounded-2xl shadow-cozy hover:shadow-float cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-paw flex items-center justify-center text-white text-xl font-bold">
                {chat.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-foreground">{chat.name}</p>
                <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
