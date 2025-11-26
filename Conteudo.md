# LISTA PARA FIXAÇÃO DE CONTEÚDO - RESPOSTAS

## QUESTÕES ORIGINAIS

### 1. Em um código Dart a classe `CalculadoraRetanguloApp` herda da super classe `StatelessWidget`. Defina o conceito de imutabilidade se relaciona e é aplicado na arquitetura de um `StatelessWidget` em Flutter?

**Resposta:**

Imutabilidade significa que um objeto não pode ser modificado após sua criação. No Flutter, `StatelessWidget` é imutável porque:

- Uma vez criado, um `StatelessWidget` não pode alterar suas propriedades (propriedades são `final`)
- Quando há necessidade de atualizar a interface, o Flutter cria uma nova instância do widget
- Isso garante que o widget sempre renderiza com os mesmos dados, tornando o código mais previsível e seguro
- A imutabilidade permite otimizações de performance, pois o Flutter pode reutilizar widgets que não mudaram
- `StatelessWidget` é usado quando a interface não precisa de estado interno que mude ao longo do tempo

**Exemplo prático:**
```dart
class MeuWidget extends StatelessWidget {
  final String texto; // final = imutável, não pode ser alterado
  
  MeuWidget(this.texto); // Construtor
  
  @override
  Widget build(BuildContext context) {
    return Text(texto); // Sempre renderiza o mesmo texto
  }
}
```

---

### 2. Em Flutter, a função `main()` chama `runApp(const CalculadoraRetanguloApp());`. Explique o que é a Árvore de Widgets (Widget Tree) no Flutter.

**Resposta:**

A Árvore de Widgets (Widget Tree) é uma estrutura hierárquica que representa todos os widgets do aplicativo Flutter organizados em uma árvore:

- **Raiz da árvore**: O widget passado para `runApp()` (ex: `CalculadoraRetanguloApp`)
- **Estrutura hierárquica**: Cada widget pode ter filhos (children), formando uma árvore
- **Renderização**: O Flutter percorre a árvore de cima para baixo para renderizar a interface
- **Composição**: Widgets são compostos por outros widgets menores (ex: Container > Column > Text)
- **Relacionamento pai-filho**: Widgets pais controlam o layout e posicionamento dos filhos

**Exemplo de estrutura:**
```
CalculadoraRetanguloApp (raiz)
  └── MaterialApp
      └── Scaffold
          ├── AppBar
          └── Column
              ├── TextField
              ├── TextField
              └── ElevatedButton
```

**Características:**
- Cada widget na árvore tem um único pai
- Widgets podem ter múltiplos filhos
- A árvore é reconstruída quando há mudanças de estado
- O Flutter otimiza a reconstrução comparando widgets antigos e novos

---

### 3. Qual o papel do `runApp()` na inicialização da árvore de widget?

**Resposta:**

O `runApp()` é a função que inicializa e inicia o aplicativo Flutter:

- **Ponto de entrada**: É a primeira função chamada para iniciar o app
- **Cria a raiz**: Recebe o widget raiz que será a base de toda a árvore de widgets
- **Inicializa o framework**: Configura o sistema de renderização do Flutter
- **Anexa ao canvas**: Conecta a árvore de widgets à tela do dispositivo
- **Inicia o loop de renderização**: Começa o processo contínuo de desenhar a interface

**Fluxo de execução:**
```dart
void main() {
  runApp(MeuApp()); // 1. Inicializa o app
  // 2. Flutter cria a árvore de widgets
  // 3. Renderiza na tela
  // 4. Inicia o loop de atualização
}
```

**O que acontece internamente:**
1. Cria o `WidgetsBinding` (gerenciador de widgets)
2. Anexa o widget raiz à árvore
3. Chama `build()` no widget raiz
4. Renderiza todos os widgets filhos recursivamente
5. Exibe na tela do dispositivo

---

### 4. O código Flutter usa: `setState(() { _area = resultado; });`. Explique o trecho de código enfatizando o uso do setState.

**Resposta:**

O `setState()` é um método usado em `StatefulWidget` para atualizar o estado e forçar a reconstrução da interface:

- **Atualização de estado**: Notifica o Flutter que o estado interno do widget mudou
- **Reconstrução**: Faz o Flutter chamar `build()` novamente para atualizar a interface
- **Callback**: Recebe uma função que contém as mudanças de estado
- **Sincronização**: Garante que a interface reflete o novo estado

**Como funciona:**
```dart
setState(() {
  _area = resultado; // 1. Atualiza a variável de estado
  // 2. Flutter marca o widget como "sujo" (precisa reconstruir)
  // 3. Flutter chama build() novamente
  // 4. Interface é atualizada com o novo valor
});
```

**Importante:**
- Só pode ser usado dentro de `StatefulWidget`
- Deve envolver todas as mudanças de variáveis de estado
- Não deve ser chamado durante `build()` (causaria loop infinito)
- É assíncrono, mas a reconstrução acontece imediatamente após

**Exemplo completo:**
```dart
class MeuWidget extends StatefulWidget {
  @override
  _MeuWidgetState createState() => _MeuWidgetState();
}

class _MeuWidgetState extends State<MeuWidget> {
  int _contador = 0;
  
  void _incrementar() {
    setState(() {
      _contador++; // Atualiza estado e reconstrói
    });
  }
}
```

---

### 5. O código utiliza a classe `TextEditingController` para gerenciar a entrada de texto. Qual o propósito desta instrução?

**Resposta:**

O `TextEditingController` é uma classe que gerencia o estado e o conteúdo de um campo de texto (`TextField` ou `TextFormField`):

- **Controle de texto**: Permite ler e modificar o texto do campo programaticamente
- **Acesso ao valor**: Fornece acesso ao texto digitado sem depender de callbacks
- **Modificação programática**: Permite alterar o texto do campo via código
- **Validação**: Facilita a validação e formatação do texto digitado
- **Sincronização**: Mantém o texto sincronizado entre o campo e o código

**Uso básico:**
```dart
TextEditingController _controller = TextEditingController();

TextField(
  controller: _controller, // Conecta o controller ao campo
)

// Ler o valor:
String texto = _controller.text;

// Modificar o valor:
_controller.text = "Novo texto";

// Limpar o campo:
_controller.clear();
```

**Vantagens:**
- Acesso direto ao texto sem precisar de `onChanged`
- Pode modificar o texto programaticamente
- Útil para formatação (ex: máscaras de telefone)
- Facilita validação e manipulação de dados

**Ciclo de vida:**
```dart
@override
void dispose() {
  _controller.dispose(); // IMPORTANTE: liberar memória
  super.dispose();
}
```

---

### 6. Descreva corretamente sobre o React Native, considerando a linguagem de programação adotada; suas vantagens e desvantagens.

**Resposta:**

**React Native** é um framework para desenvolvimento de aplicativos móveis multiplataforma criado pelo Facebook (Meta).

**Linguagem de Programação:**
- **JavaScript/TypeScript**: React Native usa JavaScript ou TypeScript
- **JSX**: Sintaxe que permite escrever HTML-like dentro do JavaScript
- **Ecossistema JavaScript**: Aproveita toda a biblioteca de pacotes do npm

**Vantagens:**
1. **Código único para múltiplas plataformas**: Um único código funciona em Android e iOS
2. **Desenvolvimento rápido**: Hot reload permite ver mudanças instantaneamente
3. **Grande comunidade**: Muitos desenvolvedores e bibliotecas disponíveis
4. **Reutilização de código**: Pode compartilhar código com aplicações web React
5. **Performance nativa**: Compila para código nativo, não é um WebView
6. **Acesso a APIs nativas**: Pode acessar recursos do dispositivo (câmera, GPS, etc.)
7. **Curva de aprendizado**: Se você conhece React, já sabe React Native
8. **Atualizações OTA**: Possibilidade de atualizar o app sem passar pela loja (com CodePush)

**Desvantagens:**
1. **Performance**: Pode ser mais lento que apps nativos puros em casos extremos
2. **Dependências nativas**: Algumas funcionalidades podem precisar de código nativo
3. **Tamanho do app**: Apps React Native tendem a ser maiores que apps nativos
4. **Atualizações do sistema**: Pode demorar para suportar novas versões do Android/iOS
5. **Debugging**: Pode ser mais complexo depurar problemas nativos
6. **Bibliotecas de terceiros**: Nem todas as bibliotecas são mantidas ou funcionam bem
7. **Aprendizado**: Requer conhecimento de JavaScript, React e conceitos nativos

**Quando usar React Native:**
- Apps que precisam funcionar em Android e iOS
- Equipes com conhecimento de JavaScript/React
- Prototipagem rápida
- Apps que não precisam de performance extrema

---

### 7. Descreva o comando: `npx @react-native-community/cli init app_calculadora`. Para que serve este comando?

**Resposta:**

Este comando cria um novo projeto React Native do zero.

**Análise do comando:**
- **`npx`**: Ferramenta do npm que executa pacotes sem instalá-los globalmente
- **`@react-native-community/cli`**: CLI (Command Line Interface) oficial do React Native
- **`init`**: Comando para inicializar/criar um novo projeto
- **`app_calculadora`**: Nome do projeto que será criado

**O que o comando faz:**
1. **Cria a estrutura do projeto**: Gera todas as pastas e arquivos necessários
2. **Instala dependências**: Baixa e instala todas as bibliotecas do React Native
3. **Configura o projeto**: Configura Android, iOS, e arquivos de configuração
4. **Inicializa Git**: Cria um repositório Git no projeto
5. **Cria arquivos base**: Gera `App.tsx`, `package.json`, `tsconfig.json`, etc.

**Estrutura criada:**
```
app_calculadora/
├── android/          # Código nativo Android
├── ios/              # Código nativo iOS
├── node_modules/     # Dependências instaladas
├── App.tsx           # Componente principal
├── package.json      # Configuração do projeto
└── ...
```

**Alternativas:**
- `npx react-native init` (versão antiga, não recomendada)
- `npx create-expo-app` (para projetos Expo)

**Requisitos antes de executar:**
- Node.js instalado
- npm ou yarn instalado
- Para Android: Android Studio e SDK
- Para iOS: Xcode (apenas no macOS)

---

## QUESTÕES ADICIONAIS SOBRE REACT NATIVE

### 8. O que é o `useState` no React Native e como ele funciona?

**Resposta:**

`useState` é um Hook do React que permite adicionar estado a componentes funcionais.

**Conceito:**
- **Hook**: Função especial que permite "conectar-se" a recursos do React
- **Estado**: Dados que podem mudar e causam re-renderização do componente
- **Retorna array**: Retorna um array com [valor, função de atualização]

**Sintaxe:**
```javascript
const [estado, setEstado] = useState(valorInicial);
```

**Exemplo prático:**
```javascript
function Contador() {
  const [contador, setContador] = useState(0);
  
  return (
    <View>
      <Text>{contador}</Text>
      <Button onPress={() => setContador(contador + 1)} title="Incrementar" />
    </View>
  );
}
```

**Características:**
- O estado persiste entre re-renderizações
- Atualizar o estado causa re-renderização automática
- Cada chamada de `useState` cria um estado independente
- O valor inicial é usado apenas na primeira renderização

**Regras dos Hooks:**
- Só podem ser chamados no nível superior do componente
- Não podem ser chamados dentro de loops, condições ou funções aninhadas
- Devem ser chamados na mesma ordem a cada renderização

---

### 9. Explique a diferença entre `TextInput` e `Text` no React Native.

**Resposta:**

**`Text`:**
- **Propósito**: Exibe texto na tela (somente leitura)
- **Uso**: Títulos, labels, mensagens, valores exibidos
- **Interação**: Não permite edição pelo usuário
- **Props comuns**: `style`, `numberOfLines`, `onPress`

**Exemplo:**
```javascript
<Text style={styles.titulo}>Bem-vindo!</Text>
```

**`TextInput`:**
- **Propósito**: Campo de entrada de texto (editável)
- **Uso**: Formulários, campos de login, busca
- **Interação**: Permite que o usuário digite e edite texto
- **Props comuns**: `value`, `onChangeText`, `placeholder`, `keyboardType`, `secureTextEntry`

**Exemplo:**
```javascript
<TextInput
  value={usuario}
  onChangeText={setUsuario}
  placeholder="Digite seu nome"
  keyboardType="default"
/>
```

**Diferenças principais:**
| Característica | Text | TextInput |
|---------------|------|-----------|
| Editável | Não | Sim |
| Estado | Não precisa | Precisa de `useState` |
| Teclado | Não aparece | Aparece ao tocar |
| Validação | Não aplicável | Pode validar entrada |

---

### 10. O que é o componente `Alert` no React Native e como utilizá-lo?

**Resposta:**

`Alert` é um componente que exibe diálogos modais (popups) na tela.

**Propósito:**
- Exibir mensagens ao usuário
- Confirmar ações importantes
- Mostrar erros ou avisos
- Solicitar confirmação antes de executar ações

**Métodos principais:**
- `Alert.alert()`: Exibe um alerta simples
- `Alert.prompt()`: Exibe um alerta com campo de entrada (apenas iOS)

**Sintaxe básica:**
```javascript
Alert.alert(titulo, mensagem, botoes, opcoes);
```

**Exemplo simples:**
```javascript
Alert.alert('Sucesso', 'Operação realizada com sucesso!');
```

**Exemplo com botões:**
```javascript
Alert.alert(
  'Confirmar',                    // Título
  'Deseja realmente excluir?',    // Mensagem
  [
    {
      text: 'Cancelar',           // Botão 1
      onPress: () => console.log('Cancelado'),
      style: 'cancel'
    },
    {
      text: 'Excluir',            // Botão 2
      onPress: () => excluirItem(),
      style: 'destructive'        // Estilo destrutivo (vermelho)
    }
  ]
);
```

**Casos de uso:**
- Validação de formulários
- Confirmação de ações destrutivas
- Exibição de erros
- Mensagens de sucesso
- Avisos importantes

---

### 11. Explique o que é `parseFloat()` e por que é necessário ao trabalhar com `TextInput`.

**Resposta:**

`parseFloat()` é uma função JavaScript que converte uma string em um número decimal (ponto flutuante).

**Por que é necessário:**
- `TextInput` sempre retorna uma **string** (texto), mesmo quando o usuário digita números
- Para fazer cálculos matemáticos, precisamos converter a string em número
- `parseFloat()` faz essa conversão

**Sintaxe:**
```javascript
parseFloat(string) // Retorna um número
```

**Exemplo:**
```javascript
const texto = "123.45";
const numero = parseFloat(texto); // 123.45 (número)
```

**No contexto do React Native:**
```javascript
const [metros, setMetros] = useState(''); // Estado é string

const converter = () => {
  const valorMetros = parseFloat(metros); // Converte string para número
  const centimetros = valorMetros * 100;  // Agora pode fazer cálculo
};
```

**Alternativas:**
- `Number()`: Similar ao parseFloat, mas mais estrito
- `parseInt()`: Converte para número inteiro (sem decimais)

**Tratamento de erros:**
```javascript
const valor = parseFloat(texto);
if (isNaN(valor)) {
  // Não é um número válido
  Alert.alert('Erro', 'Digite um número válido!');
}
```

**Diferença entre `parseFloat` e `Number`:**
- `parseFloat("123abc")` retorna `123` (para na primeira letra)
- `Number("123abc")` retorna `NaN` (não aceita caracteres inválidos)

---

### 12. O que é `keyboardType` no `TextInput` e quais são os valores possíveis?

**Resposta:**

`keyboardType` é uma propriedade do `TextInput` que define qual tipo de teclado será exibido quando o usuário tocar no campo.

**Valores possíveis:**
- `default`: Teclado padrão (letras e números)
- `numeric`: Teclado numérico (apenas números)
- `email-address`: Teclado com @ e domínios comuns
- `phone-pad`: Teclado de telefone (números e símbolos de telefone)
- `decimal-pad`: Teclado numérico com ponto decimal
- `number-pad`: Teclado numérico simples (sem ponto decimal)
- `url`: Teclado com barra e domínios comuns

**Exemplo:**
```javascript
// Para números
<TextInput
  keyboardType="numeric"
  placeholder="Digite um número"
/>

// Para email
<TextInput
  keyboardType="email-address"
  placeholder="Digite seu email"
/>

// Para telefone
<TextInput
  keyboardType="phone-pad"
  placeholder="Digite seu telefone"
/>
```

**Importância:**
- Melhora a experiência do usuário
- Reduz erros de digitação
- Facilita a entrada de dados específicos
- Torna o app mais intuitivo

---

### 13. Explique o que é `secureTextEntry` no `TextInput` e quando utilizá-lo.

**Resposta:**

`secureTextEntry` é uma propriedade booleana do `TextInput` que oculta o texto digitado, mostrando apenas pontos ou asteriscos.

**Propósito:**
- Proteger informações sensíveis (senhas, PINs, dados confidenciais)
- Evitar que pessoas vejam o que está sendo digitado
- Segurança e privacidade

**Sintaxe:**
```javascript
<TextInput
  secureTextEntry={true}  // Oculta o texto
  placeholder="Digite sua senha"
/>
```

**Exemplo prático:**
```javascript
const [senha, setSenha] = useState('');

<TextInput
  value={senha}
  onChangeText={setSenha}
  secureTextEntry={true}  // Texto fica oculto: ••••••
  placeholder="Senha"
/>
```

**Quando usar:**
- Campos de senha
- Campos de PIN
- Dados bancários
- Qualquer informação sensível

**Quando NÃO usar:**
- Campos de nome, email, telefone
- Campos que o usuário precisa ver o que está digitando
- Campos de busca ou texto livre

**Comportamento:**
- `true`: Texto oculto (mostra • ou *)
- `false`: Texto visível (padrão)

---

### 14. O que é `StyleSheet.create()` e por que é recomendado usá-lo?

**Resposta:**

`StyleSheet.create()` é uma função que cria um objeto de estilos otimizado para React Native.

**Sintaxe:**
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  texto: {
    fontSize: 16,
    color: '#333',
  }
});
```

**Vantagens:**
1. **Performance**: Estilos são validados e otimizados uma única vez
2. **Validação**: Erros de estilo são detectados em tempo de desenvolvimento
3. **Organização**: Mantém estilos organizados e reutilizáveis
4. **Referência**: Permite referenciar estilos por nome (`styles.container`)
5. **TypeScript**: Melhor suporte a autocomplete e verificação de tipos

**Comparação:**

**❌ Sem StyleSheet (não recomendado):**
```javascript
<View style={{ flex: 1, backgroundColor: '#fff' }} />
// Estilo é criado a cada renderização (menos eficiente)
```

**✅ Com StyleSheet (recomendado):**
```javascript
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }
});
<View style={styles.container} />
// Estilo é criado uma vez e reutilizado
```

**Regras:**
- Estilos são imutáveis (não podem ser modificados após criação)
- Cada propriedade de estilo deve ser válida
- Pode combinar múltiplos estilos usando array: `style={[styles.base, styles.extra]}`

---

### 15. Explique o que é `flex` no React Native e como funciona o layout flexbox.

**Resposta:**

`flex` é uma propriedade de layout que define como um componente se expande ou encolhe para preencher o espaço disponível.

**Conceito Flexbox:**
- Sistema de layout flexível e responsivo
- Permite distribuir espaço entre elementos
- Funciona em uma dimensão por vez (linha ou coluna)

**Valores de `flex`:**
- `flex: 1`: Ocupa todo o espaço disponível
- `flex: 2`: Ocupa o dobro do espaço de um elemento com `flex: 1`
- `flex: 0`: Não cresce, mantém tamanho natural

**Exemplo:**
```javascript
<View style={{ flex: 1 }}>  {/* Ocupa toda a altura */}
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 2, backgroundColor: 'blue' }} />
  {/* Azul ocupa o dobro do espaço do vermelho */}
</View>
```

**Propriedades relacionadas:**
- `flexDirection`: Define direção (row, column)
- `justifyContent`: Alinhamento no eixo principal
- `alignItems`: Alinhamento no eixo secundário
- `flexWrap`: Permite quebra de linha

**Casos de uso:**
- Centralizar conteúdo: `flex: 1, justifyContent: 'center'`
- Dividir espaço igualmente entre elementos
- Criar layouts responsivos

---

### 16. O que é `TouchableOpacity` e qual a diferença para `Button`?

**Resposta:**

`TouchableOpacity` é um componente que torna qualquer elemento tocável (clicável) com feedback visual.

**Características:**
- Permite tornar qualquer componente tocável
- Reduz a opacidade quando pressionado (feedback visual)
- Pode personalizar completamente o conteúdo interno
- Mais flexível que `Button`

**Exemplo:**
```javascript
<TouchableOpacity onPress={() => console.log('Pressionado!')}>
  <Text>Clique aqui</Text>
</TouchableOpacity>
```

**Diferença para `Button`:**

| Característica | TouchableOpacity | Button |
|---------------|------------------|--------|
| Personalização | Total (qualquer conteúdo) | Limitada (apenas texto) |
| Estilo | Controlado por você | Estilo nativo do sistema |
| Feedback | Opacidade reduzida | Estilo nativo |
| Uso | Botões customizados | Botões simples |

**Quando usar cada um:**
- **TouchableOpacity**: Botões customizados, ícones clicáveis, cards tocáveis
- **Button**: Botões simples e rápidos, quando o estilo nativo é aceitável

**Outros componentes similares:**
- `TouchableHighlight`: Muda cor de fundo ao pressionar
- `TouchableWithoutFeedback`: Sem feedback visual
- `Pressable`: Versão mais moderna e flexível

---

### 17. Explique o conceito de "props" no React Native.

**Resposta:**

Props (propriedades) são dados passados de um componente pai para um componente filho.

**Conceito:**
- Props são **imutáveis** (não podem ser alteradas pelo filho)
- Permitem reutilização de componentes
- Tornam componentes configuráveis e dinâmicos

**Sintaxe:**
```javascript
// Componente pai passa props
<MeuComponente nome="João" idade={25} />

// Componente filho recebe props
function MeuComponente(props) {
  return <Text>{props.nome} tem {props.idade} anos</Text>;
}

// Ou usando desestruturação
function MeuComponente({ nome, idade }) {
  return <Text>{nome} tem {idade} anos</Text>;
}
```

**Exemplo prático:**
```javascript
// Componente reutilizável
function BotaoCustomizado({ titulo, cor, onPress }) {
  return (
    <TouchableOpacity 
      style={{ backgroundColor: cor }}
      onPress={onPress}
    >
      <Text>{titulo}</Text>
    </TouchableOpacity>
  );
}

// Uso do componente
<BotaoCustomizado 
  titulo="Salvar" 
  cor="blue" 
  onPress={() => salvar()} 
/>
```

**Características:**
- Props são somente leitura
- Mudanças em props causam re-renderização
- Podem ser qualquer tipo: string, number, function, object, etc.

---

### 18. O que é `SafeAreaView` e por que é importante usá-lo?

**Resposta:**

`SafeAreaView` é um componente que garante que o conteúdo não fique atrás de barras do sistema (notch, status bar, etc.).

**Problema que resolve:**
- Em dispositivos modernos (iPhone X+, Android com notch), o conteúdo pode ficar atrás de barras do sistema
- `SafeAreaView` adiciona padding automaticamente para evitar isso

**Exemplo:**
```javascript
<SafeAreaView style={styles.container}>
  <Text>Este texto não fica atrás da barra de status</Text>
</SafeAreaView>
```

**Quando usar:**
- Sempre que o conteúdo precisa estar visível
- Em telas que ocupam toda a tela
- Para garantir compatibilidade com diferentes dispositivos

**Alternativa:**
- `react-native-safe-area-context`: Biblioteca mais avançada para áreas seguras

**Diferença para `View`:**
- `View`: Não considera áreas seguras
- `SafeAreaView`: Adiciona padding automaticamente nas áreas seguras

---

### 19. Explique o que é `ScrollView` e quando utilizá-lo.

**Resposta:**

`ScrollView` é um componente que permite rolar o conteúdo quando ele é maior que a tela visível.

**Propósito:**
- Permite que o usuário role o conteúdo vertical ou horizontalmente
- Útil quando o conteúdo não cabe na tela
- Suporta gestos de rolagem nativos

**Sintaxe básica:**
```javascript
<ScrollView>
  <Text>Conteúdo longo...</Text>
  <Text>Mais conteúdo...</Text>
  {/* Pode rolar para ver mais */}
</ScrollView>
```

**Props importantes:**
- `contentContainerStyle`: Estilos aplicados ao container do conteúdo
- `showsVerticalScrollIndicator`: Mostra/esconde barra de rolagem vertical
- `keyboardShouldPersistTaps`: Comportamento do teclado ao tocar

**Exemplo:**
```javascript
<ScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
>
  <View style={styles.content}>
    {/* Conteúdo que pode ser maior que a tela */}
  </View>
</ScrollView>
```

**Quando usar:**
- Formulários longos
- Listas de conteúdo
- Telas com muito conteúdo
- Quando o teclado pode cobrir campos

**Alternativa:**
- `FlatList`: Para listas grandes e performáticas (virtualização)

---

### 20. O que significa `trim()` em JavaScript e por que é usado em validações?

**Resposta:**

`trim()` é um método de string que remove espaços em branco no início e no fim da string.

**Sintaxe:**
```javascript
string.trim() // Retorna nova string sem espaços nas extremidades
```

**Exemplo:**
```javascript
const texto = "  Olá Mundo  ";
const limpo = texto.trim(); // "Olá Mundo" (sem espaços nas pontas)
```

**Por que usar em validações:**
- Usuários podem acidentalmente adicionar espaços
- Espaços invisíveis podem causar problemas
- Garante que campos vazios sejam realmente vazios

**Exemplo prático:**
```javascript
const fazerLogin = () => {
  // Sem trim: "  " seria considerado preenchido
  // Com trim: "  " vira "" (vazio)
  if (usuario.trim() === '') {
    Alert.alert('Erro', 'Preencha o campo de usuário!');
    return;
  }
};
```

**Outros métodos relacionados:**
- `trimStart()`: Remove espaços apenas no início
- `trimEnd()`: Remove espaços apenas no fim

---

### 21. Explique o que é interpolação de string (template literals) no JavaScript.

**Resposta:**

Interpolação de string (template literals) permite inserir variáveis e expressões dentro de strings usando crases (`` ` ``) e `${}`.

**Sintaxe:**
```javascript
`Texto ${variavel} mais texto`
```

**Exemplo:**
```javascript
const nome = "João";
const mensagem = `Bem-vindo, ${nome}!`; 
// Resultado: "Bem-vindo, João!"
```

**Vantagens sobre concatenação:**
- Mais legível
- Suporta quebras de linha
- Permite expressões complexas

**Comparação:**

**❌ Concatenação tradicional:**
```javascript
const mensagem = "Bem-vindo, " + nome + "!";
```

**✅ Template literal:**
```javascript
const mensagem = `Bem-vindo, ${nome}!`;
```

**Exemplo no React Native:**
```javascript
Alert.alert('Sucesso', `Bem-vindo, ${usuario}!`);
// Exibe: "Bem-vindo, João!" (se usuario = "João")
```

**Expressões dentro de template literals:**
```javascript
const total = 100;
const desconto = 10;
const mensagem = `Total: R$ ${total - desconto}`;
// Resultado: "Total: R$ 90"
```

---

### 22. O que é `isNaN()` e como é usado para validação?

**Resposta:**

`isNaN()` é uma função JavaScript que verifica se um valor **não é um número** (Not a Number).

**Sintaxe:**
```javascript
isNaN(valor) // Retorna true se NÃO for número, false se for número
```

**Exemplo:**
```javascript
isNaN(123)        // false (é um número)
isNaN("123")      // false (pode ser convertido para número)
isNaN("abc")      // true (não é um número)
isNaN(NaN)        // true (é NaN)
isNaN(undefined)  // true (não é um número)
```

**Uso em validações:**
```javascript
const valor = parseFloat(texto);
if (isNaN(valor)) {
  Alert.alert('Erro', 'Digite um número válido!');
  return;
}
// Se chegou aqui, valor é um número válido
```

**Por que é importante:**
- `TextInput` sempre retorna string
- `parseFloat()` pode retornar `NaN` se a string não for um número
- Previne erros em cálculos matemáticos

**Exemplo completo:**
```javascript
const calcular = () => {
  const numero = parseFloat(entrada);
  
  if (isNaN(numero)) {
    // Não é um número válido
    Alert.alert('Erro', 'Por favor, digite um número!');
    return;
  }
  
  if (numero < 0) {
    // É um número, mas é negativo
    Alert.alert('Erro', 'O número não pode ser negativo!');
    return;
  }
  
  // Número válido, pode calcular
  const resultado = numero * 2;
};
```

---

### 23. Explique o que é `toFixed()` e quando utilizá-lo.

**Resposta:**

`toFixed()` é um método de números que formata um número com uma quantidade específica de casas decimais, retornando uma string.

**Sintaxe:**
```javascript
numero.toFixed(casasDecimais)
```

**Exemplo:**
```javascript
const numero = 123.456789;
numero.toFixed(2)  // "123.46" (2 casas decimais)
numero.toFixed(0)  // "123" (sem decimais)
```

**Características:**
- Retorna uma **string**, não um número
- Arredonda o número se necessário
- Adiciona zeros à direita se necessário

**Uso em React Native:**
```javascript
const media = 7.555555;
const mediaFormatada = media.toFixed(2); // "7.56"

<Text>Média: {media.toFixed(2)}</Text>
// Exibe: "Média: 7.56"
```

**Para valores monetários:**
```javascript
const preco = 19.9;
const precoFormatado = preco.toFixed(2); // "19.90"

<Text>R$ {preco.toFixed(2)}</Text>
// Exibe: "R$ 19.90"
```

**Importante:**
- `toFixed()` retorna string, então se precisar fazer cálculos, use `parseFloat()` novamente:
```javascript
const numero = 123.456;
const formatado = parseFloat(numero.toFixed(2)); // 123.46 (número)
```

---

### 24. O que é `toLocaleString()` e como formatar valores monetários?

**Resposta:**

`toLocaleString()` formata um número de acordo com as convenções de um local específico (país/idioma).

**Sintaxe:**
```javascript
numero.toLocaleString('locale', opcoes)
```

**Exemplo básico:**
```javascript
const numero = 1234.56;
numero.toLocaleString('pt-BR'); // "1.234,56" (formato brasileiro)
```

**Para valores monetários:**
```javascript
const valor = 1234.56;
valor.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});
// Resultado: "R$ 1.234,56"
```

**Opções comuns:**
```javascript
valor.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,  // Mínimo de 2 casas decimais
  maximumFractionDigits: 2,  // Máximo de 2 casas decimais
});
// Sempre mostra 2 casas: "1.234,56"
```

**Exemplo no React Native:**
```javascript
const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

<Text>R$ {formatarMoeda(1234.5)}</Text>
// Exibe: "R$ 1.234,50"
```

**Vantagens:**
- Formatação automática de acordo com o país
- Separação de milhares
- Formatação de moeda
- Mais legível que `toFixed()`

---

### 25. Explique a diferença entre componentes funcionais e componentes de classe no React Native.

**Resposta:**

**Componentes Funcionais (Function Components):**
- São funções JavaScript que retornam JSX
- Mais modernos e recomendados
- Usam Hooks para gerenciar estado
- Mais simples e fáceis de entender

**Exemplo:**
```javascript
function MeuComponente() {
  const [contador, setContador] = useState(0);
  
  return <Text>{contador}</Text>;
}
```

**Componentes de Classe (Class Components):**
- São classes JavaScript que estendem `Component`
- Mais antigos, mas ainda funcionam
- Usam `this.state` e `this.setState()`
- Mais verbosos

**Exemplo:**
```javascript
class MeuComponente extends Component {
  constructor(props) {
    super(props);
    this.state = { contador: 0 };
  }
  
  render() {
    return <Text>{this.state.contador}</Text>;
  }
}
```

**Comparação:**

| Característica | Funcional | Classe |
|---------------|-----------|--------|
| Sintaxe | Mais simples | Mais verbosa |
| Estado | `useState` Hook | `this.state` |
| Atualização | `setContador()` | `this.setState()` |
| Ciclo de vida | `useEffect` Hook | `componentDidMount`, etc. |
| Recomendação | ✅ Moderno | ⚠️ Legado |

**Recomendação:**
- Use componentes funcionais (mais moderno)
- Hooks tornaram componentes de classe desnecessários na maioria dos casos

---

### 26. O que são Hooks no React Native e cite exemplos.

**Resposta:**

Hooks são funções especiais que permitem "conectar-se" a recursos do React em componentes funcionais.

**Regras dos Hooks:**
1. Só podem ser chamados no nível superior (não em loops, condições ou funções aninhadas)
2. Só podem ser usados em componentes funcionais ou outros Hooks customizados

**Hooks principais:**

**1. `useState`** - Gerenciar estado:
```javascript
const [contador, setContador] = useState(0);
```

**2. `useEffect`** - Efeitos colaterais (equivalente a ciclo de vida):
```javascript
useEffect(() => {
  // Código executado após renderização
}, [dependencias]);
```

**3. `useContext`** - Acessar contexto:
```javascript
const valor = useContext(MeuContexto);
```

**4. `useRef`** - Referência persistente:
```javascript
const inputRef = useRef(null);
```

**5. `useCallback`** - Memorizar funções:
```javascript
const funcaoMemo = useCallback(() => {
  // função
}, [dependencias]);
```

**6. `useMemo`** - Memorizar valores calculados:
```javascript
const valorMemo = useMemo(() => {
  return calcularValor();
}, [dependencias]);
```

**Por que usar Hooks:**
- Permitem usar estado e recursos do React em componentes funcionais
- Código mais limpo e reutilizável
- Facilita compartilhar lógica entre componentes

---

### 27. Explique o que é JSX e suas regras.

**Resposta:**

JSX (JavaScript XML) é uma sintaxe que permite escrever HTML-like dentro do JavaScript.

**Conceito:**
- Não é HTML real, é uma extensão de sintaxe do JavaScript
- É transformado em chamadas de função do React
- Facilita escrever interfaces de forma declarativa

**Exemplo:**
```javascript
// JSX
const elemento = <Text>Olá Mundo</Text>;

// É transformado em:
const elemento = React.createElement(Text, null, 'Olá Mundo');
```

**Regras do JSX:**

**1. Um único elemento raiz:**
```javascript
// ❌ Errado
return (
  <Text>Texto 1</Text>
  <Text>Texto 2</Text>
);

// ✅ Correto
return (
  <View>
    <Text>Texto 1</Text>
    <Text>Texto 2</Text>
  </View>
);
```

**2. Tags devem ser fechadas:**
```javascript
// ✅ Correto
<Text>Conteúdo</Text>
<TextInput /> // Self-closing
```

**3. Atributos em camelCase:**
```javascript
<Text style={styles.texto} numberOfLines={2} />
// Não é style="", é style={}
```

**4. JavaScript dentro de chaves:**
```javascript
const nome = "João";
<Text>{nome}</Text> // Exibe "João"
```

**5. Class vira className (em React web), mas no React Native não existe class**

**Vantagens:**
- Sintaxe familiar (parece HTML)
- Código mais legível
- Integração com JavaScript

---

### 28. O que é o ciclo de vida de um componente React Native?

**Resposta:**

Ciclo de vida são as fases que um componente passa desde sua criação até sua destruição.

**Fases principais:**

**1. Montagem (Mounting):**
- Componente é criado e inserido na árvore
- `useEffect(() => {}, [])` - equivalente a `componentDidMount`

**2. Atualização (Updating):**
- Componente é atualizado quando props ou estado mudam
- `useEffect(() => {})` - executa após cada renderização
- `useEffect(() => {}, [dependencia])` - executa quando dependência muda

**3. Desmontagem (Unmounting):**
- Componente é removido da árvore
- `useEffect(() => { return () => {} }, [])` - função de limpeza

**Exemplo com Hooks:**
```javascript
function MeuComponente() {
  useEffect(() => {
    // Executa após montagem
    console.log('Componente montado');
    
    return () => {
      // Executa na desmontagem (limpeza)
      console.log('Componente desmontado');
    };
  }, []);
  
  return <Text>Conteúdo</Text>;
}
```

**Casos de uso:**
- Carregar dados ao montar
- Limpar recursos ao desmontar
- Atualizar quando props mudam
- Cancelar requisições pendentes

---

### 29. Explique o que é renderização condicional no React Native.

**Resposta:**

Renderização condicional é exibir componentes diferentes baseado em condições.

**Métodos:**

**1. Operador ternário:**
```javascript
{condicao ? <ComponenteA /> : <ComponenteB />}
```

**2. Operador && (AND lógico):**
```javascript
{condicao && <Componente />}
// Só renderiza se condição for true
```

**3. If/else tradicional (fora do JSX):**
```javascript
let componente;
if (condicao) {
  componente = <ComponenteA />;
} else {
  componente = <ComponenteB />;
}
return componente;
```

**Exemplos práticos:**

**Exemplo 1: Mostrar resultado apenas se calculado:**
```javascript
{resultado !== null && (
  <Text>Resultado: {resultado}</Text>
)}
```

**Exemplo 2: Mensagem diferente baseada em estado:**
```javascript
{logado ? (
  <Text>Bem-vindo!</Text>
) : (
  <Text>Faça login</Text>
)}
```

**Exemplo 3: Múltiplas condições:**
```javascript
{erro && <Text style={styles.erro}>Erro: {erro}</Text>}
{sucesso && <Text style={styles.sucesso}>Sucesso!</Text>}
{!erro && !sucesso && <Text>Aguardando...</Text>}
```

**Importante:**
- Evite renderizar componentes desnecessários
- Use condições claras e legíveis
- Considere performance em listas grandes

---

### 30. O que é o operador de coalescência nula (`??`) e o operador de encadeamento opcional (`?.`)?

**Resposta:**

**Operador de Coalescência Nula (`??`):**
Retorna o valor à direita se o valor à esquerda for `null` ou `undefined`.

```javascript
const valor = null ?? "padrão"; // "padrão"
const valor2 = 0 ?? "padrão";   // 0 (não é null/undefined)
```

**Operador de Encadeamento Opcional (`?.`):**
Acessa propriedades de objetos que podem ser `null` ou `undefined` sem causar erro.

```javascript
const usuario = { nome: "João", endereco: { cidade: "SP" } };
const cidade = usuario?.endereco?.cidade; // "SP"
const telefone = usuario?.telefone;       // undefined (não causa erro)
```

**Exemplo combinado:**
```javascript
const nome = usuario?.nome ?? "Usuário desconhecido";
// Se usuario for null/undefined, retorna "Usuário desconhecido"
```

**Uso no React Native:**
```javascript
{resultado?.valor && (
  <Text>{resultado.valor}</Text>
)}

{usuario?.nome ?? "Visitante"}
```

---

## QUESTÕES SOBRE CÁLCULOS E LÓGICA

### 31. Explique como funciona o cálculo progressivo do INSS.

**Resposta:**

O cálculo progressivo do INSS aplica alíquotas diferentes sobre faixas de salário, calculando o desconto de cada faixa separadamente.

**Como funciona:**
1. O salário é dividido em faixas
2. Cada faixa tem uma alíquota diferente
3. O desconto é calculado sobre cada faixa que o salário "atravessa"
4. Os descontos de cada faixa são somados

**Exemplo prático (Salário: R$ 3.000,00):**

**1ª Faixa (até R$ 1.518,00 - 7,5%):**
- Desconto: R$ 1.518,00 × 7,5% = R$ 113,85

**2ª Faixa (R$ 1.518,01 até R$ 2.793,88 - 9,0%):**
- Parte do salário nesta faixa: R$ 3.000,00 - R$ 1.518,00 = R$ 1.482,00
- Desconto: R$ 1.482,00 × 9,0% = R$ 133,38

**Total:** R$ 113,85 + R$ 133,38 = R$ 247,23

**Implementação:**
```javascript
let desconto = 0;

if (salario > 1518.0) {
  desconto += 1518.0 * 0.075; // 1ª faixa completa
} else {
  desconto += salario * 0.075; // Só 1ª faixa
  return;
}

if (salario > 2793.88) {
  desconto += (2793.88 - 1518.0) * 0.09; // 2ª faixa completa
} else {
  desconto += (salario - 1518.0) * 0.09; // Parte da 2ª faixa
  return;
}
// Continua para outras faixas...
```

**Teto:**
- Se salário > R$ 8.154,41, aplica desconto máximo de R$ 876,96

---

### 32. Explique a diferença entre média aritmética simples e média ponderada.

**Resposta:**

**Média Aritmética Simples:**
Soma todos os valores e divide pela quantidade.

**Fórmula:**
```
Média = (N1 + N2 + N3) / 3
```

**Exemplo:**
```javascript
const n1 = 7;
const n2 = 8;
const n3 = 9;
const media = (n1 + n2 + n3) / 3; // 8.0
```

**Média Ponderada:**
Cada valor tem um peso diferente na média.

**Fórmula:**
```
Média = (N1×P1 + N2×P2 + N3×P3) / (P1 + P2 + P3)
```

**Exemplo:**
```javascript
const n1 = 7, peso1 = 2;
const n2 = 8, peso2 = 3;
const n3 = 9, peso3 = 5;
const media = (n1*peso1 + n2*peso2 + n3*peso3) / (peso1 + peso2 + peso3);
// (14 + 24 + 45) / 10 = 8.3
```

**Quando usar cada uma:**
- **Simples**: Quando todos os valores têm a mesma importância
- **Ponderada**: Quando alguns valores são mais importantes que outros

---

### 33. Explique a conversão de unidades: metros para centímetros.

**Resposta:**

A conversão de metros para centímetros é uma multiplicação simples.

**Relação:**
- 1 metro = 100 centímetros

**Fórmula:**
```
Centímetros = Metros × 100
```

**Exemplo:**
```javascript
const metros = 5.5;
const centimetros = metros * 100; // 550 cm
```

**Implementação:**
```javascript
const converter = () => {
  const valorMetros = parseFloat(metros); // Converte string para número
  const valorCentimetros = valorMetros * 100; // Multiplica por 100
  setCentimetros(valorCentimetros);
};
```

**Outras conversões relacionadas:**
- Metros para milímetros: × 1000
- Centímetros para metros: ÷ 100
- Quilômetros para metros: × 1000

---

## QUESTÕES SOBRE BOAS PRÁTICAS

### 34. Por que é importante validar dados de entrada do usuário?

**Resposta:**

Validação é crucial para garantir que o aplicativo funcione corretamente e seja seguro.

**Razões:**

**1. Prevenir erros:**
- Evita crashes quando dados inválidos são processados
- Previne cálculos incorretos
- Evita exceções não tratadas

**2. Segurança:**
- Previne injeção de código malicioso
- Protege contra dados malformados
- Valida formatos esperados

**3. Experiência do usuário:**
- Mensagens de erro claras ajudam o usuário
- Feedback imediato sobre erros
- Previne frustração

**4. Integridade dos dados:**
- Garante que apenas dados válidos sejam salvos
- Mantém consistência no banco de dados
- Previne corrupção de dados

**Exemplo de validação:**
```javascript
const calcular = () => {
  // Validação 1: Verifica se é número
  const valor = parseFloat(entrada);
  if (isNaN(valor)) {
    Alert.alert('Erro', 'Digite um número válido!');
    return;
  }
  
  // Validação 2: Verifica se é positivo
  if (valor < 0) {
    Alert.alert('Erro', 'O valor não pode ser negativo!');
    return;
  }
  
  // Validação 3: Verifica se está no intervalo válido
  if (valor > 100) {
    Alert.alert('Erro', 'O valor não pode ser maior que 100!');
    return;
  }
  
  // Se passou todas as validações, pode processar
  processar(valor);
};
```

---

### 35. O que são comentários no código e qual a importância de comentários bem escritos?

**Resposta:**

Comentários são textos no código que explicam o que o código faz, mas não são executados.

**Tipos de comentários:**

**1. Comentário de linha:**
```javascript
// Este é um comentário de linha
const valor = 10;
```

**2. Comentário de bloco:**
```javascript
/*
  Este é um comentário
  de múltiplas linhas
*/
```

**Importância:**

**1. Documentação:**
- Explica o "porquê", não o "o quê"
- Facilita manutenção futura
- Ajuda outros desenvolvedores

**2. Aprendizado:**
- Comentários educativos ajudam iniciantes
- Explicam conceitos complexos
- Servem como tutorial

**3. Debugging:**
- Comentários podem explicar decisões de design
- Documentam workarounds
- Explicam lógica complexa

**Boas práticas:**
- ✅ Comente o "porquê", não o "o quê"
- ✅ Mantenha comentários atualizados
- ✅ Use comentários para explicar lógica complexa
- ❌ Não comente código óbvio
- ❌ Não deixe comentários desatualizados

**Exemplo bom:**
```javascript
// Calcula desconto progressivo: cada faixa tem alíquota diferente
// Se o salário atravessa múltiplas faixas, calcula cada uma separadamente
if (salario > 1518.0) {
  desconto += 1518.0 * 0.075; // 1ª faixa completa
}
```

---

### 36. Explique o conceito de "estado" em React Native.

**Resposta:**

Estado são dados que podem mudar e causam re-renderização do componente quando atualizados.

**Características:**
- Estado é privado do componente
- Mudanças no estado causam re-renderização
- Estado persiste entre re-renderizações
- Cada componente pode ter seu próprio estado

**Exemplo:**
```javascript
function Contador() {
  const [contador, setContador] = useState(0); // Estado
  
  return (
    <View>
      <Text>{contador}</Text>
      <Button 
        onPress={() => setContador(contador + 1)} // Atualiza estado
        title="Incrementar"
      />
    </View>
  );
}
```

**Fluxo:**
1. Estado inicial: `contador = 0`
2. Usuário clica no botão
3. `setContador(1)` atualiza o estado
4. Componente re-renderiza
5. Interface atualizada mostra novo valor

**Estado vs Props:**
- **Estado**: Dados internos do componente (mudam)
- **Props**: Dados passados do componente pai (imutáveis)

**Regras:**
- Não modifique estado diretamente
- Use a função de atualização (`setContador`)
- Atualizações de estado são assíncronas

---

### 37. O que é imutabilidade e por que é importante no React Native?

**Resposta:**

Imutabilidade significa que um valor não pode ser modificado após sua criação. Para mudar, você cria um novo valor.

**Conceito:**
```javascript
// ❌ Mutável (não recomendado)
const array = [1, 2, 3];
array.push(4); // Modifica o array original

// ✅ Imutável (recomendado)
const array = [1, 2, 3];
const novoArray = [...array, 4]; // Cria novo array
```

**Por que é importante:**

**1. Performance:**
- React Native pode comparar referências rapidamente
- Detecta mudanças mais eficientemente
- Evita re-renderizações desnecessárias

**2. Previsibilidade:**
- Código mais fácil de entender
- Menos bugs inesperados
- Estado mais previsível

**3. Debugging:**
- Mais fácil rastrear mudanças
- Histórico de estados
- Ferramentas de debug funcionam melhor

**Exemplo com estado:**
```javascript
// ❌ Errado (mutação direta)
const [lista, setLista] = useState([1, 2, 3]);
lista.push(4); // NÃO funciona! Não causa re-renderização

// ✅ Correto (imutável)
const [lista, setLista] = useState([1, 2, 3]);
setLista([...lista, 4]); // Cria novo array
```

**Operadores úteis:**
- Spread operator (`...`): Copia arrays/objetos
- `map()`, `filter()`, `reduce()`: Retornam novos arrays

---

### 38. O que é o operador spread (`...`) no JavaScript?

**Resposta:**

O operador spread (`...`) expande um array ou objeto em elementos individuais.

**Com arrays:**
```javascript
const array1 = [1, 2, 3];
const array2 = [...array1, 4, 5]; // [1, 2, 3, 4, 5]

// Copiar array
const copia = [...array1]; // Nova referência, não modifica original
```

**Com objetos:**
```javascript
const obj1 = { nome: "João", idade: 25 };
const obj2 = { ...obj1, cidade: "SP" }; 
// { nome: "João", idade: 25, cidade: "SP" }
```

**Casos de uso:**

**1. Adicionar item a array (imutável):**
```javascript
const [lista, setLista] = useState([1, 2, 3]);
setLista([...lista, 4]); // Adiciona 4 sem modificar original
```

**2. Combinar objetos:**
```javascript
const usuario = { nome: "João" };
const completo = { ...usuario, idade: 25 };
```

**3. Passar props:**
```javascript
const props = { nome: "João", idade: 25 };
<Componente {...props} /> // Passa todas as props
```

**4. Copiar sem referência:**
```javascript
const original = [1, 2, 3];
const copia = [...original]; // Nova referência
```

---

### 39. Explique o que são funções de callback no React Native.

**Resposta:**

Callback é uma função passada como argumento para outra função, que será executada em um momento específico.

**Conceito:**
```javascript
function executarAposDelay(callback) {
  setTimeout(() => {
    callback(); // Executa a função passada
  }, 1000);
}

executarAposDelay(() => {
  console.log('Executado após 1 segundo');
});
```

**No React Native:**

**1. Event handlers:**
```javascript
<TouchableOpacity onPress={() => console.log('Clicado!')}>
  <Text>Clique</Text>
</TouchableOpacity>
// () => console.log('Clicado!') é o callback
```

**2. onChangeText:**
```javascript
<TextInput
  onChangeText={(texto) => setUsuario(texto)}
  // (texto) => setUsuario(texto) é o callback
/>
```

**3. Funções passadas como props:**
```javascript
function Botao({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Clique</Text>
    </TouchableOpacity>
  );
}

<Botao onPress={() => fazerAlgo()} />
// () => fazerAlgo() é o callback
```

**Vantagens:**
- Permite personalizar comportamento
- Torna componentes reutilizáveis
- Separa responsabilidades

**Padrão comum:**
```javascript
const handlePress = () => {
  // Lógica aqui
};

<TouchableOpacity onPress={handlePress}>
  <Text>Botão</Text>
</TouchableOpacity>
```

---

### 40. O que é desestruturação (destructuring) no JavaScript?

**Resposta:**

Desestruturação permite extrair valores de arrays ou propriedades de objetos em variáveis separadas.

**Com arrays:**
```javascript
const array = [1, 2, 3];
const [primeiro, segundo, terceiro] = array;
// primeiro = 1, segundo = 2, terceiro = 3
```

**Com objetos:**
```javascript
const pessoa = { nome: "João", idade: 25 };
const { nome, idade } = pessoa;
// nome = "João", idade = 25
```

**No React Native:**

**1. useState:**
```javascript
const [contador, setContador] = useState(0);
// Desestrutura array retornado por useState
```

**2. Props:**
```javascript
function Componente({ nome, idade }) {
  // Desestrutura props diretamente
  return <Text>{nome} tem {idade} anos</Text>;
}
```

**3. Estilos:**
```javascript
const [styles.base, styles.extra] = [estilo1, estilo2];
```

**Vantagens:**
- Código mais limpo
- Menos repetição
- Mais legível

**Renomear variáveis:**
```javascript
const { nome: nomeUsuario, idade: idadeUsuario } = pessoa;
```

**Valores padrão:**
```javascript
const { nome = "Visitante", idade = 0 } = pessoa;
```

---

## QUESTÕES SOBRE ARQUITETURA E CONCEITOS

### 41. O que é o Virtual DOM no React Native?

**Resposta:**

O Virtual DOM é uma representação em memória da estrutura de componentes.

**Conceito:**
- React Native mantém uma cópia "virtual" da árvore de componentes
- Quando há mudanças, compara a versão antiga com a nova
- Atualiza apenas as partes que mudaram (diffing)
- Aplica mudanças de forma eficiente

**Fluxo:**
1. Estado muda
2. React cria nova árvore virtual
3. Compara com árvore anterior (diffing)
4. Identifica o que mudou
5. Atualiza apenas o necessário na interface nativa

**Vantagens:**
- Performance: Atualiza apenas o necessário
- Eficiência: Evita re-renderizações completas
- Otimização automática

**Exemplo:**
```javascript
// Estado inicial
const [contador, setContador] = useState(0);

// Virtual DOM antigo:
<View>
  <Text>0</Text>
</View>

// Após setContador(1), Virtual DOM novo:
<View>
  <Text>1</Text>
</View>

// React identifica: só o Text mudou
// Atualiza apenas o Text, não o View
```

---

### 42. Explique o que é "lifting state up" no React Native.

**Resposta:**

"Lifting state up" (elevar estado) é mover o estado de um componente filho para um componente pai quando múltiplos componentes precisam acessá-lo.

**Problema:**
```javascript
// Estado no componente filho
function Filho1() {
  const [valor, setValor] = useState(0);
  // Filho2 também precisa de valor, mas não tem acesso
}

function Filho2() {
  // Precisa do valor de Filho1, mas não tem acesso
}
```

**Solução (lifting state up):**
```javascript
// Estado no componente pai
function Pai() {
  const [valor, setValor] = useState(0); // Estado elevado
  
  return (
    <View>
      <Filho1 valor={valor} setValor={setValor} />
      <Filho2 valor={valor} />
    </View>
  );
}
```

**Quando usar:**
- Múltiplos componentes precisam do mesmo estado
- Componentes irmãos precisam compartilhar dados
- Estado precisa ser sincronizado entre componentes

**Vantagens:**
- Fonte única de verdade
- Sincronização automática
- Mais fácil de gerenciar

---

### 43. O que é o conceito de "componentes reutilizáveis"?

**Resposta:**

Componentes reutilizáveis são componentes criados para serem usados em múltiplos lugares com diferentes dados.

**Características:**
- Aceitam props para personalização
- Lógica genérica que funciona em vários contextos
- Código DRY (Don't Repeat Yourself)

**Exemplo:**
```javascript
// Componente reutilizável
function BotaoCustomizado({ titulo, cor, onPress }) {
  return (
    <TouchableOpacity 
      style={{ backgroundColor: cor }}
      onPress={onPress}
    >
      <Text>{titulo}</Text>
    </TouchableOpacity>
  );
}

// Uso em múltiplos lugares
<BotaoCustomizado titulo="Salvar" cor="blue" onPress={salvar} />
<BotaoCustomizado titulo="Cancelar" cor="red" onPress={cancelar} />
<BotaoCustomizado titulo="Enviar" cor="green" onPress={enviar} />
```

**Vantagens:**
- Menos código duplicado
- Manutenção mais fácil (mudança em um lugar afeta todos)
- Consistência visual
- Desenvolvimento mais rápido

**Boas práticas:**
- Props claras e bem documentadas
- Valores padrão quando apropriado
- Flexível mas não complexo demais

---

### 44. Explique a diferença entre desenvolvimento nativo e multiplataforma.

**Resposta:**

**Desenvolvimento Nativo:**
- Código específico para cada plataforma (Android/iOS)
- Usa linguagens nativas (Kotlin/Java para Android, Swift/Objective-C para iOS)
- Acesso total a recursos do dispositivo
- Performance máxima
- Desenvolvimento separado para cada plataforma

**Desenvolvimento Multiplataforma:**
- Um único código funciona em múltiplas plataformas
- Usa frameworks como React Native, Flutter, Xamarin
- Compartilha código entre plataformas
- Desenvolvimento mais rápido
- Pode ter limitações de acesso a recursos nativos

**Comparação:**

| Aspecto | Nativo | Multiplataforma |
|--------|--------|-----------------|
| Código | Separado por plataforma | Compartilhado |
| Performance | Máxima | Boa (quase nativa) |
| Desenvolvimento | Mais lento | Mais rápido |
| Manutenção | Duas bases de código | Uma base de código |
| Acesso nativo | Total | Pode ter limitações |
| Custo | Maior | Menor |

**Quando usar cada um:**
- **Nativo**: Apps que precisam de performance extrema ou recursos muito específicos
- **Multiplataforma**: Apps que precisam funcionar em múltiplas plataformas rapidamente

---

### 45. O que é hot reload no React Native?

**Resposta:**

Hot reload é uma funcionalidade que atualiza o aplicativo em tempo real quando você salva mudanças no código, sem perder o estado atual.

**Como funciona:**
1. Você faz uma mudança no código
2. Salva o arquivo
3. React Native detecta a mudança
4. Atualiza apenas o componente modificado
5. Mantém o estado atual do app

**Vantagens:**
- Desenvolvimento mais rápido
- Não precisa reiniciar o app
- Mantém estado durante desenvolvimento
- Feedback imediato

**Comandos:**
- `r` no Metro bundler: Recarrega o app
- `d`: Abre menu de desenvolvedor
- `Ctrl+M` (Android) / `Cmd+D` (iOS): Menu de desenvolvedor

**Limitações:**
- Algumas mudanças requerem reload completo
- Mudanças em código nativo requerem rebuild
- Às vezes pode ter bugs que requerem restart

---

## CONCLUSÃO

Este documento cobre os principais conceitos de React Native e Flutter abordados nas atividades práticas. Estude cada questão e pratique implementando os conceitos em código real.

**Dicas de estudo:**
1. Leia cada resposta cuidadosamente
2. Pratique escrevendo código para cada conceito
3. Crie pequenos projetos para fixar o aprendizado
4. Revise regularmente
5. Experimente variações dos exemplos dados

**Boa sorte nos estudos! 🚀**