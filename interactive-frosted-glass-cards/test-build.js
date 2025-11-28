import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testBuild() {
  try {
    console.log('Starting build...');
    const { stdout, stderr } = await execAsync('bun run build', { 
      cwd: 'C:/Users/fenchem/frontend-playground/interactive-frosted-glass-cards',
      timeout: 30000
    });
    
    if (stdout) console.log('STDOUT:', stdout);
    if (stderr) console.log('STDERR:', stderr);
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    if (error.stdout) console.log('STDOUT:', error.stdout);
    if (error.stderr) console.log('STDERR:', error.stderr);
  }
}

testBuild();
