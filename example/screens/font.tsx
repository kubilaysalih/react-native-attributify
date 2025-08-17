import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function FontScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView>
        {/* Font Weights */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Font Weights
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="16" font-thin mb="8">font-thin - Thin Weight (100)</Text>
            <Text text="16" font-extralight mb="8">font-extralight - Extra Light (200)</Text>
            <Text text="16" font-light mb="8">font-light - Light Weight (300)</Text>
            <Text text="16" font-normal mb="8">font-normal - Normal Weight (400)</Text>
            <Text text="16" font-medium mb="8">font-medium - Medium Weight (500)</Text>
            <Text text="16" font-semibold mb="8">font-semibold - Semibold (600)</Text>
            <Text text="16" font-bold mb="8">font-bold - Bold Weight (700)</Text>
            <Text text="16" font-extrabold mb="8">font-extrabold - Extra Bold (800)</Text>
            <Text text="16" font-black>font-black - Black Weight (900)</Text>
          </View>
        </View>

        {/* Font Styles */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Font Styles
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="16" font-not-italic mb="8">font-not-italic - Normal Style</Text>
            <Text text="16" font-italic mb="8">font-italic - Italic Style</Text>
          </View>
        </View>

        {/* Font Weight with Attribute */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Font Weight with Attribute
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="16" font-weight="100" mb="8">font-weight="100"</Text>
            <Text text="16" font-weight="300" mb="8">font-weight="300"</Text>
            <Text text="16" font-weight="500" mb="8">font-weight="500"</Text>
            <Text text="16" font-weight="700" mb="8">font-weight="700"</Text>
            <Text text="16" font-weight="900">font-weight="900"</Text>
          </View>
        </View>

        {/* Font Style with Attribute */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Font Style with Attribute
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="16" font-style="normal" mb="8">font-style="normal"</Text>
            <Text text="16" font-style="italic">font-style="italic"</Text>
          </View>
        </View>

        {/* Font Family */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Font Family
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="16" font-family="Arial" mb="8">font-family="Arial"</Text>
            <Text text="16" font-family="Helvetica" mb="8">font-family="Helvetica"</Text>
            <Text text="16" font-family="Times-New-Roman">font-family="Times-New-Roman"</Text>
          </View>
        </View>

        {/* Combined Font Properties */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Combined Font Properties
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="16" font="bold italic" mb="8">font="bold italic"</Text>
            <Text text="16" font="semibold family-Arial" mb="8">font="semibold family-Arial"</Text>
            <Text text="16" font="light italic family-Helvetica" mb="8">font="light italic family-Helvetica"</Text>
            <Text text="16" font="extrabold family-Times-New-Roman">font="extrabold family-Times-New-Roman"</Text>
          </View>
        </View>

        {/* Mixed with Text Properties */}
        <View p="16">
          <Text text="18 bold" mb="12">
            Mixed with Text Properties
          </Text>
          <View bg="#f5f5f5" p="16">
            <Text text="20 red" font-bold mb="8">text="20 red" font-bold</Text>
            <Text text="18 blue" font-italic mb="8">text="18 blue" font-italic</Text>
            <Text text="16 green" font-semibold font-family="Arial" mb="8">text="16 green" font-semibold font-family="Arial"</Text>
            <Text text="14 purple" font="bold italic">text="14 purple" font="bold italic"</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
