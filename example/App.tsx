import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import FlexScreen from './screens/flex'
import AlignScreen from './screens/align'
import TextScreen from './screens/text'
import BorderScreen from './screens/border'
import PositionScreen from './screens/position'
import SpacingScreen from './screens/spacing'
import SizeScreen from './screens/size'
import TransformScreen from './screens/transform'

type RootStackParamList = {
  Home: undefined;
  Flex: undefined;
  Align: undefined;
  Text: undefined;
  Border: undefined
  Position: undefined
  Spacing: undefined
  Size: undefined
  Transform: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const screens = ['Flex', 'Align', 'Text', 'Border', 'Position', 'Spacing', 'Size', 'Transform'] as const

type ScreenName = typeof screens[number]

const Home = () => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View flex="1">
      <FlatList<ScreenName>
        ItemSeparatorComponent={() => (
          <View h="1" bg="#ddd" />
        )}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              bg="white"
              h="50"
              p="x-10 y-4"
              align-center
              justify-center
              onPress={() => navigation.navigate(item)}
            >
              <Text text="20">{item}</Text>
            </TouchableOpacity>
          )
        }}
        data={screens}
      />
    </View>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined}>
        <Stack.Screen name="Home" component={Home} options={{
          title: '🧑‍🎨 react-native-attributify'
        }} />
        <Stack.Screen name="Flex" component={FlexScreen} />
        <Stack.Screen name="Align" component={AlignScreen} />
        <Stack.Screen name="Text" component={TextScreen} />
        <Stack.Screen name="Border" component={BorderScreen} />
        <Stack.Screen name="Position" component={PositionScreen} />
        <Stack.Screen name="Spacing" component={SpacingScreen} />
        <Stack.Screen name="Size" component={SizeScreen} />
        <Stack.Screen name="Transform" component={TransformScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App