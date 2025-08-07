interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ tabs, currentTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2 text-center text-sm ${
            currentTab === tab.id ? 'border-b-2 border-black' : ''
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}