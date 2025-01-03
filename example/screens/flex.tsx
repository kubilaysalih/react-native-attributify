import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function FlexScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView>
        {/* Basic Row Layout */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Basic Direction
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View flex-row>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">3</Text>
              </View>
            </View>
            <Text mt="2">
              {'<View flex-row>'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">3</Text>
              </View>
            </View>
            <Text mt="2">
              {'<View flex="row">'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row-reverse">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">3</Text>
              </View>
            </View>
            <Text mt="2">
              {'<View flex="row-reverse">'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="col">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">3</Text>
              </View>
            </View>
            <Text mt="2">
              {'<View flex="col">'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="col-reverse">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">3</Text>
              </View>
            </View>
            <Text mt="2">
              {'<View flex="col-reverse">'}
            </Text>
          </View>
        </View>

        {/* Justify Content */}
        <View p="16" mb="16">
          <Text mb="12" text="18 bold">
            Justify Content
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View flex-row justify-start>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex-row justify-start>'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row justify-center">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row justify-center">'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex-row justify-center>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex-row justify-center>'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex-row justify-end>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex-row justify-end>'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row justify-end">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row justify-end">'}
            </Text>
          </View>
        </View>

        {/* Align Items */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Align Items
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View flex-row items-start h="100">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex-row items-start>'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row items-start" h="100">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row items-start">'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex-row items-center h="100">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex-row items-center>'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row items-center" h="100">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row items-center">'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex-row items-end h="100">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex-row items-end>'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row items-end" h="100">
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">1</Text>
              </View>
              <View bg="#4a90e2" p="16" m="4">
                <Text text="white">2</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row items-end">'}
            </Text>
          </View>
        </View>

        {/* Flex Grow */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Flex Grow
          </Text>
          <View bg="#f5f5f5" p="16">
            <View flex-row>
              <View flex="1" bg="#4a90e2" p="16" m="4">
                <Text text="white">flex="1"</Text>
              </View>
              <View flex="2" bg="#4a90e2" p="16" m="4">
                <Text text="white">flex="2"</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="1">'}
            </Text>
          </View>
        </View>

        {/* Gap */}
        <View p="16">
          <Text text="18 bold" mb="12">
            Gap
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row gap-8">
              <View bg="#4a90e2" p="16">
                <Text text="white">Left</Text>
              </View>
              <View bg="#4a90e2" p="16">
                <Text text="white">Right</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row gap-8">'}
            </Text>
          </View>
          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row" gap="16">
              <View bg="#4a90e2" p="16">
                <Text text="white">Left</Text>
              </View>
              <View bg="#4a90e2" p="16">
                <Text text="white">Right</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row" gap="16">'}
            </Text>
          </View>
        </View>

        {/* Common Layouts */}
        <View p="16">
          <Text text="18 bold" mb="12">
            Common Layout Pattern
          </Text>
          <View bg="#f5f5f5" p="16" mb="2">
            <View flex-row items-center justify-between>
              <View bg="#4a90e2" p="16">
                <Text text="white">Left</Text>
              </View>
              <View bg="#4a90e2" p="16">
                <Text text="white">Right</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex-row items-center justify-between>'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row items-center justify-between">
              <View bg="#4a90e2" p="16">
                <Text text="white">Left</Text>
              </View>
              <View bg="#4a90e2" p="16">
                <Text text="white">Right</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row items-center justify-between">'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row items-center justify-center">
              <View bg="#4a90e2" p="16">
                <Text text="white">Left</Text>
              </View>
              <View bg="#4a90e2" p="16">
                <Text text="white">Right</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row items-center justify-center">'}
            </Text>
          </View>

          <View bg="#f5f5f5" p="16" mb="2">
            <View flex="row items-center justify-around">
              <View bg="#4a90e2" p="16">
                <Text text="white">Left</Text>
              </View>
              <View bg="#4a90e2" p="16">
                <Text text="white">Right</Text>
              </View>
            </View>
            <Text mt="8">
              {'<View flex="row items-center justify-around">'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}