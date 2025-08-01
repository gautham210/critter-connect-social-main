// ChatScreen.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const animalSounds: Record<string, string[]> = {
  dog: ["bow wow", "ruff!", "bark!", "grrr..."],
  cat: ["meow", "purrr", "mrrroww", "nya~"],
  cow: ["moo", "mmoooooo", "mmuuuhh", "mmmmm"],
  duck: ["quack", "quaaack", "kwaak", "waddle waddle"],
  lion: ["roarrr", "grrrr", "rawrrr", "RAHHH"],
  elephant: ["phrrr", "tooot", "brrrrr", "whoooom!"],
};

const animalNames: Record<string, string> = {
  dog: "Barky",
  cat: "Meowzart", 
  cow: "MooMoo",
  duck: "Quackie",
  lion: "Roary",
  elephant: "Trunky",
};

export default function ChatScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const messages = animalSounds[id || ""] || [];
  const animalName = animalNames[id || ""] || id?.toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-cozy">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/inbox')} className="text-lg">
            ← 
          </Button>
          <h1 className="text-xl font-bold text-center">{animalName}</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-card max-w-fit px-4 py-3 rounded-2xl shadow-soft"
            >
              <p className="text-foreground">{msg}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.floor(Math.random() * 59) + 1} min ago
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
