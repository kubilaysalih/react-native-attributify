import color from '../../rules/color'

describe('Color Rules', () => {
  describe('color value validation', () => {
    it('should validate hex colors', () => {
      const hexCases = [
        { value: '#123', expected: true },
        { value: '#123456', expected: true },
        { value: '#xyz', expected: false },
        { value: '#12', expected: false },
        { value: '#1234', expected: false },
        { value: '123456', expected: false }
      ]

      const [, textHandler] = color[1]
      if (typeof textHandler === 'function') {
        hexCases.forEach(({ value, expected }) => {
          const match = [`text-${value}`, value]
          const result = textHandler(match)
          if (expected) {
            expect(result).toHaveProperty('color', value)
          } else {
            expect(result).not.toHaveProperty('color')
          }
        })
      }
    })

    it('should validate rgb/rgba colors', () => {
      const rgbCases = [
        { value: 'rgb(0,0,0)', expected: true },
        { value: 'rgba(0,0,0,0.5)', expected: true },
        { value: 'rgb(255,255,255)', expected: true },
        { value: 'rgba(255,255,255,1)', expected: true },
        { value: 'rgb(300,0,0)', expected: false },
        { value: 'rgba(0,0,0,1.5)', expected: false }
      ]

      const [, textHandler] = color[1]
      if (typeof textHandler === 'function') {
        rgbCases.forEach(({ value, expected }) => {
          const match = [`text-${value}`, value]
          const result = textHandler(match)
          if (expected) {
            expect(result).toHaveProperty('color', value)
          } else {
            expect(result).not.toHaveProperty('color')
          }
        })
      }
    })
  })

  describe('text rule', () => {
    it('should handle single text color', () => {
      const [, handler] = color[0]
      if (typeof handler === 'function') {
        const result = handler(['text', 'red'])
        expect(result).toEqual({ color: 'red' })
      }
    })

    it('should handle text color with alignment', () => {
      const [, handler] = color[0]
      if (typeof handler === 'function') {
        const result = handler(['text', 'blue center'])
        expect(result).toEqual({ color: 'blue', textAlign: 'center' })
      }
    })
  })

  describe('bg rule', () => {
    it('should handle background colors', () => {
      const testCases = [
        { input: 'red', expected: { backgroundColor: 'red' } },
        { input: 'blue', expected: { backgroundColor: 'blue' } },
        { input: '#123', expected: { backgroundColor: '#123' } }
      ]

      const [, bgHandler] = color[2]
      if (typeof bgHandler === 'function') {
        testCases.forEach(({ input, expected }) => {
          const match = [`bg-${input}`, input]
          expect(bgHandler(match)).toEqual(expected)
        })
      }
    })
  })

  describe('opacity rules', () => {
    it('should handle opacity values', () => {
      const testCases = [
        { input: '50', expected: { opacity: 0.5 } },
        { input: '75', expected: { opacity: 0.75 } },
        { input: '0', expected: { opacity: 0 } },
        { input: '100', expected: { opacity: 1 } }
      ]

      const [, opacityHandler] = color[4]
      if (typeof opacityHandler === 'function') {
        testCases.forEach(({ input, expected }) => {
          const match = [`opacity-${input}`, input]
          expect(opacityHandler(match)).toEqual(expected)
        })
      }
    })
  })
})