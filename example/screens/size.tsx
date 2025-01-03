import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function SizingScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView flex="1">
        {/* Width Variations */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Width Variations</Text>

          {/* Fixed Width */}
          <View mb="10">
            <Text mb="5">Fixed Width</Text>
            <View w="200" bg="#f5f5f5" p="10">
              <Text>Width 200</Text>
            </View>
            <Text mt="5" text="12 #666666">
              {'<View w="200">'}
            </Text>
          </View>

          {/* Percentage Width */}
          <View mb="10">
            <Text mb="5">Percentage Width</Text>
            <View w="50%" bg="#f5f5f5" p="10">
              <Text>50% Width</Text>
            </View>
            <Text mt="5" text="12 #666666">
              {'<View w="50%">'}
            </Text>
          </View>

          {/* Full Width */}
          <View mb="10">
            <Text mb="5">Full Width</Text>
            <View w="full" bg="#f5f5f5" p="10">
              <Text>Full Width</Text>
            </View>
            <Text mt="5" text="12 #666666">
              {'<View w="full">'}
            </Text>
          </View>
        </View>

        {/* Size Combinations */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Size Combinations</Text>

          {/* Uniform Size */}
          <View mb="10">
            <Text mb="5">Uniform Size</Text>
            <View size="100" bg="#f5f5f5" />
            <Text mt="5" text="12 #666666">
              {'<View size="100">'}
            </Text>
          </View>

          {/* Width x Height */}
          <View mb="10">
            <Text mb="5">Width x Height</Text>
            <View size="200 x 150" bg="#f5f5f5" />
            <Text mt="5" text="12 #666666">
              {'<View size="200 x 150">'}
            </Text>
          </View>

          {/* Separate Width and Height */}
          <View mb="10">
            <Text mb="5">Separate Width and Height</Text>
            <View size="200 300" bg="#f5f5f5" />
            <Text mt="5" text="12 #666666">
              {'<View size="200 300">'}
            </Text>
          </View>
        </View>

        {/* Min/Max Dimensions */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Min/Max Dimensions</Text>

          {/* Minimum Width */}
          <View mb="10">
            <Text mb="5">Minimum Width</Text>
            <View min-w="100" w="50%" bg="#f5f5f5" p="10">
              <Text>Minimum 100, Flexible Width</Text>
            </View>
            <Text mt="5" text="12 #666666">
              {'<View min-w="100" w="50%">'}
            </Text>
          </View>

          {/* Maximum Height */}
          <View mb="10">
            <Text mb="5">Maximum Height</Text>
            <View max-h="200" bg="#f5f5f5" p="10">
              <Text>Maximum Height 200</Text>
            </View>
            <Text mt="5" text="12 #666666">
              {'<View max-h="200">'}
            </Text>
          </View>
        </View>

        {/* Aspect Ratio */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Aspect Ratios</Text>

          {/* Square Aspect */}
          <View mb="10">
            <Text mb="5">Square Aspect</Text>
            <View w="200" aspect="square" bg="#f5f5f5" />
            <Text mt="5" text="12 #666666">
              {'<View w="200" aspect="square">'}
            </Text>
          </View>

          {/* Video Aspect */}
          <View mb="10">
            <Text mb="5">Video Aspect</Text>
            <View w="300" aspect="video" bg="#f5f5f5" />
            <Text mt="5" text="12 #666666">
              {'<View w="300" aspect="video">'}
            </Text>
          </View>

          {/* Custom Aspect Ratio */}
          <View mb="10">
            <Text mb="5">Custom Aspect Ratio</Text>
            <View w="250" aspect="4/3" bg="#f5f5f5" />
            <Text mt="5" text="12 #666666">
              {'<View w="250" aspect="4/3">'}
            </Text>
          </View>
        </View>

        {/* Complex Layout */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">Complex Sizing Layout</Text>

          <View flex="row" justify-between>
            <View
              w="45%"
              h="200"
              aspect="1/1"
              bg="#f5f5f5"
              items-center
              justify-center
            >
              <Text>Responsive Box</Text>
            </View>

            <View
              w="45%"
              h="200"
              aspect="video"
              bg="#e3e3e3"
              items-center
              justify-center
            >
              <Text>Video-like Box</Text>
            </View>
          </View>
          <Text mt="5" text="12 #666666">
            {`<View
  w="45%"
  h="200"
  aspect="1/1" // or aspect="video"
>`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}