// FeedScreen.tsx
import { useEffect, useState } from "react";
import { FeedPost } from "./FeedPost";
import { supabase } from "@/integrations/supabase/client";

// Available profile images
const profileImages = [
  "/src/assets/cat-profile-1.jpg",
  "/src/assets/dog-profile-1.jpg", 
  "/src/assets/rabbit-profile-1.jpg"
];

// Function to get a random profile image
const getRandomProfileImage = () => {
  return profileImages[Math.floor(Math.random() * profileImages.length)];
};

export function FeedScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cozy">
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center bg-gradient-warm bg-clip-text text-transparent">
            Critter Connect
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {loading ? (
          <p className="text-muted-foreground text-center">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground text-center">No posts yet. Be the first!</p>
        ) : (
          posts.map((post) => (
            <FeedPost
              key={post.id}
              id={post.id}
              profileImage={getRandomProfileImage()}
              username={post.username}
              postImage={post.media_url}
              caption={post.caption}
              likes={0}
              comments={0}
            />
          ))
        )}
      </div>
    </div>
  );
}
