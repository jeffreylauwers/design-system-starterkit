import React, { useState, useEffect } from 'react';

interface TokenControlsProps {
  onRefresh?: () => void;
}

export function TokenControls({ onRefresh }: TokenControlsProps) {
  const [theme, setTheme] = useState('start');
  const [mode, setMode] = useState('light');
  const [density, setDensity] = useState('default');

  // Load current values on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentConfig = document
      .querySelector('[data-dsn-tokens]')
      ?.getAttribute('data-dsn-tokens');

    if (currentConfig) {
      const [t, m, d] = currentConfig.split('-');
      setTheme(t || 'start');
      setMode(m || 'light');
      setDensity(d || 'default');
    }
  }, []);

  const applyTokens = (
    newTheme: string,
    newMode: string,
    newDensity: string
  ) => {
    if (typeof window === 'undefined') return;

    // Remove old token stylesheet
    const oldLink = document.querySelector('[data-dsn-theme-css]');
    if (oldLink) {
      oldLink.remove();
    }

    // Create new token config
    const config = `${newTheme}-${newMode}-${newDensity}`;

    // Add new stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./design-tokens/dist/css/${config}.css`;
    link.setAttribute('data-dsn-theme-css', config);
    link.setAttribute('data-dsn-tokens', config);
    document.head.appendChild(link);

    // Wait for stylesheet to load, then trigger refresh
    link.addEventListener('load', () => {
      if (onRefresh) {
        // Use multiple delays to catch all updates
        setTimeout(onRefresh, 50);
        setTimeout(onRefresh, 150);
        setTimeout(onRefresh, 300);
      }

      // Dispatch custom event for TokenTable to listen to
      window.dispatchEvent(new CustomEvent('storybook-globals-updated'));
    });

    // Update data attribute
    document.body.setAttribute('data-dsn-tokens', config);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    applyTokens(newTheme, mode, density);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value;
    setMode(newMode);
    applyTokens(theme, newMode, density);
  };

  const handleDensityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDensity = e.target.value;
    setDensity(newDensity);
    applyTokens(theme, mode, newDensity);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        padding: '16px',
        background: 'var(--dsn-color-neutral-bg-subtle, #f6f6f6)',
        borderRadius: '8px',
        marginBottom: '32px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label
          htmlFor="theme-select"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--dsn-color-neutral-color-subtle, #666)',
          }}
        >
          Theme
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={handleThemeChange}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border:
              '1px solid var(--dsn-color-neutral-border-default, #868686)',
            background: 'var(--dsn-color-neutral-bg-document, #fff)',
            fontSize: '14px',
            fontFamily: 'var(--dsn-text-font-family-default, sans-serif)',
            cursor: 'pointer',
          }}
        >
          <option value="start">Start (Blue)</option>
          <option value="rijkshuisstijl">Rijkshuisstijl</option>
          <option value="denhaag">Den Haag</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label
          htmlFor="mode-select"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--dsn-color-neutral-color-subtle, #666)',
          }}
        >
          Mode
        </label>
        <select
          id="mode-select"
          value={mode}
          onChange={handleModeChange}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border:
              '1px solid var(--dsn-color-neutral-border-default, #868686)',
            background: 'var(--dsn-color-neutral-bg-document, #fff)',
            fontSize: '14px',
            fontFamily: 'var(--dsn-text-font-family-default, sans-serif)',
            cursor: 'pointer',
          }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label
          htmlFor="density-select"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--dsn-color-neutral-color-subtle, #666)',
          }}
        >
          Density
        </label>
        <select
          id="density-select"
          value={density}
          onChange={handleDensityChange}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border:
              '1px solid var(--dsn-color-neutral-border-default, #868686)',
            background: 'var(--dsn-color-neutral-bg-document, #fff)',
            fontSize: '14px',
            fontFamily: 'var(--dsn-text-font-family-default, sans-serif)',
            cursor: 'pointer',
          }}
        >
          <option value="default">Default (Fluid)</option>
          <option value="compact">Compact (Fixed)</option>
        </select>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          marginLeft: 'auto',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: 'var(--dsn-color-neutral-color-subtle, #666)',
            fontFamily: 'var(--dsn-text-font-family-default, sans-serif)',
          }}
        >
          Select a configuration to see token values update below
        </p>
      </div>
    </div>
  );
}
