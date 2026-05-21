import { useState } from 'react';
import { formatColor } from '../engine/oklch';
import type { SwatchData, DisplayFormat } from '../types';
import './ColorSwatch.css';

interface Props {
  data: SwatchData;
  label: string;
  format: DisplayFormat;
}

export function ColorSwatch({ data, label, format }: Props) {
  const [copied, setCopied] = useState(false);

  const displayValue = formatColor(data.oklch, format);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(displayValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available
    }
  }

  const showContrast = data.contrastVsBgDefault !== undefined;
  const pass = data.contrastPass;

  return (
    <button
      className="color-swatch"
      style={{ backgroundColor: data.hex }}
      onClick={handleClick}
      title={`${label}: ${displayValue}${showContrast ? ` — contrast: ${data.contrastVsBgDefault?.toFixed(2)}:1` : ''}`}
      aria-label={`${label} — ${displayValue}${copied ? ', gekopieerd' : ''}`}
    >
      {showContrast && (
        <span
          className={`color-swatch__badge ${pass ? 'color-swatch__badge--pass' : 'color-swatch__badge--fail'}`}
          aria-hidden="true"
        >
          {pass ? '✓' : '✗'}
        </span>
      )}
      {copied && (
        <span className="color-swatch__copied" aria-hidden="true">
          Gekopieerd
        </span>
      )}
    </button>
  );
}
