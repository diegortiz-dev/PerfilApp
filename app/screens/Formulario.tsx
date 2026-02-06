import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

type RootStackParamList = { Formulario: undefined; Exibicao: { userName: string; userEmail: string; userBio: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Formulario'>;

function EmailValido(userEmail: string) {
    return /\S+@\S+\.\S+/.test(userEmail);
  }

  function Validacao(userName: string, userEmail: string): boolean {
    
    if (!userName || !userEmail) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return false;
    }

    if (!EmailValido(userEmail)) {
      Alert.alert('Erro', 'Digite um email válido');
      return false;
    }

    return true;
  }


export default function HomeScreen({ navigation }: Props) {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário</Text>
      <TextInput value={name} onChangeText={setName} style= {styles.input} placeholder="Digite seu nome"/>
      <TextInput value={email} keyboardType="email-address" onChangeText={setEmail} style= {styles.input} placeholder="Digite seu email"/>
      <TextInput value={bio} onChangeText={setBio} style= {styles.input} placeholder="Digite sua bio"/>
      <Button
        title="Enviar Dados" 
        onPress={() => { if (Validacao(name, email)) { navigation.navigate('Exibicao', { userName: name, userEmail: email, userBio: bio }) } }}
      />
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
    }

        
    });