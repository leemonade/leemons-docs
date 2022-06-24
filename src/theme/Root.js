import React from 'react';
import { ThemeProvider } from '@bubbles-ui/components';

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
