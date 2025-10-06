import calculate, { add, subtract, multiply, divide } from './modules/calculator.js';
import { 
  readFileCallback, 
  readFilePromise, 
  readFileAsync, 
  readMultipleFiles,
  doTask 
} from './modules/async-examples.js';

console.log(`5 + 3 = ${add(5, 3)}`);
console.log(`10 - 4 = ${subtract(10, 4)}`);
console.log(`6 * 7 = ${multiply(6, 7)}`);
console.log(`15 / 3 = ${divide(15, 3)}`);

const ops = [
  { type: 'add', x: 10, y: 5 },
  { type: 'subtract', x: 20, y: 8 },
  { type: 'multiply', x: 4, y: 6 },
  { type: 'divide', x: 50, y: 5 }
];

console.log('Results:', calculate(ops));

import fs from 'fs/promises';

async function createTestFiles() {
  try {
    await fs.writeFile('test1.txt', 'First test file content here');
    await fs.writeFile('test2.txt', 'Second test file with different content');
  } catch (err) {
    // Files might already exist
  }
}

async function testAsyncStuff() {
  await createTestFiles();

  readFileCallback('test1.txt', (err, data) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Callback:', data.substring(0, 20) + '...');
    }
  });

  readFilePromise('test1.txt')
    .then(data => console.log('Promise:', data.substring(0, 20) + '...'))
    .catch(err => console.error('Failed:', err.message));

  try {
    const data = await readFileAsync('test2.txt');
    console.log('Async:', data.substring(0, 20) + '...');
  } catch (err) {
    console.error('Error:', err.message);
  }

  try {
    const results = await readMultipleFiles(['test1.txt', 'test2.txt']);
    console.log('Sequential:', results.sequential);
    console.log('Parallel:', results.parallel);
  } catch (err) {
    console.error('Multi-file error:', err.message);
  }

  const start = Date.now();
  await doTask('Task A', 500);
  await doTask('Task B', 300);
  await doTask('Task C', 400);
  const sequentialTime = Date.now() - start;
  console.log(`Sequential: ${sequentialTime}ms`);

  const parallelStart = Date.now();
  await Promise.all([
    doTask('Task X', 500),
    doTask('Task Y', 300),
    doTask('Task Z', 400)
  ]);
  const parallelTime = Date.now() - parallelStart;
  console.log(`Parallel: ${parallelTime}ms`);

  try {
    await fs.unlink('test1.txt');
    await fs.unlink('test2.txt');
  } catch (err) {
    // Could not clean up
  }
}

testAsyncStuff()
  .then(() => {
    console.log('Done! Try: npm run todo');
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
