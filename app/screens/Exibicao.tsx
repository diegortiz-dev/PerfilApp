import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { carregarDados, limparDados } from '../src/services/storage';

type RootStackParamList = { Formulario: undefined; Exibicao: { userName?: string; userEmail?: string; userBio?: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Exibicao'>;

export default function Exibicao({ route }: Props) {

  const [nome, setNome] = useState(route.params?.userName ?? '');
  const [email, setEmail] = useState(route.params?.userEmail ?? '');
  const [bio, setBio] = useState(route.params?.userBio ?? '');

  useEffect(() => {
    carregarDados().then((usuario) => {
      if (usuario) {
        setNome(usuario.nome);
        setEmail(usuario.email);
        setBio(usuario.bio);
      }
    });
  }, []);

  return (
    <View style={styles.tela}>
      <View style={styles.card}>
        <Text style={styles.title}>Seu Perfil</Text>
        <Text style={styles.infos}>{nome}</Text>
        <Text style={styles.infos}>{email}</Text>
        <Text style={styles.infos}>{bio}</Text>
        <TouchableOpacity 
          style={styles.botaoLimpar} 
          onPress={() => { limparDados().then(() => { setNome(''); setEmail(''); setBio(''); }) }}
        >
          <Text style={styles.botaoTexto}>Limpar Dados</Text>
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