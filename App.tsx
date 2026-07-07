import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* StatusBar controlada (Dark asegurado para fondo claro) */}
      <StatusBar style="dark" />
      <StackNavigator />
    </NavigationContainer>
  );
}