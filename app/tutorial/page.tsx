'use client';

import TabNavigation from '../components/TabNavigation';
import TutorialSection from '../components/TutorialSection';

const tabs = [
  { id: 'recipes', label: '레시피', href: '/' },
  { id: 'beans', label: '원두별 레시피', href: '/beans' },
  { id: 'tutorial', label: '튜토리얼', href: '/tutorial' }
];

export default function TutorialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">내가 내린 커피 세계 최고 커피 ☕</h1>
          <TabNavigation tabs={tabs} currentTab="tutorial" />
        </div>
      </header>

      <main className="p-4">
        <TutorialSection />
      </main>
    </div>
  );
} 