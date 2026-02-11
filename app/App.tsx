import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Exibicao from './screens/Exibicao';
import Form from './screens/Formulario';


type RootStackParamList = {
  Formulario:undefined;
  Exibicao:{
    userName:string;
    userEmail:string;
    userBio:string
  };

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Formulario">
         <Stack.Screen name="Formulario" component={Form} />
         <Stack.Screen name="Exibicao" component={Exibicao} />
    </Stack.Navigator>
  );
}