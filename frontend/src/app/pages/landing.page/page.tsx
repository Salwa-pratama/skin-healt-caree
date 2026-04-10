"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LandingPage from './index';
import SainsPage from './sains';
import TentangPage from './tentang';

function SwitcherContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');

    if (tab === 'sains') {
        return <SainsPage />;
    }
    if (tab === 'tentang') {
        return <TentangPage />;
    }
    return <LandingPage />;
}

export default function Switcher() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SwitcherContent />
        </Suspense>
    );
}
