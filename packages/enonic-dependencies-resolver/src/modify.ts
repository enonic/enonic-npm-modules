import * as path from 'path';
import * as fs from 'fs';

import {ImportData, FileData} from './resolve';

const IMPORTS_REGEX = /((?:\s*import\s+)([A-Za-z_\d]+)(?:\s*=\s*)([\w.\d]+\.)([A-Za-z_\d]+)(?:;?))+/gi;
const MODULE_REGEX = /(?:\s*module\s+)([\w.\d]+)(?:\s+{)/gi;
const MODULE_END_REGEX = /}(?:[^}]+)$/gi;
const USAGE_REGEX = /(?:(?:(?:api)|[A-Za-z_]*)\.)+([\w\d]+)/gi;

export default function modify(filesData: Map<string, FileData>) {
  filesData.forEach((data, file) => {
    let code = fs.readFileSync(file, 'utf8');
    let hasChanges = false;

    if (data.module) {
      hasChanges = true;
      code = code.replace(MODULE_REGEX, '');
      code = code.replace(MODULE_END_REGEX, '');
    }

    if (data.imports.length > 0) {
      hasChanges = true;
      const imports = data.imports
        .map((importData: ImportData) => {
          const importPath = buildImportPath(filesData, importData, file)
          return `import {${buildImportName(importData)}} from '${importPath}';`;
        })
        .join('\n    ');
      code = code.replace(IMPORTS_REGEX, imports);
    }

    // console.log(`${data.module}\t: ${file}`);
    if (hasChanges) {
      fs.writeFileSync(file, code);
    }
  });
};

function buildImportName(data: ImportData) {
  const nameChanged = data.name !== data.importedName;
  return nameChanged ? `${data.name} as ${data.importedName}` : data.name;
}

function buildImportPath(filesData: Map<string, FileData>, importData: ImportData, file: string) {
  const filesIt = filesData.entries();
  let fileData: [string, FileData] = filesIt.next().value;

  while (fileData) {
    const f = fileData[1];
    if (
      importData.module === f.module &&
      f.exports.includes(importData.name)
    ) {
      const importPath = path.relative(file, fileData[0]);
      return path.join(path.dirname(importPath), path.basename(importPath, '.ts'));
    }
    fileData = filesIt.next().value;
  }

  return '';
}
