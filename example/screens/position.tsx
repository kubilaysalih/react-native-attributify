import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function PositionScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView>
        {/* Basic Position Example */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Basic Position
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View pos-relative h="120" bg="#e3e3e3">
              <View pos-absolute top="4" left="4" bg="#4a90e2" p="16">
                <Text text="white">Top Left</Text>
              </View>
              <View pos-absolute top="4" right="4" bg="#4a90e2" p="16">
                <Text text="white">Top Right</Text>
              </View>
              <View pos-absolute bottom="4" left="4" bg="#4a90e2" p="16">
                <Text text="white">Bottom Left</Text>
              </View>
              <View pos-absolute bottom="4" right="4" bg="#4a90e2" p="16">
                <Text text="white">Bottom Right</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View pos-absolute top="4" left="4">'}
            </Text>
          </View>
        </View>

        {/* Position Types */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Position Types
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View h="80" bg="#e3e3e3" mb="8">
              <View pos-static bg="#4a90e2" p="16">
                <Text text="white">Static (Default)</Text>
              </View>
            </View>
            <Text mt="2" mb="8">
              {'<View pos-static>'}
            </Text>

            <View pos-relative h="80" bg="#e3e3e3" mb="8">
              <View pos-relative top="20" left="20" bg="#4a90e2" p="16">
                <Text text="white">Relative</Text>
              </View>
            </View>
            <Text mt="2" mb="8">
              {'<View pos-relative top="20" left="20">'}
            </Text>

            <View pos-relative h="80" bg="#e3e3e3">
              <View pos-absolute top="4" left="4" bg="#4a90e2" p="16">
                <Text text="white">Absolute</Text>
              </View>
            </View>
            <Text mt="2">
              {'<View pos-absolute top="4" left="4">'}
            </Text>
          </View>
        </View>

        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Short vs Long Syntax
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View pos-relative h="160" bg="#e3e3e3">
              <View pos-absolute top="4" left="4" bg="#2ecc71" p="16">
                <Text text="white">Short: top left</Text>
              </View>
              <View pos-absolute bottom="4" right="4" bg="#2ecc71" p="16">
                <Text text="white">Short: bottom right</Text>
              </View>
            </View>
            <Text mt="8">
              {'Long: <View pos-absolute top="4" left="4">'}
            </Text>
          </View>
        </View>

        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Center Positioning
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View pos-relative h="120" bg="#e3e3e3">
              <View
                pos-absolute
                top="50%"
                left="50%"
                bg="#4a90e2"
                p="16"
              >
                <Text text="white">50% 50%</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View pos-absolute t="50%" l="50%">'}
            </Text>
          </View>
        </View>

        {/* Z-Index and Stacking */}
        <View p="16">
          <Text text="18 bold" mb="12">
            Z-Index and Stacking
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View pos-relative h="120" bg="#e3e3e3">
              <View
                pos-absolute
                top="20"
                left="20"
                bg="#4a90e2"
                p="16"
                z="1"
              >
                <Text text="white">Z-Index: 1</Text>
              </View>
              <View
                pos-absolute
                top="40"
                left="40"
                bg="#2ecc71"
                p="16"
                z="2"
              >
                <Text text="white">Z-Index: 2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View pos-absolute z-2>'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}