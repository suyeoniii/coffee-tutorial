interface TabNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ currentTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b">
      <button 
        onClick={() => onTabChange('recipes')}
        className={`flex-1 py-2 text-center text-sm ${currentTab === 'recipes' ? 'border-b-2 border-black' : ''}`}
      >
        레시피
      </button>
      <button 
        onClick={() => onTabChange('beans')}
        className={`flex-1 py-2 text-center text-sm ${currentTab === 'beans' ? 'border-b-2 border-black' : ''}`}
      >
        원두별 레시피
      </button>
      <button 
        onClick={() => onTabChange('tutorial')}
        className={`flex-1 py-2 text-center text-sm ${currentTab === 'tutorial' ? 'border-b-2 border-black' : ''}`}
      >
        튜토리얼
      </button>
    </div>
  );
}