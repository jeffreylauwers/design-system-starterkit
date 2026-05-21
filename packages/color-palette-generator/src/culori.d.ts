declare module 'culori' {
  export interface Color {
    mode: string;
    [key: string]: number | string | undefined;
  }

  export interface Oklch extends Color {
    mode: 'oklch';
    l: number;
    c: number;
    h: number;
    alpha?: number;
  }

  export interface Rgb extends Color {
    mode: 'rgb';
    r: number;
    g: number;
    b: number;
    alpha?: number;
  }

  export function parse(color: string): Color | undefined;
  export function converter(mode: 'oklch'): (color: Color | string) => Oklch;
  export function converter(mode: 'rgb'): (color: Color | string) => Rgb;
  export function converter(mode: string): (color: Color | string) => Color;
  export function formatHex(color: Color | string): string | undefined;
  export function formatCss(color: Color | string): string;
  export function clampChroma(color: Color | string, mode?: string): Color;
  export function wcagContrast(a: Color | string, b: Color | string): number;
  export function wcagLuminance(color: Color | string): number;
  export function inGamut(mode: string): (color: Color) => boolean;
}
