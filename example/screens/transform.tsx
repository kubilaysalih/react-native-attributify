import { View, Text, ScrollView, SafeAreaView } from 'react-native'

export default function TransformScreen() {
  return (
    <SafeAreaView flex="1" bg="white">
      <ScrollView flex="1" p="16">
        <Text text="24 bold" mb="16">Transform Examples</Text>

        {/* Translate */}
        <Text text="18 bold" mb="12">Translate</Text>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="translateX(-1/2)">
            <Text color="white">{'<View transform="translateX(-1/2)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="translateY(-1/2)">
            <Text color="white">{'<View transform="translateY(-1/2)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="translateX(100px)">
            <Text color="white">{'<View transform="translateX(100px)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="translateY(-50px)">
            <Text color="white">{'<View transform="translateY(-50px)">'}</Text>
          </View>
        </View>

        {/* Scale */}
        <Text text="18 bold" mb="12">Scale</Text>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="scale(1.5)">
            <Text color="white">{'<View transform="scale(1.5)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="scale(0.5)">
            <Text color="white">{'<View transform="scale(0.5)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="scaleX(1.5)">
            <Text color="white">{'<View transform="scaleX(1.5)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="scaleY(0.5)">
            <Text color="white">{'<View transform="scaleY(0.5)">'}</Text>
          </View>
        </View>

        {/* Rotate */}
        <Text text="18 bold" mb="12">Rotate</Text>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="rotate(45deg)">
            <Text color="white">{'<View transform="rotate(45deg)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="rotate(90deg)">
            <Text color="white">{'<View transform="rotate(90deg)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="rotate(-45deg)">
            <Text color="white">{'<View transform="rotate(-45deg)">'}</Text>
          </View>
        </View>

        {/* Skew */}
        <Text text="18 bold" mb="12">Skew</Text>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="skewX(30deg)">
            <Text color="white">{'<View transform="skewX(30deg)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="skewX(-30deg)">
            <Text color="white">{'<View transform="skewX(-30deg)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="skewY(30deg)">
            <Text color="white">{'<View transform="skewY(30deg)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="skewY(-30deg)">
            <Text color="white">{'<View transform="skewY(-30deg)">'}</Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View bg="#4299e1" p="16" w="100" h="100" transform="skewX(30deg) skewY(30deg)">
            <Text color="white">{'<View transform="skewX(30deg) skewY(30deg)">'}</Text>
          </View>
        </View>

        {/* Multiple Transforms */}
        <Text text="18 bold" mb="12">Multiple Transforms</Text>

        <View bg="#f5f5f5" p="16" mb="16">
          <View
            bg="#4299e1"
            p="16"
            w="100"
            h="100"
            transform="scale(1.5) translateX(-1/2) rotate(45deg)"
          >
            <Text color="white">
              {'<View transform="\n  scale(1.5)\n  translateX(-1/2)\n  rotate(45deg)\n"/>'}
            </Text>
          </View>
        </View>

        <View bg="#f5f5f5" p="16" mb="16">
          <View
            bg="#4299e1"
            p="16"
            w="100"
            h="100"
            transform="translateX(-1/2) skewX(30deg) rotate(45deg)"
          >
            <Text color="white">
              {'<View transform="\n  translateX(-1/2)\n  skewX(30deg)\n  rotate(45deg)\n"/>'}
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}