import fs from 'fs/promises';

export function readFileCallback(filename, callback) {
  fs.readFile(filename, 'utf8')
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
}

export function readFilePromise(filename) {
  return fs.readFile(filename, 'utf8');
}

export async function readFileAsync(filename) {
  return await fs.readFile(filename, 'utf8');
}

export async function readMultipleFiles(filenames) {
  const sequential = [];
  for (const filename of filenames) {
    const data = await fs.readFile(filename, 'utf8');
    sequential.push({ filename, preview: data.substring(0, 30) + '...' });
  }

  const parallel = await Promise.all(
    filenames.map(filename => 
      fs.readFile(filename, 'utf8').then(data => ({
        filename,
        preview: data.substring(0, 30) + '...'
      }))
    )
  );

  return { sequential, parallel };
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function doTask(name, time = 1000) {
  await delay(time);
  return `${name} finished`;
}
