import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { CatPost, Story } from '../types';
import PostCard from '../components/PostCard';
import StoryCircle from '../components/StoryCircle';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [posts, setPosts] = useState<CatPost[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Traemos 15 gatos (Mínimo requerido de 10)
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=15');
      
      // Mapeamos los gatos inyectando los datos de tus capturas web
      const formattedPosts: CatPost[] = response.data.map((item: any, index: number) => ({
        id: item.id,
        url: item.url,
        username: `cat_${item.id.slice(0, 4).toLowerCase()}`,
        avatar: `https://picsum.photos/id/${index + 10}/200`,
        location: ['Buenos Aires, Argentina', 'Cat Land', 'Adoption Center', 'The Box'][index % 4],
        likes: Math.floor(Math.random() * 5000) + 100,
        caption: 'A cute cat presentation from my previous project! 🐾😻',
        isLiked: false,
        comments: [
          { id: '1', username: 'ddianapark', text: 'Nice cat!' },
          { id: '2', username: 'jazberlin', text: 'So cute!' },
          { id: '3', username: 'ortalmagro', text: 'I want one!' }
        ]
      }));

      // Creamos la lista de stories exacta a tu mockup
      const mockStories: Story[] = [
        { id: 's1', username: 'user_354', avatar: 'https://placekitten.com/150/150' },
        { id: 's2', username: 'user_3f6', avatar: 'https://placekitten.com/160/160' },
        { id: 's3', username: 'user_7j4', avatar: 'https://placekitten.com/170/170' },
        { id: 's4', username: 'user_aqc', avatar: 'https://placekitten.com/180/180' },
        { id: 's5', username: 'user_ctp', avatar: 'https://placekitten.com/190/190' },
        { id: 's6', username: 'user_d54', avatar: 'https://placekitten.com/200/200' },
        { id: 's7', username: 'Persian', avatar: 'https://placekitten.com/210/210' },
      ];

      setPosts(formattedPosts);
      setStories(mockStories);
    } catch (error) {
      console.error('Error fetching data from Cat API:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoryCircle item={item} />}
        contentContainerStyle={styles.storiesList}
      />
      {/* Botón rápido para ir al Perfil emulado de Manon como pide el TP */}
      <TouchableOpacity 
        style={styles.profileNavButton} 
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.profileNavButtonText}>Ver Perfil de @manon 👤</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard 
            post={item} 
            onPressImage={() => navigation.navigate('Detail', { post: item })} 
          />
        )}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
    paddingBottom: 10,
  },
  storiesList: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  profileNavButton: {
    margin: 10,
    backgroundColor: '#0095f6',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  profileNavButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});