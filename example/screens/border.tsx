import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function BorderScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView>
        {/* Basic Border */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Basic Border
          </Text>
          <View bg="#f5f5f5" p="16">
            <View flex-row flex-wrap>
              <View b="1" bg="white" p="16" m="4">
                <Text>b="1"</Text>
              </View>
              <View b="2" bg="white" p="16" m="4">
                <Text>b="2"</Text>
              </View>
              <View border="4" bg="white" p="16" m="4">
                <Text>b="4"</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Border Colors */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Border Colors
          </Text>
          <View bg="#f5f5f5" p="16">
            <View flex-row flex-wrap>
              <View b="2 #4a90e2" bg="white" p="16" m="4">
                <Text>b="2 #4a90e2"</Text>
              </View>
              <View b="2 red" bg="white" p="16" m="4">
                <Text>b="2 red"</Text>
              </View>
              <View b="2 rgba(0,255,0,0.5)" bg="white" p="16" m="4">
                <Text>b="2 rgba(0,255,0,0.5)"</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Border Styles */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Border Styles
          </Text>
          <View bg="#f5f5f5" p="16">
            <View flex-row flex-wrap>
              <View b="2 solid" bg="white" p="16" m="4">
                <Text>b="2 solid"</Text>
              </View>
              <View b="2 dashed" bg="white" p="16" m="4">
                <Text>b="2 dashed"</Text>
              </View>
              <View b="2 dotted" bg="white" p="16" m="4">
                <Text>b="2 dotted"</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Border Radius */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Border Radius
          </Text>
          <View bg="#f5f5f5" p="16">
            <View flex-row flex-wrap>
              <View b="2" r-4 bg="white" p="16" m="4">
                <Text>r-4</Text>
              </View>
              <View b="2" r-8 bg="white" p="16" m="4">
                <Text>r-8</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Directional Borders */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Directional Borders
          </Text>
          <View bg="#f5f5f5" p="16">
            <View flex-row flex-wrap>
              <View bt="2 red" bg="white" p="16" m="4">
                <Text>bt="2 red"</Text>
              </View>
              <View br="2 blue" bg="white" p="16" m="4">
                <Text>br="2 blue"</Text>
              </View>
              <View bb="2 green" bg="white" p="16" m="4">
                <Text>bb="2 green"</Text>
              </View>
              <View bl="2 purple" bg="white" p="16" m="4">
                <Text>bl="2 purple"</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Combined Styles */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Combined Styles
          </Text>
          <View bg="#f5f5f5" p="16">
            <View flex-row flex-wrap>
              <View b="2 dashed #4a90e2" r-8 bg="white" p="16" m="4">
                <Text>b="2 dashed #4a90e2" r-8</Text>
              </View>
              <View bt="2 solid red" bb="2 solid blue" bg="white" p="16" m="4">
                <Text>bt="2 solid red" bb="2 solid blue"</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Shorthand Examples */}
        <View p="16">
          <Text text="18 bold" mb="12">
            Shorthand Examples
          </Text>
          <View bg="#f5f5f5" p="16">
            <View flex-row flex-wrap>
              <View b="#eaeaea 2" bg="white" p="16" m="4">
                <Text>b="#eaeaea 2"</Text>
              </View>
              <View b="r-4 #4a90e2 2 dashed" bg="white" p="16" m="4">
                <Text>b="r-4 #4a90e2 2 dashed"</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
