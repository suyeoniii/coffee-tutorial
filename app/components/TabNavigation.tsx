import Link from 'next/link';

interface Tab {
  id: string;
  label: string;
  href: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  currentTab: string;
  onTabChange?: (tab: string) => void;
}

export default function TabNavigation({ tabs, currentTab }: TabNavigationProps) {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <Link 
          key={tab.id}
          href={tab.href}
          className={`flex-1 py-2 text-center text-sm ${
            currentTab === tab.id ? 'border-b-2 border-black' : ''
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}