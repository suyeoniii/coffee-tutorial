'use client';

import { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import RecipeSection from './components/RecipeSection';
import BeansSection from './components/BeansSection';
import TutorialSection from './components/TutorialSection';

const tabs = [
  { id: 'recipes', label: '레시피' },
  { id: 'beans', label: '원두별 레시피' },
  { id: 'tutorial', label: '튜토리얼' }
];

export default function Home() {
  const [currentTab, setCurrentTab] = useState('recipes');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">내가 내린 커피 세계 최고 커피 ☕</h1>
          <TabNavigation tabs={tabs} currentTab={currentTab} onTabChange={setCurrentTab} />
        </div>
      </header>

      <main className="p-4">
        {currentTab === 'recipes' && <RecipeSection />}
        {currentTab === 'beans' && <BeansSection />}
        {currentTab === 'tutorial' && <TutorialSection />}
      </main>
    </div>
  );
}
