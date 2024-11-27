import { execSync } from 'child_process'
import os from 'os'

const platform = os.platform()
const arch = os.arch()

console.log(`Detected platform: ${platform}, architecture: ${arch}`)

try {
  if (platform === 'darwin' && arch === 'arm64') {
    console.log('Installing libsql package for macOS ARM...')
    execSync('pnpm i @libsql/darwin-arm64', { stdio: 'inherit' })
  } else if (platform === 'linux' && arch === 'x64') {
    console.log('Installing libsql package for Linux musl...')
    execSync('pnpm i @libsql/linux-x64-musl', { stdio: 'inherit' })
  } else {
    console.log('No compatible package found for this platform.')
  }
} catch (error) {
  console.error('Failed to install platform-specific dependency:', error)
  process.exit(1)
}
