const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const rootDir = path.join(__dirname, '..');

const indexFile = path.join(rootDir, 'index.html');

const sourceDir = ['css', 'javascript', 'demo'];

/**
 * 函数用于递归遍历目录下的所有 HTML 文件
 * @param {string} dir
 * @returns  {string []}
 */
function traverseDirectory(dir) {
  let arr = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arr = arr.concat(traverseDirectory(fullPath));
    } else if (file.endsWith('.html')) {
      arr.push(fullPath.replace(rootDir, '.'));
    }
  });
  return arr;
}

const files = {};

sourceDir.map(dir => {
  const dirPath = path.join(rootDir, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    files[dir] = traverseDirectory(dirPath);
  }
});

let content = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./web/index.css" />
        <title>Awesome</title>
    </head>
    <body>
        <script>var files = ${JSON.stringify(files)} </script>
        <script src="./web/index.js"></script>
    </body>
</html>
`.trim();

if (fs.existsSync(indexFile) && fs.statSync(indexFile).isFile()) {
  fs.unlinkSync(indexFile);
}

(async function () {
  content = await prettier.format(content, { parser: 'html' });
  fs.writeFileSync(indexFile, content);
  console.log('overwrite index.html success');
})();
