import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import BottomTabNavigator from './BottomNavigation'; 
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

import Logo from '../components/icons/Logo';
import NotificationsIcon from '../components/icons/NotificationsIcon';
import MessagesIcon from '../components/icons/MessagesIcon';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="Tabs" 
        component={BottomTabNavigator} 
        options={() => ({
          headerLeft: () => (
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          ),
          headerTitle: '',
          headerRight: () => (
            <View style={styles.rightIconsContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <NotificationsIcon />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={() => ({
          headerLeft: () => (
            <View style={styles.logoContainer}>
              <Logo />
            </View>
          ),
          headerTitle: '',
          headerRight: () => (
            <View style={styles.rightIconsContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <NotificationsIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MessagesIcon />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen 
        name="DetailScreen" 
        component={DetailScreen} 
        options={{ title: 'Publicación' }}
      />
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ title: 'Perfil' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  logoContainer: {
    paddingLeft: 10,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  iconButton: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});