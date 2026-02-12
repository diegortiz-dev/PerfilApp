import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarDados(name: string, email: string, bio: string) {
  try {
    const usuario = { nome: name, email: email, bio: bio };
    await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
    throw error;
  }
}

export async function carregarDados() {
  try {
    const textoSalvo = await AsyncStorage.getItem("usuario");

    if (textoSalvo !== null) {
      const usuario = JSON.parse(textoSalvo);
      return usuario; 
    }

    return null; 
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    return null;
  }
}
export async function limparDados() {
  try {
    await AsyncStorage.removeItem("usuario");
  } catch (error) {
    console.error("Erro ao limpar os dados:", error);
    throw error;
  }
}

