import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { carregarPerfis, removerPerfil, limparTodosPerfis, Perfil } from '../src/services/storage';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'VerPerfis'>;

export default function VerPerfis({ navigation }: Props) {
  const [perfis, setPerfis] = useState<Perfil[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarPerfis().then(setPerfis);
    }, [])
  );

  function handleRemover(id: string) {
    Alert.alert('Remover', 'Deseja remover este perfil?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          removerPerfil(id).then(() => {
            setPerfis((prev) => prev.filter((p) => p.id !== id));
          });
        },
      },
    ]);
  }

  function handleLimparTodos() {
    Alert.alert('Limpar Tudo', 'Deseja remover todos os perfis?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar',
        style: 'destructive',
        onPress: () => {
          limparTodosPerfis().then(() => setPerfis([]));
        },
      },
    ]);
  }

  function renderCard({ item }: { item: Perfil }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Exibicao', {
            id: item.id,
            userName: item.nome,
            userEmail: item.email,
            userBio: item.bio,
          })
        }
      >
        <Text style={styles.cardNome}>{item.nome}</Text>
        <Text style={styles.cardEmail}>{item.email}</Text>
        {item.bio ? <Text style={styles.cardBio}>{item.bio}</Text> : null}
        <TouchableOpacity style={styles.botaoRemover} onPress={() => handleRemover(item.id)}>
          <Text style={styles.botaoRemoverTexto}>Remover</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {perfis.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Text style={styles.vazioTexto}>Nenhum perfil salvo ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={perfis}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          contentContainerStyle={styles.lista}
        />
      )}
      {perfis.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={handleLimparTodos}>
          <Text style={styles.botaoLimparTexto}>Limpar Todos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  lista: {
    padding: 16,
  },
  card: {
    backgroundColor: '#bbc6ffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 14,
  },
  cardNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a3a3a',
    marginBottom: 4,
  },
  cardEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  cardBio: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  botaoRemover: {
    alignSelf: 'flex-end',
    backgroundColor: '#E53935',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 8,
  },
  botaoRemoverTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vazioTexto: {
    fontSize: 18,
    color: '#999',
  },
  botaoLimpar: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoLimparTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
