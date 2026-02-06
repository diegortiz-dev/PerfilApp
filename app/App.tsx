import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Form from './screens/Formulario';
import Exibicao from './screens/Exibicao';


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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Formulario">
           <Stack.Screen name="Formulario" component={Form} />
           <Stack.Screen name="Exibicao" component={Exibicao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}