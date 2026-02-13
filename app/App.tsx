import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Exibicao from './screens/Exibicao';
import Form from './screens/Formulario';
import VerPerfis from './screens/VerPerfis';

export type RootStackParamList = {
  Formulario: undefined;
  VerPerfis: undefined;
  Exibicao: {
    id: string;
    userName: string;
    userEmail: string;
    userBio: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Formulario">
         <Stack.Screen name="Formulario" component={Form} />
         <Stack.Screen name="VerPerfis" component={VerPerfis} options={{ title: 'Perfis Salvos' }} />
         <Stack.Screen name="Exibicao" component={Exibicao} options={{ title: 'Detalhes do Perfil' }} />
    </Stack.Navigator>
  );
}