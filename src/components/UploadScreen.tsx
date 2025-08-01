import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const animalCaptions = [
  "meow meow purrr",
  "woof woof arf arf", 
  "squeak squeak nibble",
  "purr purr meow hiss",
  "bark arf grr woof",
  "munch munch hop hop",
  "hiss meow purr purr",
  "arf arf wag wag",
  "nibble hop squeak",
  "moo moo graze graze",
  "chirp chirp tweet",
  "oink oink snort",
];

interface UploadScreenProps {
  onBack: () => void;
}

export function UploadScreen({ onBack }: UploadScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const generateRandomCaption = () => {
    const randomCaption = animalCaptions[Math.floor(Math.random() * animalCaptions.length)];
    setCaption(randomCaption);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!selectedFile || !caption) return;
    
    setIsPosting(true);
    
    try {
      // Upload image to Supabase storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, selectedFile);
      
      if (uploadError) throw uploadError;
      
      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);
      
      // Insert post into database
      const { error: insertError } = await supabase
        .from('posts')
        .insert({
          username: 'Anonymous Critter',
          caption: caption,
          media_url: publicUrl,
          media_type: 'image',
          created_at: new Date().toISOString()
        });
      
      if (insertError) throw insertError;
      
      toast({
        title: "Posted! 🎉",
        description: "Your critter post has been shared with the pack!",
      });
      
      onBack();
    } catch (error) {
      console.error('Error posting:', error);
      toast({
        title: "Oops! 🐾",
        description: "Failed to share your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cozy">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-lg">
            ← 
          </Button>
          <h1 className="text-xl font-bold text-center">🐾 Share</h1>
          <div className="w-8" />
        </div>
      </div>
      
      {/* Upload Form */}
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <Card className="p-6 space-y-6 rounded-3xl shadow-cozy">
          {/* Image Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              📸 Pick Photo
            </label>
            
            {selectedImage ? (
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-soft">
                <img 
                  src={selectedImage} 
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/5] border-2 border-dashed border-border rounded-2xl flex items-center justify-center bg-muted">
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-2">📷</div>
                  <p>Tap to add photo</p>
                </div>
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border border-border rounded-2xl bg-background"
            />
          </div>
          
          {/* Caption */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                💭 Animal Words
              </label>
              <Button
                variant="cozy"
                size="sm"
                onClick={generateRandomCaption}
                className="text-xs"
              >
                🎲 Random
              </Button>
            </div>
            
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="meow meow purr..."
              className="w-full p-4 border border-border rounded-2xl bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
          
          {/* Post Button */}
          <Button
            variant="paw"
            size="lg"
            onClick={handlePost}
            disabled={!selectedImage || !caption || isPosting}
            className="w-full text-lg font-semibold"
          >
            {isPosting ? "🐾 Sharing..." : "🐾 Share with Pack"}
          </Button>
        </Card>
      </div>
    </div>
  );
}