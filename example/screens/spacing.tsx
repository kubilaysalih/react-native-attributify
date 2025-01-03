import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function SpacingScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView flex="1">
        {/* Basic Padding Examples */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Basic Padding</Text>

          <View bg="#f5f5f5" mb="10">
            <View p="10" bg="#e3e3e3">
              <Text>Uniform Padding (10)</Text>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View p="10">\n  <Text>Content</Text>\n</View>'}</Text>
            </View>
          </View>

          <View bg="#f5f5f5" mb="10">
            <View px="20" py="10" bg="#e3e3e3">
              <Text>Horizontal 20, Vertical 10</Text>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View px="20" py="10">\n  <Text>Content</Text>\n</View>'}</Text>
            </View>
          </View>

          <View bg="#f5f5f5" mb="10">
            <View pt="15" pr="20" pb="10" pl="25" bg="#e3e3e3">
              <Text>Individual Padding Sides</Text>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View pt="15" pr="20" pb="10" pl="25">\n  <Text>Content</Text>\n</View>'}</Text>
            </View>
          </View>
        </View>

        {/* Margin Examples */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Margin Variations</Text>

          <View bg="#f5f5f5" mb="10">
            <View m="10" bg="#e3e3e3" p="10">
              <Text>Uniform Margin (10)</Text>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View m="10">\n  <Text>Content</Text>\n</View>'}</Text>
            </View>
          </View>

          <View bg="#f5f5f5" mb="10">
            <View mx="20" my="10" bg="#e3e3e3" p="10">
              <Text>Horizontal 20, Vertical 10 Margins</Text>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View mx="20" my="10">\n  <Text>Content</Text>\n</View>'}</Text>
            </View>
          </View>

          <View bg="#f5f5f5" mb="10">
            <View mt="15" mr="20" mb="10" ml="25" bg="#e3e3e3" p="10">
              <Text>Individual Margin Sides</Text>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View mt="15" mr="20" mb="10" ml="25">\n  <Text>Content</Text>\n</View>'}</Text>
            </View>
          </View>
        </View>

        {/* Combination Examples */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Padding and Margin Combinations</Text>

          <View bg="#f5f5f5" mb="10">
            <View p="10" m="5" bg="#e3e3e3">
              <Text>Padding 10, Margin 5</Text>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View p="10" m="5">\n  <Text>Content</Text>\n</View>'}</Text>
            </View>
          </View>

          <View bg="#f5f5f5" mb="10">
            <View px="15" py="10" mx="20" my="5" bg="#e3e3e3">
              <Text>Varied Padding and Margin</Text>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View px="15" py="10" mx="20" my="5">\n  <Text>Content</Text>\n</View>'}</Text>
            </View>
          </View>
        </View>

        {/* Nested Spacing */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Nested Spacing</Text>

          <View bg="#f5f5f5" p="10">
            <View bg="#e3e3e3" p="10" mb="10">
              <Text>Outer Container</Text>
              <View bg="#d3d3d3" p="5" mt="5">
                <Text>Nested Container</Text>
              </View>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View p="10">\n  <View p="10" mb="10">\n    <Text>Outer</Text>\n    <View p="5" mt="5">\n      <Text>Inner</Text>\n    </View>\n  </View>\n</View>'}</Text>
            </View>
          </View>
        </View>

        {/* Complex Layout */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Complex Spacing Layout</Text>

          <View flex="col">
            <View bg="#f5f5f5" p="10" mb="10">
              <View flex="row" justify-between>
                <View flex="1" mr="10" bg="#e3e3e3" p="10">
                  <Text>Left Panel</Text>
                </View>
                <View flex="2" bg="#d3d3d3" p="10">
                  <Text>Right Panel</Text>
                </View>
              </View>
            </View>
            <View p="10">
              <Text style={{ color: '#666' }}>Example Usage:</Text>
              <Text>{'<View flex="col">\n  <View flex="row" justify-between>\n    <View flex="1" mr="10" p="10">\n      <Text>Left</Text>\n    </View>\n    <View flex="2" p="10">\n      <Text>Right</Text>\n    </View>\n  </View>\n</View>'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}