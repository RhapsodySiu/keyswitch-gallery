import yaml from 'js-yaml';
import fs from 'fs';

const TARGET_PATH = 'src/assets/data.ts';

try {
    const doc = yaml.load(fs.readFileSync('./data/switches.yml', 'utf8'));
    const jsonString = JSON.stringify(doc);
    const content = 'export default ' + jsonString + ';'; 

    fs.writeFileSync(TARGET_PATH, content)
} catch (e) {
    console.log(e);
}