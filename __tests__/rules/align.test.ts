import align from '../../rules/align'

describe('Align Rules', () => {
  describe('text align rules', () => {
    const testCases = [
      {
        input: 'text-center',
        expected: { textAlign: 'center' }
      },
      {
        input: 'text-left',
        expected: { textAlign: 'left' }
      },
      {
        input: 'text-right',
        expected: { textAlign: 'right' }
      },
      {
        input: 'text-justify',
        expected: { textAlign: 'justify' }
      },
      {
        input: 'text-start',
        expected: { textAlign: 'start' }
      },
      {
        input: 'text-end',
        expected: { textAlign: 'end' }
      }
    ]

    testCases.forEach(({ input, expected }) => {
      it(`should transform ${input} to correct style object`, () => {
        const rule = align.find(([matcher]) =>
          typeof matcher === 'string' ? matcher === input : input.match(matcher)
        )

        expect(rule).toBeDefined()
        if (!rule) return

        const [, handler] = rule
        const result = typeof handler === 'function'
          ? handler([input])
          : handler

        expect(result).toEqual(expected)
      })
    })
  })

  describe('vertical align rules', () => {
    const testCases = [
      {
        input: 'vertical-middle',
        expected: { verticalAlign: 'middle' }
      },
      {
        input: 'align-top',
        expected: { verticalAlign: 'top' }
      },
      {
        input: 'v-bottom',
        expected: { verticalAlign: 'bottom' }
      },
      {
        input: 'vertical-mid',
        expected: { verticalAlign: 'middle' }
      },
      {
        input: 'align-btm',
        expected: { verticalAlign: 'bottom' }
      },
      {
        input: 'v-base',
        expected: { verticalAlign: 'baseline' }
      },
      {
        input: 'vertical-text-top',
        expected: { verticalAlign: 'text-top' }
      },
      {
        input: 'align-text-bottom',
        expected: { verticalAlign: 'text-bottom' }
      },
      {
        input: 'v-sub',
        expected: { verticalAlign: 'sub' }
      },
      {
        input: 'v-super',
        expected: { verticalAlign: 'super' }
      }
    ]

    testCases.forEach(({ input, expected }) => {
      it(`should transform ${input} to correct style object`, () => {
        const rule = align.find(([matcher]) =>
          typeof matcher === 'string' ? matcher === input : input.match(matcher)
        )

        expect(rule).toBeDefined()
        if (!rule) return

        const [matcher, handler] = rule
        let result

        if (matcher instanceof RegExp) {
          const match = input.match(matcher)
          expect(match).toBeTruthy()
          if (match && typeof handler === 'function') {
            result = handler(match)
          }
        } else if (typeof handler === 'function') {
          result = handler([input])
        } else {
          result = handler
        }

        expect(result).toEqual(expected)
      })
    })

    it('should handle invalid vertical align values', () => {
      const input = 'vertical-invalid'
      const rule = align.find(([matcher]) =>
        typeof matcher === 'string' ? matcher === input : input.match(matcher)
      )

      expect(rule).toBeDefined()
      if (!rule) return

      const [matcher, handler] = rule
      const match = input.match(matcher as RegExp)

      if (match && typeof handler === 'function') {
        const result = handler(match)
        expect(result).toEqual({ verticalAlign: 'invalid' })
      }
    })

    describe('negative cases', () => {
      it('should not match invalid vertical align patterns', () => {
        const invalidCases = [
          'vertical',
          'v',
          'align',
          'verticaltop',
          'valign-top',
          'top-vertical',
          'align_bottom',
          'v.top',
          'alignbottom'
        ]

        invalidCases.forEach(input => {
          const verticalRule = align.find(([matcher]) => matcher instanceof RegExp)
          expect(verticalRule).toBeDefined()
          if (!verticalRule) return

          const [regex] = verticalRule
          if (input.match(regex as RegExp)) {
            console.log(`Unexpected match for "${input}"`)
          }
          expect(input.match(regex as RegExp)).toBeFalsy()
        })
      })

      it('should handle invalid values for valid patterns', () => {
        const validPatternsWithInvalidValues = [
          {
            input: 'vertical-invalid',
            expected: { verticalAlign: 'invalid' }
          },
          {
            input: 'align-unknown',
            expected: { verticalAlign: 'unknown' }
          },
          {
            input: 'v-notexist',
            expected: { verticalAlign: 'notexist' }
          }
        ]

        validPatternsWithInvalidValues.forEach(({ input, expected }) => {
          const verticalRule = align.find(([matcher]) => matcher instanceof RegExp)
          expect(verticalRule).toBeDefined()
          if (!verticalRule) return

          const [regex, handler] = verticalRule
          const match = input.match(regex as RegExp)
          expect(match).toBeTruthy()

          if (match && typeof handler === 'function') {
            const result = handler(match)
            expect(result).toEqual(expected)
          }
        })
      })
    })
  })
})