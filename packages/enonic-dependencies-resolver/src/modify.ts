import * as path from 'path';
import * as fs from 'fs';

import {ImportData, FileData} from './resolve';

const IMPORTS_REGEX = /((?:\s*import\s+)([A-Za-z_\d]+)(?:\s*=\s*)([\w.\d]+\.)([A-Za-z_\d]+)(?:;?))+/gi;
const MODULE_REGEX = /(?:\s*module\s+)([\w.\d]+)(?:\s+{)/gi;
const MODULE_END_REGEX = /}(?:[^}]+)$/gi;
const USAGE_REGEX = /(?:api\.(?:[a-z_\d]+\.)*)(([A-Z_][\w\d]+)(?:\.)?([\w\d_]+)?)/g;

export default function modify(filesData: Map<string, FileData>) {
  filesData.forEach((data, file) => {
    let code = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    let importInsertPosition = 0;

    if (data.module) {
      hasChanges = true;
      importInsertPosition = code.indexOf('module api');
      code = code.replace(MODULE_REGEX, '');
      code = code.replace(MODULE_END_REGEX, '');
    }

    // Imports
    const importsData = [...data.imports, ...data.usages.filter(usage => filterImports(data.imports, usage))];
    const imports = importsData
      .map((importData: ImportData) => {
        const importPath = buildImportPath(filesData, importData, file)
        return `import {${buildImportName(importData)}} from '${importPath}';`;
      })
      .join('\n    ');

    if (data.imports.length > 0) {
      hasChanges = true;
      code = code.replace(IMPORTS_REGEX, imports);
    } else if (data.usages.length > 0) {
      code = code.slice(0, importInsertPosition) + imports + code.slice(importInsertPosition);
    }

    // Replace usages
    if (data.usages.length > 0) {
      code = code.replace(USAGE_REGEX, '$1');
    }

    if (hasChanges) {
      fs.writeFileSync(file, code);
    }
  });
};

function buildImportName(data: ImportData): string {
  const nameChanged = data.name !== data.importedName;
  return nameChanged ? `${data.name} as ${data.importedName}` : data.name;
}

function buildImportPath(filesData: Map<string, FileData>, importData: ImportData, file: string): string {
  const filesIt = filesData.entries();
  let fileData: [string, FileData] = filesIt.next().value;

  while (fileData) {
    const f = fileData[1];
    if (
      importData.module === f.module &&
      f.exports.includes(importData.name)
    ) {
      let importPath = path.relative(path.dirname(file), fileData[0]);
      importPath = path.join(path.dirname(importPath), path.basename(importPath, '.ts'));
      return `${importPath.startsWith('.') ? importPath : './' + importPath}`.replace(/\\/g, '/');
    }
    fileData = filesIt.next().value;
  }

  return '';
}

function compareImports(importA: ImportData, importB: ImportData): boolean {
  return importA.module === importB.module && importA.name === importB.name;
}

function filterImports(filteringData: ImportData[], importData: ImportData): boolean {
  return !filteringData.find(imp => compareImports(imp, importData));
}
