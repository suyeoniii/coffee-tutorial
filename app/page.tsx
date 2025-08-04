'use client';

import { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import RecipeSection from './components/RecipeSection';
import BeansSection from './components/BeansSection';
import TutorialSection from './components/TutorialSection';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('recipes');

  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">내가 내린 커피 세계 최고 커피 ☕</h1>
        <TabNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>

      <div className="p-4">
        {currentTab === 'recipes' && <RecipeSection />}
        {currentTab === 'beans' && <BeansSection />}
        {currentTab === 'tutorial' && <TutorialSection />}
      </div>
    </div>
  );
}
