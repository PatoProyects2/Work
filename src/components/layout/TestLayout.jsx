import React from 'react'
import { Outlet } from 'react-router-dom'
export function TestLayout() {
  return (
    <section>
      <div>
        <Outlet />
      </div>
    </section>
  );
}