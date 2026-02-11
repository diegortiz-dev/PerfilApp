import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Formulario: undefined; Exibicao: { userName: string; userEmail: string; userBio: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Exibicao'>;

export default function Exibicao({route }: Props) {
  const { userName, userEmail, userBio } = route.params;

  return (
    <View style= {styles.tela}>
      <View style={styles.card}>
        <Text style={styles.title}>Seu Perfil</Text>
        <Text style={styles.infos}>{userName}</Text>
        <Text style={styles.infos}>{userEmail}</Text>
        <Text style={styles.infos}>{userBio}</Text>
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
     
    }
 
    });