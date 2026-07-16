import HomeIcon from '../components/icons/HomeIcon';
import ReelsIcon from '../components/icons/ReelsIcon';
import MessagesIcon from '../components/icons/MessagesIcon';
import SearchIcon from '../components/icons/SearchIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Vistas temporales rápidas para evitar crasheos
const FakeScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <Text>{name} Screen 🚀</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={({ state, navigation }) => (
        <View style={styles.floatingWrapper}>
          <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const renderIcon = () => {
                switch (route.name) {
                  case 'Home': return <HomeIcon />;
                  case 'Reels': return <ReelsIcon />;
                  case 'Messages': return <MessagesIcon />;
                  case 'Search': return <SearchIcon />;
                  case 'Profile': return <ProfileIcon />;
                  default: return null;
                }
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  style={styles.tabButton}
                  activeOpacity={0.7}
                >
                  <View style={!isFocused ? styles.inactiveIcon : null}>
                    {renderIcon()}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reels" children={() => <FakeScreen name="Reels" />} />
      <Tab.Screen name="Messages" children={() => <FakeScreen name="Messages" />} />
      <Tab.Screen name="Search" children={() => <FakeScreen name="Search" />} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: '90%',
    maxWidth: 400,
    height: 54,
    borderRadius: 27,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  inactiveIcon: {
    opacity: 0.6,
  },
});