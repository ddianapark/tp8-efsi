import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Story } from '../types';

interface StoryCircleProps {
  item: Story;
}

export default function StoryCircle({ item }: StoryCircleProps) {
  return (
    <View style={styles.container}>
      {/* Simulación del borde degradado rosa/naranja de Instagram */}
      <LinearGradient
        colors={['#f9d423', '#ff4e50', '#f857a6', '#b300a7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.borderGradient}
      >
        <View style={styles.borderInner}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        </View>
      </LinearGradient>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  borderInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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