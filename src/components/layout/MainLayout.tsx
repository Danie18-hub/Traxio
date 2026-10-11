import React from 'react';
import { Outlet } from 'react-router-dom';
import { UtilityBar } from './UtilityBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { AlertStrip } from './AlertStrip';
import { CookieBanner } from './CookieBanner';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#FF6700]/20 selection:text-[#FF6700]">
      <UtilityBar />
      <AlertStrip />
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
