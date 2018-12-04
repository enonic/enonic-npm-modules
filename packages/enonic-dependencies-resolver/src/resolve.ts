import * as fs from 'fs';

export interface ImportData {
  module: string | null;
  importedName: string;
  name: string;
}

export interface FileData {
  module: string | null;
  exports: string[];
  imports: ImportData[];
  usages: ImportData[];
}

const buildExportsRegex = () => /(?:export\s+)(?:abstract\s+)?(?:(?:type|interface|enum|class|function)\s+)([A-Za-z_\d]+)(?:\n|.+)/gi
const buildImportsRegex = () => /(?:\s*import\s+)([A-Za-z_\d]+)(?:\s*=\s*)([\w.\d]+\.)([A-Za-z_\d]+)(?:;?)/gi;
const buildModuleRegex = () => /(?:\s*module\s+)([\w.\d]+)(?:\s+{)/gi;
const buildUsageRegex = () => /(api\.(?:[a-z_\d]+\.)*)(([A-Z_][\w\d]+)(?:\.)?([\w\d_]+)?)/g;

function findExports(code) {
  const regex = buildExportsRegex();
  const result: string[] = [];
  let match = regex.exec(code);
  while (match) {
    if (match[1]) {
      result.push(match[1]);
    }
    match = regex.exec(code);
  }
  return result;
}

function findImports(code): ImportData[] {
  const regex = buildImportsRegex();
  const result: ImportData[] = [];
  let match = regex.exec(code);
  while (match) {
    const name = match[3];
    const importedName = match[1];
    const module = match[2] ? match[2].slice(0, -1) : '';
    result.push({ module, importedName, name });
    match = regex.exec(code);
  }
  return result;
}

function findModule(code): string | null {
  const regex = buildModuleRegex();
  const match = regex.exec(code);
  return match ? match[1] : null;
}

function findUsages(code) {
  const regex = buildUsageRegex();
  const result: ImportData[] = [];
  const fullUsages: string[] = [];
  let match = regex.exec(code);
  while (match) {
    const name = match[3];
    const importedName = match[3];
    const module = match[1] ? match[1].slice(0, -1) : '';

    const full = `${match[1]}${match[3]}`;
    if (!fullUsages.includes(full)) {
      result.push({ module, importedName, name });
      fullUsages.push(full);
    }
    match = regex.exec(code);
  }

  return result;
}

export function resolveExports(files) {
  const map = new Map();

  files.forEach(file => {
    const code = fs.readFileSync(file, 'utf8');
    const module = findModule(code);
    const exports = findExports(code);
    map.set(file, { module, exports });
  });

  return map;
};

export function resolveImports(entries) {
  const map = new Map();

  entries.forEach((value, file) => {
    const code = fs.readFileSync(file, 'utf8');
    const imports = findImports(code);
    const { module, exports } = value;
    map.set(file, { module, exports, imports });
  });

  return map;
};

export default function resolve(files): Map<string, FileData> {
  const map: Map<string, FileData> = new Map();

  files.forEach(file => {
    const code = fs.readFileSync(file, 'utf8');
    const module = findModule(code);
    const exports = findExports(code);
    const imports = findImports(code);
    const usages = findUsages(code);
    map.set(file, { module, exports, imports, usages });
  });

  return map;
};
