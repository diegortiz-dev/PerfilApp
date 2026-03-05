# Explicação Detalhada do Módulo de Storage

## 📦 Visão Geral

Este arquivo é o **módulo de persistência de dados** do aplicativo. Ele é responsável por **salvar, carregar, atualizar e remover perfis de usuários** no dispositivo, usando armazenamento local. Funciona como uma "mini base de dados" que sobrevive ao fechamento do app.

---

## 1. Importação da Biblioteca

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";
```

### O que é?

- **AsyncStorage** é uma biblioteca de armazenamento **assíncrono**, **persistente** e **não criptografado** do tipo **chave-valor** (key-value).
- Funciona de forma semelhante ao `localStorage` do navegador, mas adaptado para React Native.

### Por que é necessário?

- Em apps mobile, **não existe `localStorage`** como no navegador. O AsyncStorage é a alternativa padrão para React Native.
- É **assíncrono** porque operações de leitura/escrita em disco podem demorar, e bloquear a thread principal travaria a interface do usuário.
- Os dados são salvos **no disco do dispositivo**, então persistem mesmo se o app for fechado ou o celular reiniciado.

---

## 2. Definição do Tipo `Perfil`

```typescript
export type Perfil = {
  id: string;
  nome: string;
  email: string;
  bio: string;
};
```

### O que é?

- É uma **definição de tipo do TypeScript** que descreve a estrutura de um perfil.
- `export` torna o tipo disponível para outros arquivos importarem.

### Campos:

| Campo   | Tipo     | Propósito                                                        |
| ------- | -------- | ---------------------------------------------------------------- |
| `id`    | `string` | Identificador único do perfil (para localizar, editar ou remover) |
| `nome`  | `string` | Nome do usuário                                                  |
| `email` | `string` | E-mail do usuário                                                |
| `bio`   | `string` | Biografia/descrição do usuário                                   |

### Por que é necessário?

- O TypeScript usa tipos para **garantir segurança em tempo de desenvolvimento**. Se você tentar acessar `perfil.telefone`, o editor vai alertar que esse campo não existe.
- Padroniza a estrutura dos dados em todo o aplicativo — todos os arquivos que importarem `Perfil` saberão exatamente quais campos esperar.

---

## 3. Chave de Armazenamento

```typescript
const STORAGE_KEY = "perfis";
```

### O que é?

- Uma **constante** que define a chave (key) usada no AsyncStorage.
- O AsyncStorage funciona como um dicionário: você salva e busca dados usando uma chave textual.

### Por que é necessário?

- **Centralizar a chave em uma constante** evita erros de digitação. Se você escrevesse `"perfis"` em um lugar e `"Perfis"` em outro, os dados não seriam encontrados.
- Se precisar mudar a chave no futuro, basta alterar em **um único lugar**.

---

## 4. Função `salvarPerfil`

```typescript
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
```

### Passo a passo:

1. **`async function`** → A função é assíncrona porque usa `await` para esperar operações de disco.

2. **`Promise<Perfil>`** → O retorno é uma Promise que, quando resolvida, entrega um objeto do tipo `Perfil`. Isso acontece porque funções `async` sempre retornam Promises.

3. **`const perfis = await carregarPerfis()`** → Primeiro, carrega **todos os perfis já salvos**. Isso é necessário porque o AsyncStorage armazena um **valor único por chave**. Não dá para "adicionar" ao que já existe — é preciso ler tudo, adicionar o novo item ao array, e salvar tudo de volta.

4. **`id: Date.now().toString()`** → Gera um ID único usando o **timestamp atual em milissegundos** (ex: `"1709654321000"`). Convertido para string para manter consistência com o tipo `Perfil`. É uma forma simples de gerar IDs únicos — como cada milissegundo produz um número diferente, a chance de colisão é mínima em uso normal.

5. **`perfis.push(novoPerfil)`** → Adiciona o novo perfil ao final do array existente.

6. **`JSON.stringify(perfis)`** → Converte o array de objetos JavaScript em uma **string JSON**. Isso é **obrigatório** porque o AsyncStorage **só armazena strings**. Exemplo:

   ```json
   [{"id":"1709654321000","nome":"João","email":"joao@mail.com","bio":"Dev"}]
   ```

7. **`AsyncStorage.setItem(STORAGE_KEY, ...)`** → Salva a string no disco, associada à chave `"perfis"`.

8. **`return novoPerfil`** → Retorna o perfil criado para que a tela que chamou a função possa usá-lo (ex: exibir confirmação, atualizar a lista).

9. **`try/catch`** → Captura qualquer erro que possa acontecer (disco cheio, dados corrompidos, etc.). O `console.error` registra o erro para debug, e o `throw error` propaga o erro para que a tela possa tratar (ex: mostrar um alerta ao usuário).

---

## 5. Função `carregarPerfis`

```typescript
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
```

### Passo a passo:

1. **`Promise<Perfil[]>`** → Retorna uma Promise que resolve em um **array de perfis**.

2. **`AsyncStorage.getItem(STORAGE_KEY)`** → Busca o valor associado à chave `"perfis"`. Retorna `null` se nada foi salvo ainda.

3. **`if (textoSalvo !== null)`** → Verifica se existe algo salvo. Na **primeira vez** que o app roda, não existe nada, então retornaria `null`.

4. **`JSON.parse(textoSalvo) as Perfil[]`** → Faz a operação inversa do `JSON.stringify`: converte a string JSON de volta para um array de objetos JavaScript. O `as Perfil[]` é um **type assertion** do TypeScript que diz ao compilador: "confie em mim, isso é um array de Perfil".

5. **`return []`** (no `if` e no `catch`) → Se não há dados salvos ou se ocorreu um erro, retorna um **array vazio** em vez de lançar um erro. Isso é uma **decisão de design defensiva**: é melhor a tela mostrar "nenhum perfil" do que o app crashar.

### Por que o tratamento de erro é diferente aqui?

- Nas outras funções, o `catch` faz `throw error` (repropaga o erro).
- Aqui, retorna `[]` porque esta função é **chamada por outras funções** (como `salvarPerfil`). Se ela quebrasse, **todas** as outras funções quebrariam em cascata.

---

## 6. Função `removerPerfil`

```typescript
export async function removerPerfil(id: string): Promise<void> {
  try {
    const perfis = await carregarPerfis();
    const novaLista = perfis.filter((perfil) => perfil.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  } catch (error) {
    console.error("Erro ao remover o perfil:", error);
    throw error;
  }
}
```

### Passo a passo:

1. **`Promise<void>`** → Retorna uma Promise que não carrega valor algum (`void`). A função não precisa retornar nada — ela só precisa **executar a remoção**.

2. **`carregarPerfis()`** → Carrega todos os perfis existentes (mesma lógica: precisa ler tudo porque o AsyncStorage não suporta remoção parcial).

3. **`perfis.filter((perfil) => perfil.id !== id)`** → Cria um **novo array** contendo **todos os perfis exceto** o que tem o `id` passado como parâmetro. O `filter` percorre cada perfil e mantém apenas os que **não** correspondem ao ID a ser removido.

4. **`setItem`** → Salva o novo array (sem o perfil removido) de volta no AsyncStorage, **sobrescrevendo** o anterior.

### Por que usar `filter` e não `splice`?

- `filter` é **imutável** — cria um novo array sem modificar o original. Isso é uma boa prática em React/React Native porque evita efeitos colaterais inesperados.
- `splice` modificaria o array original, o que poderia causar bugs se alguma outra parte do código ainda estivesse usando a referência antiga.

---

## 7. Função `limparTodosPerfis`

```typescript
export async function limparTodosPerfis(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar os perfis:", error);
    throw error;
  }
}
```

### Passo a passo:

1. **`AsyncStorage.removeItem(STORAGE_KEY)`** → Remove **completamente** a chave `"perfis"` e seu valor do armazenamento. Diferente de `setItem(STORAGE_KEY, "[]")` (que salvaria um array vazio), `removeItem` **apaga** a entrada por completo.

### Por que `removeItem` e não `setItem("[]")`?

- `removeItem` é mais limpo: libera o espaço de armazenamento totalmente.
- Quando `carregarPerfis` for chamada depois, `getItem` retornará `null`, e a função já trata isso retornando `[]`.

---

## 8. Função `atualizarPerfil`

```typescript
export async function atualizarPerfil(id: string, nome: string, email: string, bio: string): Promise<void> {
  try {
    const perfis = await carregarPerfis();
    const index = perfis.findIndex((perfil) => perfil.id === id);
    if (index !== -1) {
      perfis[index] = { id, nome, email, bio };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(perfis));
    } else {
      throw new Error("Perfil não encontrado");
    }
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", error);
    throw error;
  }
}
```

### Passo a passo:

1. **`carregarPerfis()`** → Carrega todos os perfis.

2. **`findIndex((perfil) => perfil.id === id)`** → Procura o **índice** (posição no array) do perfil que tem o ID desejado. Retorna `-1` se não encontrar.

3. **`if (index !== -1)`** → Verifica se o perfil foi encontrado. `-1` é o valor padrão do `findIndex` quando nenhum elemento satisfaz a condição.

4. **`perfis[index] = { id, nome, email, bio }`** → Substitui o perfil antigo pelo novo com os dados atualizados. A sintaxe `{ id, nome, email, bio }` é uma **shorthand do ES6** — equivale a `{ id: id, nome: nome, email: email, bio: bio }`.

5. **`throw new Error("Perfil não encontrado")`** → Se o perfil não existe, lança um erro explícito. Isso é importante para que a tela saiba que algo deu errado e possa informar o usuário.

### Por que `findIndex` e não `find`?

- `find` retorna o **objeto** encontrado, mas para substituí-lo no array, precisamos saber sua **posição** (índice).
- Com o índice, podemos fazer `perfis[index] = novoValor` diretamente.

---

## 🔄 Fluxo Geral de Dados

```
┌─────────────────────────────────────────────────┐
│                  Tela do App                     │
│    (chama as funções exportadas)                 │
└───────────┬────────────────────┬────────────────┘
            │                    │
            ▼                    ▼
    salvarPerfil()        carregarPerfis()
    atualizarPerfil()     removerPerfil()
    limparTodosPerfis()
            │                    │
            ▼                    ▼
┌─────────────────────────────────────────────────┐
│     JSON.stringify() ◄──► JSON.parse()          │
│     (objeto → texto)     (texto → objeto)       │
└───────────┬────────────────────┬────────────────┘
            │                    │
            ▼                    ▼
┌─────────────────────────────────────────────────┐
│              AsyncStorage                        │
│   Chave: "perfis"                               │
│   Valor: '[{"id":"1","nome":"João",...}]'        │
│              (disco do dispositivo)              │
└─────────────────────────────────────────────────┘
```

---

## 🧠 Conceitos-Chave Resumidos

| Conceito              | Por que é usado                                                          |
| --------------------- | ------------------------------------------------------------------------ |
| `async/await`         | Operações de disco são lentas; sem isso, a UI travaria                   |
| `try/catch`           | Operações de I/O podem falhar (disco cheio, dados corrompidos)           |
| `JSON.stringify/parse`| AsyncStorage só armazena strings; objetos precisam ser convertidos       |
| `export`              | Permite que outros arquivos do projeto usem essas funções                |
| TypeScript types      | Garante que todos os perfis tenham a mesma estrutura                     |
| Constante `STORAGE_KEY` | Evita erros de digitação e centraliza a configuração                  |
| Padrão CRUD           | O arquivo implementa Create, Read, Update e Delete completo             |
