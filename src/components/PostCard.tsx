import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { CatPost } from '../types';

interface PostCardProps {
  post: CatPost;
  onPressImage: () => void;
}

export default function PostCard({ post, onPressImage }: PostCardProps) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

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
        <Image source={{ uri: post.url }} style={styles.postImage} />
      </TouchableOpacity>

      {/* Barra de Acciones */}
      <View style={styles.actionsBar}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Text style={[styles.iconText, liked && styles.likedIcon]}>
              {liked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressImage} style={styles.actionButton}>
            <Text style={styles.iconText}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.iconText}>✈️</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  postImage: {
    width: '100%',
    height: 380,
    resizeMode: 'cover',
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
  },
  likedIcon: {
    transform: [{ scale: 1.1 }],
  },
  footer: {
    paddingHorizontal: 12,
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
});