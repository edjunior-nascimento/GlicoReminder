import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import AddGlicemiaScreen from './screens/AddGlicemiaScreen';

type HomeDrawerParamList = {
  Home: undefined;
};

type RootStackParamList = {
  HomeDrawer: undefined;
  AddGlicemia: undefined;
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeDrawerNavigator() {
  return (
    <Drawer.Navigator id="main-drawer">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          drawerLabel: 'Home',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <NavigationContainer>
        <Stack.Navigator id="root-stack">
          <Stack.Screen
            name="HomeDrawer"
            component={HomeDrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddGlicemia"
            component={AddGlicemiaScreen}
            options={{
              headerTitle: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  );
}