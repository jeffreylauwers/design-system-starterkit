import { oklchToCss } from './oklch';
import type { ColorGroup } from '../types';
import { TOKEN_STEPS, INVERSE_TOKEN_STEPS } from '../types';

interface DtcgToken {
  $value: string;
  $type: 'color';
  $description?: string;
}

type DtcgGroupTokens = Record<string, DtcgToken>;

interface DtcgOutput {
  dsn: {
    color: Record<string, DtcgGroupTokens>;
  };
}

function buildDtcgGroup(
  group: ColorGroup,
  format: 'oklch' | 'hex'
): DtcgGroupTokens {
  const result: DtcgGroupTokens = {};

  for (const step of TOKEN_STEPS) {
    const sw = group.tokens[step];
    result[step] = {
      $value: format === 'oklch' ? oklchToCss(sw.oklch) : sw.hex,
      $type: 'color',
    };
  }

  return result;
}

function buildDtcgInverseGroup(
  group: ColorGroup,
  format: 'oklch' | 'hex'
): DtcgGroupTokens {
  const result: DtcgGroupTokens = {};

  for (const step of INVERSE_TOKEN_STEPS) {
    const sw = group.inverseTokens[step];
    const cleanStep = step.replace('inverse-', '');
    result[cleanStep] = {
      $value: format === 'oklch' ? oklchToCss(sw.oklch) : sw.hex,
      $type: 'color',
    };
  }

  return result;
}

export function exportDtcg(
  groups: ColorGroup[],
  format: 'oklch' | 'hex' = 'oklch'
): { light: string; dark: string } {
  const lightOutput: DtcgOutput = { dsn: { color: {} } };
  const darkOutput: DtcgOutput = { dsn: { color: {} } };

  for (const group of groups) {
    lightOutput.dsn.color[group.name] = buildDtcgGroup(group, format);
    lightOutput.dsn.color[`${group.name}-inverse`] = buildDtcgInverseGroup(
      group,
      format
    );
    darkOutput.dsn.color[group.name] = buildDtcgGroup(group, format);
    darkOutput.dsn.color[`${group.name}-inverse`] = buildDtcgInverseGroup(
      group,
      format
    );
  }

  return {
    light: JSON.stringify(lightOutput, null, 2),
    dark: JSON.stringify(darkOutput, null, 2),
  };
}

interface TokensStudioToken {
  type: 'color';
  value: string;
}

type TokensStudioOutput = Record<
  string,
  Record<string, Record<string, TokensStudioToken>>
>;

export function exportTokensStudio(groups: ColorGroup[]): string {
  const output: TokensStudioOutput = {};

  for (const group of groups) {
    output[group.name] = {};

    for (const step of TOKEN_STEPS) {
      const [track, ...rest] = step.split('-');
      const key = rest.join('-');
      if (!output[group.name][track]) output[group.name][track] = {};
      output[group.name][track][key] = {
        type: 'color',
        value: group.tokens[step].hex,
      };
    }

    output[`${group.name}-inverse`] = {};
    for (const step of INVERSE_TOKEN_STEPS) {
      const withoutInverse = step.replace('inverse-', '');
      const [track, ...rest] = withoutInverse.split('-');
      const key = rest.join('-');
      if (!output[`${group.name}-inverse`][track])
        output[`${group.name}-inverse`][track] = {};
      output[`${group.name}-inverse`][track][key] = {
        type: 'color',
        value: group.inverseTokens[step].hex,
      };
    }
  }

  return JSON.stringify(output, null, 2);
}

type GenericOutput = Record<string, Record<string, string>>;

export function exportGeneric(groups: ColorGroup[]): string {
  const output: GenericOutput = {};

  for (const group of groups) {
    output[group.name] = {};
    for (const step of TOKEN_STEPS) {
      output[group.name][step] = group.tokens[step].hex;
    }

    output[`${group.name}-inverse`] = {};
    for (const step of INVERSE_TOKEN_STEPS) {
      const key = step.replace('inverse-', '');
      output[`${group.name}-inverse`][key] = group.inverseTokens[step].hex;
    }
  }

  return JSON.stringify(output, null, 2);
}

export function downloadJson(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
