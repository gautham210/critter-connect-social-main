// FeedPost.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

interface FeedPostProps {
  id: string;
  profileImage: string;
  username: string;
  postImage: string;
  caption: string;
  likes: number;
  comments: number;
}

export function FeedPost({
  profileImage,
  username,
  postImage,
  caption,
  likes: initialLikes,
  comments,
}: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes || 0);
  const [imageError, setImageError] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-card rounded-3xl shadow-soft border border-border overflow-hidden mb-6">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-soft">
          {!imageError ? (
            <img
              src={profileImage}
              alt={username}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-paw flex items-center justify-center text-white text-sm font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="font-medium text-foreground">{username}</span>
      </div>

      {/* Post Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={postImage}
          alt="Animal post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actions and Caption */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLike}
            className="flex items-center gap-2 text-muted-foreground hover:text-paw p-2"
          >
            <Heart
              className={`w-5 h-5 ${
                liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }`}
            />
            <span className="text-sm font-medium">{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary p-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{comments}</span>
          </Button>
        </div>

        <p className="text-foreground font-medium">
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </p>
      </div>
    </div>
  );
}
