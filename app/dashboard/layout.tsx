"use client";

import Providers from '@/components/SessionProvider/SessionProvider';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Providers>
        {children}
      </Providers>
    </section>
  )
}