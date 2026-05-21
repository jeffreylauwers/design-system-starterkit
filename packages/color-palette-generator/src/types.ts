export type TokenStep =
  | 'bg-document'
  | 'bg-elevated'
  | 'bg-subtle'
  | 'bg-default'
  | 'bg-hover'
  | 'bg-active'
  | 'border-subtle'
  | 'border-default'
  | 'border-hover'
  | 'border-active'
  | 'color-subtle'
  | 'color-default'
  | 'color-hover'
  | 'color-active'
  | 'color-document';

export type InverseTokenStep =
  | 'inverse-bg-document'
  | 'inverse-bg-elevated'
  | 'inverse-bg-subtle'
  | 'inverse-bg-default'
  | 'inverse-bg-hover'
  | 'inverse-bg-active'
  | 'inverse-border-subtle'
  | 'inverse-border-default'
  | 'inverse-border-hover'
  | 'inverse-border-active'
  | 'inverse-color-subtle'
  | 'inverse-color-default'
  | 'inverse-color-hover'
  | 'inverse-color-active'
  | 'inverse-color-document';

export const TOKEN_STEPS: TokenStep[] = [
  'bg-document',
  'bg-elevated',
  'bg-subtle',
  'bg-default',
  'bg-hover',
  'bg-active',
  'border-subtle',
  'border-default',
  'border-hover',
  'border-active',
  'color-subtle',
  'color-default',
  'color-hover',
  'color-active',
  'color-document',
];

export const INVERSE_TOKEN_STEPS: InverseTokenStep[] = [
  'inverse-bg-document',
  'inverse-bg-elevated',
  'inverse-bg-subtle',
  'inverse-bg-default',
  'inverse-bg-hover',
  'inverse-bg-active',
  'inverse-border-subtle',
  'inverse-border-default',
  'inverse-border-hover',
  'inverse-border-active',
  'inverse-color-subtle',
  'inverse-color-default',
  'inverse-color-hover',
  'inverse-color-active',
  'inverse-color-document',
];

export const DEFAULT_GROUP_NAMES = [
  'neutral',
  'accent-1',
  'accent-2',
  'accent-3',
  'action-1',
  'action-2',
  'info',
  'positive',
  'negative',
  'warning',
] as const;

export const DEFAULT_BASE_COLORS: Record<string, string> = {
  neutral: '#868686',
  'accent-1': '#1B59A4',
  'accent-2': '#7C3AED',
  'accent-3': '#0891B2',
  'action-1': '#2563EB',
  'action-2': '#059669',
  info: '#0284C7',
  positive: '#16A34A',
  negative: '#DC2626',
  warning: '#D97706',
};

export interface OklchColor {
  mode: 'oklch';
  l: number;
  c: number;
  h: number;
}

export interface SwatchData {
  oklch: OklchColor;
  hex: string;
  contrastVsBgDefault?: number;
  contrastRequired?: number;
  contrastPass?: boolean;
}

export type TokenMap = Record<TokenStep, SwatchData>;
export type InverseTokenMap = Record<InverseTokenStep, SwatchData>;

export interface ColorGroup {
  id: string;
  name: string;
  baseColor: string;
  tokens: TokenMap;
  inverseTokens: InverseTokenMap;
}

export type ColorMode = 'light' | 'dark';
export type DisplayFormat = 'oklch' | 'hex';

export interface PaletteState {
  groups: ColorGroup[];
  mode: ColorMode;
  intensity: number;
  displayFormat: DisplayFormat;
}
