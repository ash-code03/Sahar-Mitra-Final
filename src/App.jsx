import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PhoneFrame } from './components/shared/PhoneFrame';
import { BottomNav } from './components/shared/BottomNav';
import { HomeScreen } from './components/HomeScreen/HomeScreen';
import { ResultScreen } from './components/ResultScreen/ResultScreen';

export default function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
        <BottomNav />
      </PhoneFrame>
    </BrowserRouter>
  );
}
