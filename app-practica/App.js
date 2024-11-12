import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen'; 
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import ConfiguracionScreen from './screens/SettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen'; // Pantalla de Notificaciones

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Configuración del Drawer (menú hamburguesa)
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ title: 'Inicio', headerShown: false }} // Oculta el encabezado en MainScreen
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Drawer.Screen name="Configuracion" component={ConfiguracionScreen} options={{ title: 'Configuración' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="DrawerMenu" 
          component={DrawerNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Notifications" 
          component={NotificationsScreen} 
          options={{ title: 'Notificaciones' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
