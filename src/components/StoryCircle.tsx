import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Story } from '../types';

interface StoryCircleProps {
  item: Story;
}

export default function StoryCircle({ item }: StoryCircleProps) {
  return (
    <View style={styles.container}>
      {/* Simulación del borde degradado rosa/naranja de Instagram */}
      <View style={styles.borderGradient}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {item.username}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  borderGradient: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#ff8501', // Color representativo de tu captura web
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  username: {
    fontSize: 11,
    marginTop: 4,
    color: '#262626',
    maxWidth: 70,
  },
});