'use client';

import { useState } from 'react';

import { Popup } from '@/ui/modal/popup';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main style={{ padding: 40 }}>
      <h1>Test native dialog</h1>

      <button
        onClick={() => setOpen(true)}
        style={{ padding: '8px 16px', borderRadius: 8, cursor: 'pointer' }}
      >
        Open Pop up
      </button>

      <Popup isOpen={open} onClose={() => setOpen(false)} title="Title">
        <p>Content modal </p>
      </Popup>
    </main>
  );
}
