import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CatPost, Story } from '../types';
import PostCard from '../components/PostCard';
import StoryCircle from '../components/StoryCircle';
import * as apiCalls from '../../services/apiCalls';
import Loader from '../components/Loader';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any, 'HomeScreen'>;
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
      const [catsForPosts, catsForStories] = await Promise.all([
        apiCalls.getCats(9),
        apiCalls.getCats(7)
      ]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const formattedPosts: CatPost[] = catsForPosts.map((cat: any, index: number) => ({
        id: cat.id,
        url: cat.url,
        username: `cat_${cat.id.slice(0, 4).toLowerCase()}`,
        avatar: cat.url,
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
      const formattedStories: Story[] = catsForStories.map((cat: any) => ({
        id: cat.id as string,
        username: (cat.breeds?.[0]?.name || `user_${cat.id}`) as string,
        avatar: cat.url as string
      }))

      setPosts(formattedPosts)
      setStories(formattedStories)
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
      <TouchableOpacity 
        style={styles.profileNavButton} 
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Text style={styles.profileNavButtonText}>Ver Perfil de @manon 👤</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <PostCard 
            post={item} 
            onPressImage={() => navigation.navigate('DetailScreen', { post: item })} 
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