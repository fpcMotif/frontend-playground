import React, { useState, useCallback } from 'react';
import { AddToCartButton } from './components';
import type { ThemeMode } from './types';

/**
 * Demo Application
 * Showcases the AddToCartButton component with theme controls
 */
const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [scale, setScale] = useState(1.5);
  const [cartCount, setCartCount] = useState(0);

  const handleThemeChange = useCallback((newTheme: ThemeMode) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  }, []);

  const handleAddComplete = useCallback(() => {
    setCartCount((prev) => prev + 1);
  }, []);

  return (
    <div className="demo-container" data-theme={theme}>
      {/* Grid Background */}
      <div className="demo-grid-bg" aria-hidden="true" />

      {/* Main Content */}
      <main style={{ scale }}>
        <AddToCartButton
          label="Add to cart"
          onAddComplete={handleAddComplete}
        />
      </main>

      {/* Controls Panel */}
      <aside className="controls-panel">
        <h2 className="controls-title">Config</h2>
        
        {/* Scale Control */}
        <div className="control-group">
          <label htmlFor="scale-input" className="control-label">
            Scale
          </label>
          <input
            id="scale-input"
            type="range"
            min={1}
            max={4}
            step={0.5}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="control-slider"
          />
          <span className="control-value">{scale}</span>
        </div>

        {/* Theme Control */}
        <div className="control-group">
          <label htmlFor="theme-select" className="control-label">
            Theme
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value as ThemeMode)}
            className="control-select"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Cart Count Display */}
        <div className="control-group">
          <span className="control-label">Cart Items</span>
          <span className="control-value cart-count">{cartCount}</span>
        </div>
      </aside>
    </div>
  );
};

export default App;
