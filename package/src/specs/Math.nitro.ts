import type { HybridObject } from 'react-native-nitro-modules'

// TODO: Export specs that extend HybridObject<...> here
export interface Math extends HybridObject<{ ios: 'c++'; android: 'c++' }> {
  readonly pi: number
  add(a: number, b: number): number
  numberToString(value: number): string
}
