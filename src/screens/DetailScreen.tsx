import { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

interface DetailScreenProps {
  route: RouteProp<{ params: { post: any } }, 'params'>;
}

export default function DetailScreen({ route }: DetailScreenProps) {
  const { post } = route.params;
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    setLiked(!liked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header corto */}
        <View style={styles.header}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{post.username}</Text>
        </View>

        {/* Imagen en Alta definición */}
        <Image source={{ uri: post.url }} style={styles.image} />

        {/* Acciones */}
        <View style={styles.actions}>
          {/* Botón de Like */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleLike}
            style={styles.actionButton}
          >
            <Feather
              name="heart"
              size={22}
              color={liked ? '#ff3040' : '#000000'} // Cambia a rojo si está activo
            />
          </TouchableOpacity>
          <Text style={styles.likesText}>{likesCount.toLocaleString()} Me gusta</Text>
        </View>

        {/* Pie de Post */}
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>
            <Text style={styles.usernameBold}>{post.username} </Text>
            {post.caption}
          </Text>
        </View>

        {/* Listado de comentarios extraídos de tu captura web */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentarios</Text>
          {post.comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Text style={styles.commentText}>
                <Text style={styles.usernameBold}>@{comment.username} </Text>
                {comment.text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  likesText: {
    fontWeight: 'bold',
  },
  captionContainer: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  caption: {
    fontSize: 14,
  },
  usernameBold: {
    fontWeight: 'bold',
  },
  commentsSection: {
    paddingHorizontal: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  commentsTitle: {
    fontSize: 12,
    color: '#8e8e8e',
    marginBottom: 8,
  },
  commentItem: {
    marginBottom: 6,
  },
  commentText: {
    fontSize: 13,
  },
  actionButton: {
    marginRight: 15,
  },
});
