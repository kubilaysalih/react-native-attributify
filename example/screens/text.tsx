import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function TextScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView>
        {/* Font Sizes */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Font Sizes
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="12">text="12" - Small Text</Text>
            <Text text="14">text="14" - Regular Text</Text>
            <Text text="16">text="16" - Medium Text</Text>
            <Text text="18">text="18" - Large Text</Text>
            <Text text="20">text="20" - Bigger Text</Text>
            <Text text="24">text="24" - Heading Text</Text>
          </View>
        </View>

        {/* Colors */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Colors
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="red 16">text="red 16" - Red Text</Text>
            <Text text="blue 16">text="blue 16" - Blue Text</Text>
            <Text text="#FF5733 16">text="#FF5733 16" - Custom Color</Text>
            <Text text="green 16">text="green 16" - Green Text</Text>
            <Text text="purple 16">text="purple 16" - Purple Text</Text>
          </View>
        </View>

        {/* Combined Styles */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Combined Styles
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="red 24 bold">text="red 24 bold"</Text>
            <Text text="blue 20 italic">text="blue 20 italic"</Text>
            <Text text="#444 18 bold">text="#444 18 bold"</Text>
            <Text text="green 16 underline">text="green 16 underline"</Text>
          </View>
        </View>

        {/* Weight Examples */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Font Weights
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="16 bold">text="16 bold"</Text>
            <Text text="16 semibold">text="16 semibold"</Text>
            <Text text="16 medium">text="16 medium"</Text>
            <Text text="16 light">text="16 light"</Text>
          </View>
        </View>

        {/* Common Use Cases */}
        <View p="16">
          <Text text="18 bold" mb="12">
            Common Use Cases
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="24 bold #333">Heading</Text>
            <Text text="16 #666">Regular paragraph text that can be longer and might wrap to multiple lines showing how the text looks in a real context.</Text>
            <Text text="14 #999">Small caption text</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}