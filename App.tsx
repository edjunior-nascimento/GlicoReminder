import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import AddGlicemiaScreen from './src/screens/AddGlicemiaScreen';
import DietaScreen from './src/screens/DietaScreen';
import RefeicaoScreen from './src/screens/RefeicaoScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HomeDrawerParamList = {
  Home: undefined;
  DietaMenu: undefined;
};

type RootStackParamList = {
  HomeDrawer: undefined;
  AddGlicemia: undefined;
  Dieta: undefined;
  Refeicao: { refeicao: string };
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeDrawerNavigator() {
  return (
    <Drawer.Navigator id="main-drawer">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.getParent()?.navigate('Dieta')}
              style={{ marginRight: 16 }}
            >
              <MaterialCommunityIcons name="food-apple-outline" size={24} color="#003d03" />
            </Pressable>
          ),
        })}
      />
      <Drawer.Screen
        name="DietaMenu"
        component={DietaScreen}
        options={{
          headerTitle: '',
          drawerLabel: 'Dieta',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-apple-outline" size={size} color={color} />
          ),
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
          <Stack.Screen
            name="Dieta"
            component={DietaScreen}
            options={{
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="Refeicao"
            component={RefeicaoScreen}
            options={{
              headerTitle: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  );
}