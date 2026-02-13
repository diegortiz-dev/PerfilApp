import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { removerPerfil } from '../src/services/storage';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Exibicao'>;

export default function Exibicao({ route, navigation }: Props) {
  const { id, userName, userEmail, userBio } = route.params;

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

  return (
    <View style={styles.tela}>
      <View style={styles.card}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.infos}>{userName}</Text>
        <Text style={styles.infos}>{userEmail}</Text>
        <Text style={styles.infos}>{userBio}</Text>
        <TouchableOpacity style={styles.botaoLimpar} onPress={handleRemover}>
          <Text style={styles.botaoTexto}>Remover Perfil</Text>
        </TouchableOpacity>
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
        width: '80%',
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 5
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
    }
 
    });