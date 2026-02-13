# PerfilApp

Aplicativo mobile feito com **React Native** e **Expo** para cadastro e exibição de perfil de usuário.

## 📱 Funcionalidades

- Formulário para cadastro de nome, email e bio
- Validação de campos obrigatórios e formato de email
- Exibição dos dados do perfil em um card estilizado
- Persistência dos dados com AsyncStorage
- Opção de limpar os dados salvos

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (SDK 54)
- [React Navigation](https://reactnavigation.org/) (Stack Navigator)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- TypeScript

## 📂 Estrutura do Projeto

```
app/
├── App.tsx              # Navegação principal (Stack Navigator)
├── index.tsx            # Entry point
├── screens/
│   ├── Formulario.tsx   # Tela de cadastro
│   └── Exibicao.tsx     # Tela de exibição do perfil
└── src/
    ├── styles.tsx       # Estilos compartilhados
    └── services/
        └── storage.ts   # Funções de persistência (AsyncStorage)
```

## 🚀 Como Rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o projeto:

   ```bash
   npx expo start --tunnel
   ```

3. Escaneie o QR Code com o app **Expo Go** no celular ou use um emulador.

## 📄 Licença

Este projeto é de uso livre para fins educacionais.