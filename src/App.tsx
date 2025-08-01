import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FeedScreen } from "./components/FeedScreen";
import { UploadScreen } from "./components/UploadScreen";
import InboxScreen from "./components/InboxScreen";
import ChatScreen from "./components/ChatScreen";
import { BottomNavigation } from "./components/BottomNavigation";

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentScreen = () => {
    if (location.pathname === '/') return 'feed';
    if (location.pathname === '/upload') return 'upload';
    if (location.pathname === '/inbox') return 'inbox';
    return 'feed';
  };
  
  const handleScreenChange = (screen: 'feed' | 'upload' | 'inbox') => {
    switch (screen) {
      case 'feed':
        navigate('/');
        break;
      case 'upload':
        navigate('/upload');
        break;
      case 'inbox':
        navigate('/inbox');
        break;
    }
  };

  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/" element={<FeedScreen />} />
        <Route path="/upload" element={<UploadScreen onBack={() => navigate('/')} />} />
        <Route path="/inbox" element={<InboxScreen />} />
        <Route path="/chat/:id" element={<ChatScreen />} />
      </Routes>
      
      {/* Only show bottom navigation on main screens */}
      {!location.pathname.startsWith('/chat/') && (
        <BottomNavigation 
          currentScreen={getCurrentScreen()} 
          onScreenChange={handleScreenChange} 
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
