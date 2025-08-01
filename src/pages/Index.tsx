import { useState } from "react";
import { FeedScreen } from "@/components/FeedScreen";
import { UploadScreen } from "@/components/UploadScreen";
import { InboxScreen } from "@/components/InboxScreen";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'feed' | 'upload' | 'inbox'>('feed');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'feed':
        return <FeedScreen />;
      case 'upload':
        return <UploadScreen onBack={() => setCurrentScreen('feed')} />;
      case 'inbox':
        return <InboxScreen onBack={() => setCurrentScreen('feed')} />;
      default:
        return <FeedScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
      <BottomNavigation 
        currentScreen={currentScreen} 
        onScreenChange={setCurrentScreen} 
      />
    </div>
  );
};

export default Index;
