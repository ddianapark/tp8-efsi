import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import * as apiCalls from '../../services/apiCalls';
import { CatPost } from '../types';
import Loader from '../components/Loader';

const { width } = Dimensions.get('window');
const itemSize = width / 3;

export default function ProfileScreen() {
  const [posts, setPosts] = useState<CatPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catsForPosts] = await Promise.all([ apiCalls.getCats(9) ]);
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
      setPosts(formattedPosts)
    } catch (error) {
      console.error('Error fetching data from Cat API:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Fila Principal de Info */}
      <View style={styles.profileRow}>
        <Image 
          source={require('../../assets/manon.jpg')}
          style={styles.profilePic} 
        />
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>41</Text>
            <Text style={styles.statLabel}>followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>17</Text>
            <Text style={styles.statLabel}>following</Text>
          </View>
        </View>
      </View>

      {/* Nombre y Biografía de tu Captura */}
      <View style={styles.bioContainer}>
        <Text style={styles.profileName}>@manon</Text>
        <Text style={styles.bioText}>Hello and welcome!</Text>
        <Text style={styles.bioText}>This is my profile and there are lots of cats! 😻</Text>
      </View>

      {/* Botón de Editar Perfil */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>

      {/* Tab bar del perfil simulada */}
      <View style={styles.tabBarSimulated}>
        <Text style={styles.tabActive}>POSTS</Text>
        <Text style={styles.tabInactive}>REELS</Text>
        <Text style={styles.tabInactive}>SAVED</Text>
      </View>
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
        numColumns={3}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.gridImage} />
        )}
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
    padding: 15,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  statsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  bioContainer: {
    marginTop: 12,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  bioText: {
    fontSize: 13,
    color: '#262626',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 15,
  },
  editButtonText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  tabBarSimulated: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
    marginTop: 20,
    paddingTop: 10,
  },
  tabActive: {
    fontWeight: 'bold',
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
  tabInactive: {
    fontSize: 12,
    color: '#8e8e8e',
  },
  gridImage: {
    width: itemSize - 2,
    height: itemSize - 2,
    margin: 1,
  },
});