<p align="center">
  <img src="https://raw.githubusercontent.com/kubilaysalih/react-native-attributify/refs/heads/main/attributify.png" alt="React Native Attributify" />
</p>

# React Native Attributify [Alpha]

> ⚠️ **Alpha Status**: This project is currently in alpha stage. While core features are working, you might encounter bugs or performance issues. Please test thoroughly before using in production.

React Native Attributify is a utility-first styling system for React Native, bringing the power of atomic CSS to React Native development. Inspired by the simplicity of UnoCSS, the flexibility of Tailwind CSS, and the developer experience of NativeWind.

## Inspiration & Core Concepts

This project draws inspiration from several innovative projects:

- **UnoCSS**: Atomic CSS engine approach and attributify mode
- **Tailwind CSS**: Utility-first philosophy and class naming conventions
- **NativeWind**: React Native integration patterns and optimizations
- **Windi CSS**: Attributify mode concept and dynamic variant generation

## Features

### Core Features
- 🚀 Zero Runtime CSS-in-JS
- 🎯 TypeScript Support
- 💪 Auto-Completion
- 🎨 Style Composition
- 📦 Multiple Presets

### Style Categories
- Flexbox & Layout
- Spacing & Sizing
- Colors & Backgrounds
- Typography
- Borders & Shadows
- Position & Display
- And more...

## Installation

```bash
# Using npm
npm install react-native-attributify

# Using yarn
yarn add react-native-attributify
```

## Setup

### TypeScript Configuration
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "jsx": "react-native",
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "node_modules/react-native-attributify/presets/native/index.d.ts"
  ]
}
```

### Babel Configuration
```js
const attributify = require('react-native-attributify/babel');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [attributify],
  };
};
```

## Configuration

Create an `attributify.config.js` file in your project root:

```ts
const { nativePreset } = require('react-native-attributify/presets');

const config = {
  // Optional prefix for generated style names
  prefix: 'myapp_',

  // Presets to use
  presets: [nativePreset()]
};

module.exports = config;
```

### Configuration Options

#### `prefix`
- Type: `string`
- Default: `''`
- Description: Prefix for generated style names in StyleSheet.create

#### `presets`
- Type: `Array`
- Default: `[]`
- Description: Array of presets to use. Built-in presets include:
  - `nativePreset`: Core React Native styles
  - `layoutPreset`: Flexbox and layout utilities

#### Example with Multiple Presets
```ts
const { nativePreset, layoutPreset } = require('react-native-attributify/presets');

const config = {
  prefix: 'myapp_',
  presets: [
    nativePreset()
  ]
};

module.exports = config;
```

## Available Presets

### Layout Preset
Core layout utilities:
```tsx
<View
  flex="1 center"       // Flex with center alignment
  justify="between"     // Space-between
  items="center"        // Center items
  p="4"                 // Padding
  m="t-2"               // Margin top
/>
```

### Native Preset
React Native specific utilities:
```tsx
<View
  bg="white"           // Background color
  rounded="lg"         // Border radius
  opacity="75"         // Opacity
/>
```

## Style Categories

### Layout & Flexbox
```tsx
<View
  flex="1"              // Basic flex
  flex="row"            // Direction
  flex="1 center"       // Flex with alignment
  items="center"        // Align items
  justify="between"     // Justify content
  wrap="wrap"           // Flex wrap
/>
```

### Spacing
```tsx
<View
  p="4"                // All sides padding
  px="4"               // Horizontal padding
  py="2"               // Vertical padding
  m="4"                // All sides margin
  mt="4"               // Top margin
  mb="2"               // Bottom margin
/>
```

### Colors & Backgrounds
```tsx
<View
  bg="blue-500"         // Background color
  bg="white opacity-75" // With opacity
  opacity="50"          // Standalone opacity
/>

<Text
  color="blue-500"      // Text color
  opacity="75"          // Text opacity
/>
```

### Borders
```tsx
<View
  border="1"            // Border width
  border="2 dashed"     // Border style
  border="1 solid red"  // Full border
  rounded="lg"          // Border radius
  rounded="t-lg"        // Top radius
/>
```

### Typography
```tsx
<Text
  text="center"          // Text align
  font="bold"            // Font weight
  size="lg"              // Font size
  color="gray-700"       // Text color
  decoration="underline" // Text decoration
/>
```

## How It Works

### Write This:
```tsx
<View
  flex="1 center"
  bg="white"
  p="4"
  rounded="lg"
  border="1 solid gray-200"
>
  <Text
    text="xl blue-500 center"
    font="bold"
  >
    Hello World
  </Text>
</View>
```

### Compiles To:
```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  myapp_vnb1fo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E5E7EB'
  },
  myapp_2u4wzb: {
    fontSize: 20,
    color: '#3B82F6',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

<View style={styles.myapp_vnb1fo}>
  <Text style={styles.myapp_2u4wzb}>
    Hello World
  </Text>
</View>
```

### Complex Example:

#### Write This:
```tsx
function ProfileCard() {
  return (
    <View
      flex="1"
      bg="white"
      rounded="xl"
      p="4"
      border="1 solid gray-200"
      shadow="lg"
    >
      <Image
        source={require('./avatar.png')}
        size="100"
        rounded="full"
        border="2 solid blue-500"
      />

      <View p="t-4">
        <Text
          text="2xl blue-600 center"
          font="bold"
        >
          John Doe
        </Text>

        <Text text="gray-500 center">
          Software Developer
        </Text>
      </View>

      <TouchableOpacity
        bg="blue-500"
        p="y-2 x-4"
        rounded="lg"
        mt="4"
      >
        <Text text="white center">
          Follow
        </Text>
      </TouchableOpacity>
    </View>
  )
}
```

#### Compiles To:
```tsx
const styles = StyleSheet.create({
  profile_container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3B82F6'
  },
  content: {
    paddingTop: 16
  },
  name: {
    fontSize: 24,
    color: '#2563EB',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    color: '#6B7280',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center'
  }
});
```

## Performance Optimization

- Zero runtime CSS-in-JS overhead
- Compile-time style generation
- StyleSheet.create optimization
- Style deduplication
- Minimal bundle size impact

## Current Status & Known Issues

- Performance optimizations in progress
- Some complex nested styles need refinement
- Hot reload performance being improved
- Build time optimization ongoing

## Upcoming Features

### Style Categories
- [ ] Transform Properties
- [ ] Transitions & Animations
- [ ] Shadows & Elevation
- [ ] Grid System
- [ ] Gradients
- [ ] Platform-Specific Styles

### Core Features
- [ ] Unistyles Support ???
- [ ] Custom Theme Support
- [ ] Style Variants
- [ ] Responsive Styles
- [ ] Dark Mode Support
- [ ] VS Code Extension
- [ ] Better Documentation

## Contributing

We welcome contributions! Since we're in alpha stage, we especially welcome:
- Bug reports with detailed reproduction steps
- Performance improvement suggestions
- Documentation contributions
- Test coverage improvements

## License

MIT License

## Credits

Created by kubilay.
I would like to thank Uğur Tuncel for his hard work for this logo 🥳

## Community & Support

- [GitHub Issues](https://github.com/kubilaysalih/react-native-attributify/issues)
- [Discussions](https://github.com/kubilaysalih/react-native-attributify/discussions)