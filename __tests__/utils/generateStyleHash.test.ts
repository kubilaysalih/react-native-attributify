import { generateStyleHash } from '../../utils/generateStyleHash'

describe('generateStyleHash', () => {
  it('should generate consistent hash for same styles', () => {
    const styles = { color: 'red', fontSize: 14 }
    const prefix = 'test_'

    const hash1 = generateStyleHash(styles, prefix)
    const hash2 = generateStyleHash(styles, prefix)

    expect(hash1).toBe(hash2)
  })

  it('should include prefix in generated hash', () => {
    const styles = { color: 'blue' }
    const prefix = 'custom_'

    const hash = generateStyleHash(styles, prefix)

    expect(hash.startsWith(prefix)).toBeTruthy()
  })

  it('should generate different hashes for different styles', () => {
    const styles1 = { color: 'red' }
    const styles2 = { color: 'blue' }
    const prefix = 'test_'

    const hash1 = generateStyleHash(styles1, prefix)
    const hash2 = generateStyleHash(styles2, prefix)

    expect(hash1).not.toBe(hash2)
  })
})