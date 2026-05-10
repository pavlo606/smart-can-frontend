import fs from 'fs';
import path from 'path';

type JsonValue = string | JsonObject;
interface JsonObject {
  [key: string]: JsonValue;
}

const INPUT_JSON = path.resolve('public/locales/en');
const OUTPUT_FILE = path.resolve('src/i18n/i18n.types.ts');
const INTERFACE_NAME = 'Translations';

function generateInterface(obj: JsonObject, indent = 2): string {
  const spaces = ' '.repeat(indent);

  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${spaces}${key}: string;`;
      }

      return `${spaces}${key}: {\n${generateInterface(
        value,
        indent + 2
      )}\n${spaces}};`;
    })
    .join('\n');
}

const readFiles = (dir: string) => {
  const importedModules = {} as any

  fs.readdirSync(dir)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-5) === '.json')
    .forEach((file) => {
      const moduleName = path.basename(file, '.json')
      importedModules[moduleName] = JSON.parse(
        fs.readFileSync(path.join(dir, file), 'utf8')
      )
    })
  
    return importedModules
}

function run() {
  const json: JsonObject = readFiles(INPUT_JSON);

  const body = generateInterface(json);

  const result = `/**
 * ⚠️ AUTO-GENERATED FILE
 * Do not edit manually
 */

export interface ${INTERFACE_NAME} {
${body}
}
`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, result, 'utf-8');

  console.log(`✓ Interface generated: ${OUTPUT_FILE}`);
}

run();
