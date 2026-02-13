import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native';
import { removerPerfil, atualizarPerfil } from '../src/services/storage';
import { RootStackParamList } from '../App';
import {useState} from 'react';


type Props = NativeStackScreenProps<RootStackParamList, 'Exibicao'>;

export default function Exibicao({ route, navigation }: Props) {
  const { id, userName, userEmail, userBio } = route.params;

  const [editando, setEditando] =useState(false);
  const [nome, setNome] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [bio, setBio] = useState(userBio);

  function handleRemover() {
    Alert.alert('Remover', 'Deseja remover este perfil?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          removerPerfil(id).then(() => {
            navigation.goBack();
          });
        },
      },
    ]);
  }
  function handleSalvarEdicao() {
    if (!nome || !email) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }
    atualizarPerfil(id, nome, email, bio).then(() => {
      Alert.alert('Sucesso', 'Perfil atualizado!');
      setEditando(false);
      navigation.goBack();
    });
  }

return (
    <View style={styles.tela}>
      <View style={styles.card}>
        <Text style={styles.title}>Perfil</Text>

        {editando ? (
          <>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome" />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
            <TextInput style={styles.input} value={bio} onChangeText={setBio} placeholder="Bio" />
          </>
        ) : (
          <>
            <Text style={styles.infos}>{nome}</Text>
            <Text style={styles.infos}>{email}</Text>
            <Text style={styles.infos}>{bio}</Text>
          </>
        )}

        {editando ? (
          <>
            <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvarEdicao}>
              <Text style={styles.botaoTexto}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCancelar} onPress={() => {
              setNome(userName);
              setEmail(userEmail);
              setBio(userBio);
              setEditando(false);
            }}>
              <Text style={styles.botaoTexto}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.botaoEditar} onPress={() => setEditando(true)}>
              <Text style={styles.botaoTexto}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoLimpar} onPress={handleRemover}>
              <Text style={styles.botaoTexto}>Remover Perfil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({

    tela: {
        flex:2,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#e9feffff"
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:20,
        textAlign:"center",
        paddingBottom:50,
        color:"#3a3a3aff"
    },
    input:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        
    },
    infos:{
        fontSize:20,
        marginBottom:10,
        color:"#333333ff"
    },
    card:{
      width:'90%',
      backgroundColor:'#bbc6ffff',
      padding:45,
      borderRadius:20,
    },
    botaoLimpar:{
      backgroundColor: '#E53935',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 20,
      alignItems: 'center'
    },
    botaoTexto:{
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
    botaoEditar: {
      backgroundColor: '#2196F3',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 12,
      alignItems: 'center'
    },
    botaoSalvar: {
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 20,
      alignItems: 'center'
    },
    botaoCancelar: {
      backgroundColor: '#757575',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center'
    },
 
    });