import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const itemSize = width / 3;

// Simulamos las imágenes de gatos que Manon tiene publicadas
const mockProfilePosts = [
  { id: 'p1', url: 'https://placekitten.com/300/300' },
  { id: 'p2', url: 'https://placekitten.com/301/301' },
  { id: 'p3', url: 'https://placekitten.com/302/302' },
  { id: 'p4', url: 'https://placekitten.com/303/303' },
  { id: 'p5', url: 'https://placekitten.com/304/304' },
  { id: 'p6', url: 'https://placekitten.com/305/305' },
  { id: 'p7', url: 'https://placekitten.com/306/306' },
  { id: 'p8', url: 'https://placekitten.com/307/307' },
  { id: 'p9', url: 'https://placekitten.com/308/308' },
];

export default function ProfileScreen() {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Fila Principal de Info */}
      <View style={styles.profileRow}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' }} // Avatar similar a tu captura
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockProfilePosts}
        keyExtractor={(item) => item.id}
        numColumns={3} // Requisito mandatorio del TP
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