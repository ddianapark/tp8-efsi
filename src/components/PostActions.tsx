import { SetStateAction, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface PostActionsProps {
    likesCount: number;
    setLikesCount: React.Dispatch<SetStateAction<number>>;
}

const PostActions = ({ likesCount, setLikesCount }: PostActionsProps) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLike = () => {
    if (liked) {
        setLikesCount(likesCount - 1);
    } else {
        setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <View style={styles.postActions}>
        {/* Botón de Like */}
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleLike()}
            style={styles.actionButton}
        >
            <Feather
                name="heart"
                size={22}
                color={liked ? '#ff3040' : '#000000'} // Cambia a rojo si está activo
            />
        </TouchableOpacity>

        {/* Botón de Comentario */}
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCommented((prev) => !prev)}
            style={styles.actionButton}
        >
            <Feather
                name="message-circle"
                size={22}
                color={commented ? '#0095f6' : '#000000'} // Cambia a azul si está activo
            />
        </TouchableOpacity>

        {/* Botón de Enviar (Send) */}
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSent((prev) => !prev)}
            style={styles.actionButton}
        >
            <Feather
                name="send"
                size={22}
                color={sent ? '#1b7226' : '#000000'}
            />
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    postActions: {
        flexDirection: 'row', // En Native todo es flex-direction: column por defecto
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    actionButton: {
        marginRight: 15,
    }
});

export default PostActions;