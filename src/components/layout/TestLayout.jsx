import React from 'react'
import { Outlet } from 'react-router-dom'

const TestLayout = () => {
  return (
    <section>
      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default TestLayout;