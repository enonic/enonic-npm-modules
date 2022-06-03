import {describe, expect, test} from '@jest/globals';
import {ESLint, Linter} from 'eslint';
import * as path from 'path';

const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null;

const hasRule = (errors: Linter.LintMessage[], ruleId: string): boolean => errors.some(error => error.ruleId === ruleId);

async function runEslint(code: string, overrideConfig: Linter.ConfigOverride, filePath?: string): Promise<Linter.LintMessage[]> {
  const eslint = new ESLint({useEslintrc: false, overrideConfig});

  const [{messages}] = await eslint.lintText(code, {filePath});

  return messages;
}

describe('Default', () => {
  test('eslint-config', async () => {
    const config = require('../index.js');

    expect(isObject(config)).toBeTruthy();
    expect(isObject(config.overrides)).toBeTruthy();

    const errors = await runEslint('console.log("quotes");\n', config);
    expect(hasRule(errors, 'quotes')).toBeTruthy();
  });
});

describe('Standalone configs', () => {
  test('eslint-config/vanilla', async () => {
    const config = require('../vanilla.js');

    expect(isObject(config)).toBeTruthy();
    expect(isObject(config.rules)).toBeTruthy();

    const errors = await runEslint('console.log("quotes");\n', config);
    expect(hasRule(errors, 'quotes')).toBeTruthy();
  });

  test('eslint-config/typescript', async () => {
    const config = require('../typescript.js');

    expect(isObject(config)).toBeTruthy();
    expect(isObject(config.rules)).toBeTruthy();

    const project = path.join(__dirname, '../tsconfig.eslint.json');
    const filePath = path.join(__dirname, '../test.ts');
    const errors = await runEslint('const str: string = "quotes";\n', {parserOptions: {project}, ...config}, filePath);
    expect(hasRule(errors, '@typescript-eslint/quotes')).toBeTruthy();
    expect(hasRule(errors, '@typescript-eslint/no-inferrable-types')).toBeTruthy();
  });
});

describe('Helper configs', () => {
  test('eslint-config/browser', async () => {
    const config = require('../browser.js');

    expect(isObject(config)).toBeTruthy();
    expect(isObject(config.env)).toBeTruthy();

    const code = 'window.onready = () => void console.log("onready");\n';
    const errors = await runEslint(code, {extends: path.join(__dirname, '../vanilla.js'), ...config});
    expect(hasRule(errors, 'quotes')).toBeTruthy();
    expect(hasRule(errors, 'no-undef')).toBeFalsy();
  });

  test('eslint-config/xp', async () => {
    const config = require('../xp.js');

    expect(isObject(config)).toBeTruthy();
    expect(isObject(config.globals)).toBeTruthy();

    const code = 'log.info("quotes");\n';
    const errors = await runEslint(code, {extends: path.join(__dirname, '../vanilla.js'), ...config});
    expect(hasRule(errors, 'quotes')).toBeTruthy();
    expect(hasRule(errors, 'no-undef')).toBeFalsy();
  });
});
