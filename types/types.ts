/* eslint-disable @typescript-eslint/no-explicit-any */
export type StyleValueType = string | number

export interface StyleObject {
  [key: string]: StyleValueType
}

export type StyleValue = string | number

export type StyleGenerator = (match: Array<string>) => StyleObject

export type PatternHandler = StyleObject | StyleGenerator

export type Pattern = [string | RegExp, StyleObject | ((match: any) => StyleObject)]

export interface AttributifyConfig {
  presets: Array<Pattern[] | (() => Pattern[])>
  prefix: string
}

export type StyleHandler = StyleObject | ((match: any) => StyleObject)

export type StylePattern = [string | RegExp, StyleHandler]

export type Matcher = string | RegExp
