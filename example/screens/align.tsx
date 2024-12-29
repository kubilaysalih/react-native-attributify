import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function AlignScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView flex="1">
        {/* Baseline Example */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Baseline Alignment
          </Text>
          <Text mb="8" text="#666666">
            Aligns text baselines of different sized text
          </Text>
          <View h="80" bg="#f5f5f5" items-center justify-center>
            <View flex-row items-baseline>
              <Text text="32">Large</Text>
              <Text text="16">Small</Text>
              <Text text="24">Medium</Text>
            </View>
          </View>
        </View>

        {/* Center Example */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Center Alignment
          </Text>
          <Text mb="8" text="#666666">
            Centers items vertically within container
          </Text>
          <View h="80" bg="#f5f5f5" items-center justify-center>
            <View flex-row items-center>
              <Text text="32">Large</Text>
              <Text text="16">Small</Text>
              <Text text="24">Medium</Text>
            </View>
          </View>
        </View>

        {/* Top Example */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Top Alignment
          </Text>
          <Text mb="8" text="#666666">
            Aligns items to the top of container
          </Text>
          <View h="80" bg="#f5f5f5" items-center justify-center>
            <View flex-row items-start>
              <Text text="32">Large</Text>
              <Text text="16">Small</Text>
              <Text text="24">Medium</Text>
            </View>
          </View>
        </View>

        {/* Bottom Example */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Bottom Alignment
          </Text>
          <Text mb="8" text="#666666">
            Aligns items to the bottom of container
          </Text>
          <View h="80" bg="#f5f5f5" items-center justify-center>
            <View flex-row items-end>
              <Text text="32">Large</Text>
              <Text text="16">Small</Text>
              <Text text="24">Medium</Text>
            </View>
          </View>
        </View>

        {/* Stretch Example */}
        <View p="16" mb="16">
          <Text text="18 bold" mb="12">
            Stretch Alignment
          </Text>
          <Text mb="8" text="#666666">
            Stretches items to fill the container height
          </Text>
          <View h="80" bg="#f5f5f5" items-center justify-center>
            <View flex-row items-stretch h="50">
              <View justify-center bg="#e3e3e3" p="2" mx="1">
                <Text text="32">Large</Text>
              </View>
              <View justify-center bg="#e3e3e3" p="2" mx="1">
                <Text text="16">Small</Text>
              </View>
              <View justify-center bg="#e3e3e3" p="2" mx="1">
                <Text text="24">Medium</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}