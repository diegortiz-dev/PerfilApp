import AsyncStorage from "@react-native-async-storage/async-storage";

export type Perfil = {
  id: string;
  nome: string;
  email: string;
  bio: string;
};

const STORAGE_KEY = "perfis";

export async function salvarPerfil(name: string, email: string, bio: string): Promise<Perfil> {
  try {
    const perfis = await carregarPerfis();
    const novoPerfil: Perfil = {
      id: Date.now().toString(),
      nome: name,
      email: email,
      bio: bio,
    };
    perfis.push(novoPerfil);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(perfis));
    return novoPerfil;
  } catch (error) {
    console.error("Erro ao salvar o perfil:", error);
    throw error;
  }
}

export async function carregarPerfis(): Promise<Perfil[]> {
  try {
    const textoSalvo = await AsyncStorage.getItem(STORAGE_KEY);
    if (textoSalvo !== null) {
      return JSON.parse(textoSalvo) as Perfil[];
    }
    return [];
  } catch (error) {
    console.error("Erro ao carregar os perfis:", error);
    return [];
  }
}

export async function removerPerfil(id: string): Promise<void> {
  try {
    const perfis = await carregarPerfis();
    const novaLista = perfis.filter((p) => p.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  } catch (error) {
    console.error("Erro ao remover o perfil:", error);
    throw error;
  }
}

export async function limparTodosPerfis(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar os perfis:", error);
    throw error;
  }
}

