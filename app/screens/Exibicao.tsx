import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Formulario: undefined; Exibicao: { userName: string; userEmail: string; userBio: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Exibicao'>;

export default function Exibicao({route }: Props) {
  const { userName, userEmail, userBio } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Perfil</Text>
      <Text style={styles.infos}>{userName}</Text>
      <Text style={styles.infos}>{userEmail}</Text>
      <Text style={styles.infos}>{userBio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#f0f0f0"
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:20
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
        marginBottom:10

    }
 
    });