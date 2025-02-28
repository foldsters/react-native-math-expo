import { NitroModules } from 'react-native-nitro-modules'
import type { Math } from './specs/Math.nitro'

// TODO: Export all HybridObjects here for the user
export const MathModule = NitroModules.createHybridObject<Math>('Math')
