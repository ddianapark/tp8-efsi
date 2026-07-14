import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CatPost } from '../types';
import PostActions from './PostActions';

interface PostCardProps {
  post: CatPost;
  onPressImage: () => void;
}

export default function PostCard({ post, onPressImage }: PostCardProps) {
  const [likesCount, setLikesCount] = useState(post.likes);

  return (
    <View style={styles.container}>
      {/* Header del Post */}
      <View style={styles.header}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
      </View>

      {/* Imagen Principal (Navega al detalle al tocarla) */}
     <TouchableOpacity activeOpacity={0.9} onPress={onPressImage}>
        <Image 
          source={{ uri: post.url }} 
          style={styles.postImage}
        />
    </TouchableOpacity>

      {/* Barra de Acciones */}
      <PostActions likesCount={likesCount} setLikesCount={setLikesCount} />

      {/* Información Inferior */}
      <View style={styles.footer}>
        <Text style={styles.likesText}>{likesCount.toLocaleString()} Me gusta</Text>
        <Text style={styles.caption}>
          <Text style={styles.usernameCaption}>{post.username} </Text>
          {post.caption}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerText: {
    flexDirection: 'column',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  location: {
    fontSize: 11,
    color: '#666',
  },
  footer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  likesText: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
  },
  usernameCaption: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 380,
  },
});