import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  currentScreen: 'feed' | 'upload' | 'inbox';
  onScreenChange: (screen: 'feed' | 'upload' | 'inbox') => void;
}

export function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-cozy">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        <Button
          variant={currentScreen === 'feed' ? 'paw' : 'ghost'}
          size="paw"
          onClick={() => onScreenChange('feed')}
          className="flex flex-col items-center gap-1"
        >
          🏠
        </Button>
        
        <Button
          variant="float"
          size="float"
          onClick={() => onScreenChange('upload')}
          className="animate-float"
        >
          🐾
        </Button>
        
        <Button
          variant={currentScreen === 'inbox' ? 'paw' : 'ghost'}
          size="paw"
          onClick={() => onScreenChange('inbox')}
          className="flex flex-col items-center gap-1"
        >
          💬
        </Button>
      </div>
    </div>
  );
}