/**
 * Formulário Simples com Alert
 * 
 * Este aplicativo cria um formulário de login com dois campos:
 * - Usuário
 * - Senha
 * 
 * Ao clicar no botão "Login", exibe um Alert com mensagem de boas-vindas
 * ou um alerta de erro se algum campo estiver vazio.
 */

// Importa o React, necessário para criar componentes
import React from 'react';

// Importa o useState do React, que permite gerenciar estados (valores que mudam)
import { useState } from 'react';

// Importa componentes do React Native que vamos usar na interface
import {
  View,              // View é como uma "div" do HTML, usada para agrupar elementos
  Text,              // Text é usado para exibir textos na tela
  TextInput,         // TextInput é um campo de entrada de texto
  TouchableOpacity,  // TouchableOpacity é um botão que pode ser pressionado
  StyleSheet,        // StyleSheet é usado para criar estilos para os componentes
  SafeAreaView,      // SafeAreaView garante que o conteúdo não fique atrás de barras do sistema
  Alert,             // Alert é usado para exibir mensagens popup (diálogos)
} from 'react-native';

// Função principal do aplicativo
function App() {
  // useState cria um estado para armazenar o nome de usuário digitado
  // O primeiro valor (usuario) é o valor atual, o segundo (setUsuario) é a função para alterá-lo
  // '' significa que começa vazio (string vazia)
  const [usuario, setUsuario] = useState('');

  // useState cria um estado para armazenar a senha digitada
  // O primeiro valor (senha) é o valor atual, o segundo (setSenha) é a função para alterá-lo
  // '' significa que começa vazio (string vazia)
  const [senha, setSenha] = useState('');

  // Função que será chamada quando o botão "Login" for pressionado
  const fazerLogin = () => {
    // trim() remove espaços em branco no início e no fim da string
    // Verifica se o campo de usuário está vazio (após remover espaços)
    if (usuario.trim() === '') {
      // Se estiver vazio, exibe um Alert de erro
      // Alert.alert cria um diálogo popup na tela
      // O primeiro parâmetro é o título, o segundo é a mensagem
      Alert.alert('Erro', 'Preencha todos os campos!');
      // Retorna para parar a execução da função
      return;
    }

    // Verifica se o campo de senha está vazio (após remover espaços)
    if (senha.trim() === '') {
      // Se estiver vazio, exibe um Alert de erro
      Alert.alert('Erro', 'Preencha todos os campos!');
      // Retorna para parar a execução da função
      return;
    }

    // Se chegou aqui, ambos os campos estão preenchidos
    // Exibe um Alert de boas-vindas com o nome do usuário
    // ${usuario} é uma interpolação de string que insere o valor da variável usuario
    Alert.alert('Sucesso', `Bem-vindo, ${usuario}!`);
  };

  // Função para limpar os campos do formulário
  const limpar = () => {
    // Limpa o campo de usuário
    setUsuario('');
    
    // Limpa o campo de senha
    setSenha('');
  };

  // Retorna a interface do aplicativo (o que aparece na tela)
  return (
    // SafeAreaView garante que o conteúdo não fique atrás de barras do sistema
    <SafeAreaView style={styles.container}>
      {/* View principal que contém todo o conteúdo */}
      <View style={styles.content}>
        
        {/* Texto do título do aplicativo */}
        <Text style={styles.title}>Login</Text>

        {/* Texto do subtítulo explicativo */}
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        {/* View que agrupa os campos do formulário */}
        <View style={styles.formContainer}>
          
          {/* View que contém o campo de usuário */}
          <View style={styles.inputGroup}>
            {/* Label (rótulo) para o campo de usuário */}
            <Text style={styles.label}>Usuário:</Text>
            
            {/* Campo de entrada para o nome de usuário */}
            <TextInput
              style={styles.input}                    // Aplica o estilo definido em styles.input
              placeholder="Digite seu usuário"        // Texto que aparece quando o campo está vazio
              placeholderTextColor="#999"             // Cor do texto placeholder
              value={usuario}                         // O valor exibido no campo vem do estado usuario
              onChangeText={setUsuario}               // Quando o texto muda, atualiza o estado usuario
              autoCapitalize="none"                   // Não capitaliza automaticamente (não coloca primeira letra maiúscula)
              autoCorrect={false}                     // Desabilita a correção automática de texto
            />
          </View>

          {/* View que contém o campo de senha */}
          <View style={styles.inputGroup}>
            {/* Label (rótulo) para o campo de senha */}
            <Text style={styles.label}>Senha:</Text>
            
            {/* Campo de entrada para a senha */}
            <TextInput
              style={styles.input}                    // Aplica o estilo definido em styles.input
              placeholder="Digite sua senha"          // Texto que aparece quando o campo está vazio
              placeholderTextColor="#999"             // Cor do texto placeholder
              value={senha}                           // O valor exibido no campo vem do estado senha
              onChangeText={setSenha}                 // Quando o texto muda, atualiza o estado senha
              secureTextEntry={true}                  // Oculta o texto digitado (mostra apenas pontos ou asteriscos)
              autoCapitalize="none"                   // Não capitaliza automaticamente
              autoCorrect={false}                     // Desabilita a correção automática de texto
            />
          </View>
        </View>

        {/* View que agrupa os botões */}
        <View style={styles.buttonContainer}>
          
          {/* Botão para fazer login */}
          <TouchableOpacity
            style={styles.button}                     // Aplica o estilo do botão
            onPress={fazerLogin}                     // Quando pressionado, chama a função fazerLogin
          >
            {/* Texto dentro do botão */}
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Botão para limpar os campos */}
          <TouchableOpacity
            style={[styles.button, styles.buttonClear]} // Aplica dois estilos: button e buttonClear
            onPress={limpar}                          // Quando pressionado, chama a função limpar
          >
            {/* Texto dentro do botão */}
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

// Cria os estilos que serão aplicados aos componentes
const styles = StyleSheet.create({
  // Estilo do container principal
  container: {
    flex: 1,                    // Ocupa toda a altura disponível
    backgroundColor: '#f5f5f5', // Cor de fundo cinza claro
  },
  
  // Estilo do conteúdo interno
  content: {
    flex: 1,                    // Ocupa todo o espaço disponível
    padding: 20,                // Espaçamento interno de 20 pixels
    justifyContent: 'center',   // Centraliza o conteúdo verticalmente
  },
  
  // Estilo do título
  title: {
    fontSize: 32,               // Tamanho da fonte
    fontWeight: 'bold',         // Texto em negrito
    textAlign: 'center',        // Centraliza o texto
    marginBottom: 10,           // Espaçamento inferior de 10 pixels
    color: '#333',              // Cor do texto (cinza escuro)
  },
  
  // Estilo do subtítulo
  subtitle: {
    fontSize: 16,               // Tamanho da fonte
    textAlign: 'center',        // Centraliza o texto
    marginBottom: 40,           // Espaçamento inferior de 40 pixels
    color: '#666',              // Cor do texto (cinza médio)
  },
  
  // Estilo do container do formulário
  formContainer: {
    marginBottom: 30,           // Espaçamento inferior
  },
  
  // Estilo do grupo de input (label + campo)
  inputGroup: {
    marginBottom: 20,           // Espaçamento inferior entre os grupos
  },
  
  // Estilo dos labels (rótulos)
  label: {
    fontSize: 16,               // Tamanho da fonte
    fontWeight: '600',          // Peso da fonte (semi-negrito)
    marginBottom: 8,            // Espaçamento inferior
    color: '#333',              // Cor do texto
  },
  
  // Estilo dos campos de entrada
  input: {
    borderWidth: 1,             // Largura da borda
    borderColor: '#ddd',        // Cor da borda (cinza claro)
    borderRadius: 8,            // Arredonda as bordas
    padding: 12,                // Espaçamento interno
    fontSize: 16,               // Tamanho da fonte
    backgroundColor: '#fff',     // Cor de fundo branca
  },
  
  // Estilo do container dos botões
  buttonContainer: {
    flexDirection: 'row',       // Coloca os botões lado a lado (horizontal)
    justifyContent: 'space-between', // Espaça os botões igualmente
    marginTop: 10,              // Espaçamento superior
  },
  
  // Estilo dos botões
  button: {
    backgroundColor: '#007AFF', // Cor de fundo azul
    padding: 15,                // Espaçamento interno
    borderRadius: 8,            // Arredonda as bordas
    flex: 1,                    // Ocupa espaço igual
    marginHorizontal: 5,        // Espaçamento horizontal entre botões
  },
  
  // Estilo do botão de limpar (sobrescreve algumas propriedades do button)
  buttonClear: {
    backgroundColor: '#FF3B30', // Cor de fundo vermelha
  },
  
  // Estilo do texto dos botões
  buttonText: {
    color: '#fff',              // Cor do texto branca
    fontSize: 16,               // Tamanho da fonte
    fontWeight: '600',          // Peso da fonte
    textAlign: 'center',        // Centraliza o texto
  },
});

// Exporta o componente App para que possa ser usado em outros arquivos
export default App;
