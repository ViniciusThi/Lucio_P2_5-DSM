/**
 * Conversor Simples de Unidades (Metros para Centímetros)
 * 
 * Este aplicativo recebe um valor em metros,
 * converte para centímetros e exibe o resultado.
 * Fórmula: 1 metro = 100 centímetros
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
  Alert,             // Alert é usado para exibir mensagens popup
} from 'react-native';

// Função principal do aplicativo
function App() {
  // useState cria um estado para armazenar o valor em metros digitado pelo usuário
  // O primeiro valor (metros) é o valor atual, o segundo (setMetros) é a função para alterá-lo
  // '' significa que começa vazio (string vazia)
  // TextInput sempre retorna uma string, por isso usamos string aqui
  const [metros, setMetros] = useState('');

  // useState cria um estado para armazenar o resultado em centímetros
  // null significa que ainda não foi calculado
  const [centimetros, setCentimetros] = useState<number | null>(null);

  // Função que será chamada quando o botão "Converter" for pressionado
  const converter = () => {
    // parseFloat converte a string (texto) para um número decimal
    // Por exemplo: "5.5" vira 5.5 (número)
    const valorMetros = parseFloat(metros);

    // Verifica se o valor digitado é um número válido
    // isNaN significa "is Not a Number" (não é um número)
    // Se o usuário digitar texto ou deixar vazio, isNaN retorna true
    if (isNaN(valorMetros)) {
      // Se não for um número válido, exibe um alerta de erro
      Alert.alert('Erro', 'Por favor, digite um valor numérico válido!');
      // Retorna para parar a execução da função
      return;
    }

    // Verifica se o valor é negativo
    if (valorMetros < 0) {
      // Se for negativo, exibe um alerta de erro
      Alert.alert('Erro', 'O valor não pode ser negativo!');
      // Retorna para parar a execução da função
      return;
    }

    // Fórmula de conversão: 1 metro = 100 centímetros
    // Multiplicamos o valor em metros por 100 para obter centímetros
    const valorCentimetros = valorMetros * 100;

    // Atualiza o estado de centímetros com o valor calculado
    setCentimetros(valorCentimetros);
  };

  // Função para limpar os campos
  const limpar = () => {
    // Limpa o campo de metros
    setMetros('');
    
    // Limpa o resultado em centímetros
    setCentimetros(null);
  };

  // Retorna a interface do aplicativo (o que aparece na tela)
  return (
    // SafeAreaView garante que o conteúdo não fique atrás de barras do sistema
    <SafeAreaView style={styles.container}>
      {/* View principal que contém todo o conteúdo */}
      <View style={styles.content}>
        
        {/* Texto do título do aplicativo */}
        <Text style={styles.title}>Conversor de Unidades</Text>

        {/* Texto do subtítulo explicando a conversão */}
        <Text style={styles.subtitle}>Metros → Centímetros</Text>

        {/* View que agrupa o campo de entrada */}
        <View style={styles.inputContainer}>
          
          {/* Label (rótulo) para o campo de entrada */}
          <Text style={styles.label}>Valor em Metros:</Text>
          
          {/* Campo de entrada para o valor em metros */}
          <TextInput
            style={styles.input}                    // Aplica o estilo definido em styles.input
            placeholder="Digite o valor em metros"  // Texto que aparece quando o campo está vazio
            placeholderTextColor="#999"             // Cor do texto placeholder
            keyboardType="numeric"                  // Define o teclado como numérico (mostra números e ponto decimal)
            value={metros}                          // O valor exibido no campo vem do estado metros
            onChangeText={setMetros}                // Quando o texto muda, atualiza o estado metros
          />
        </View>

        {/* View que agrupa os botões */}
        <View style={styles.buttonContainer}>
          
          {/* Botão para converter metros em centímetros */}
          <TouchableOpacity
            style={styles.button}                   // Aplica o estilo do botão
            onPress={converter}                     // Quando pressionado, chama a função converter
          >
            {/* Texto dentro do botão */}
            <Text style={styles.buttonText}>Converter</Text>
          </TouchableOpacity>

          {/* Botão para limpar os campos */}
          <TouchableOpacity
            style={[styles.button, styles.buttonClear]} // Aplica dois estilos: button e buttonClear
            onPress={limpar}                        // Quando pressionado, chama a função limpar
          >
            {/* Texto dentro do botão */}
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* View que exibe o resultado (só aparece se a conversão foi feita) */}
        {/* && significa "e também" - só renderiza se centimetros não for null */}
        {centimetros !== null && (
          <View style={styles.resultContainer}>
            {/* Texto que exibe o valor original em metros */}
            <Text style={styles.resultLabel}>Valor em Metros:</Text>
            <Text style={styles.resultValue}>{metros} m</Text>
            
            {/* Texto que exibe o valor convertido em centímetros */}
            {/* toFixed(2) formata o número com 2 casas decimais */}
            <Text style={styles.resultLabel}>Valor em Centímetros:</Text>
            <Text style={styles.resultValue}>{centimetros.toFixed(2)} cm</Text>
            
            {/* Linha separadora visual */}
            <View style={styles.separator} />
            
            {/* Texto explicativo da fórmula */}
            <Text style={styles.formulaText}>
              1 metro = 100 centímetros
            </Text>
          </View>
        )}

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
    fontSize: 28,               // Tamanho da fonte
    fontWeight: 'bold',         // Texto em negrito
    textAlign: 'center',        // Centraliza o texto
    marginBottom: 10,           // Espaçamento inferior de 10 pixels
    color: '#333',              // Cor do texto (cinza escuro)
  },
  
  // Estilo do subtítulo
  subtitle: {
    fontSize: 18,               // Tamanho da fonte
    textAlign: 'center',        // Centraliza o texto
    marginBottom: 40,           // Espaçamento inferior de 40 pixels
    color: '#666',              // Cor do texto (cinza médio)
  },
  
  // Estilo do container do input
  inputContainer: {
    marginBottom: 30,           // Espaçamento inferior
  },
  
  // Estilo dos labels (rótulos)
  label: {
    fontSize: 16,               // Tamanho da fonte
    fontWeight: '600',          // Peso da fonte (semi-negrito)
    marginBottom: 8,            // Espaçamento inferior
    color: '#333',              // Cor do texto
  },
  
  // Estilo do campo de entrada
  input: {
    borderWidth: 1,             // Largura da borda
    borderColor: '#ddd',        // Cor da borda (cinza claro)
    borderRadius: 8,            // Arredonda as bordas
    padding: 12,                // Espaçamento interno
    fontSize: 18,               // Tamanho da fonte
    backgroundColor: '#fff',     // Cor de fundo branca
    textAlign: 'center',        // Centraliza o texto digitado
  },
  
  // Estilo do container dos botões
  buttonContainer: {
    flexDirection: 'row',       // Coloca os botões lado a lado (horizontal)
    justifyContent: 'space-between', // Espaça os botões igualmente
    marginBottom: 30,           // Espaçamento inferior
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
  
  // Estilo do container do resultado
  resultContainer: {
    marginTop: 20,              // Espaçamento superior
    padding: 20,                // Espaçamento interno
    backgroundColor: '#fff',    // Cor de fundo branca
    borderRadius: 8,            // Arredonda as bordas
    alignItems: 'center',       // Centraliza os itens horizontalmente
  },
  
  // Estilo do label do resultado
  resultLabel: {
    fontSize: 14,               // Tamanho da fonte
    color: '#666',              // Cor do texto (cinza médio)
    marginTop: 10,              // Espaçamento superior
    marginBottom: 5,             // Espaçamento inferior
  },
  
  // Estilo do valor do resultado
  resultValue: {
    fontSize: 24,               // Tamanho da fonte
    fontWeight: 'bold',         // Texto em negrito
    color: '#007AFF',           // Cor azul
    marginBottom: 5,            // Espaçamento inferior
  },
  
  // Estilo da linha separadora
  separator: {
    width: '80%',               // Largura de 80% do container
    height: 1,                  // Altura de 1 pixel
    backgroundColor: '#ddd',    // Cor cinza claro
    marginVertical: 15,         // Espaçamento vertical
  },
  
  // Estilo do texto da fórmula
  formulaText: {
    fontSize: 14,               // Tamanho da fonte
    color: '#999',              // Cor do texto (cinza claro)
    fontStyle: 'italic',        // Texto em itálico
    marginTop: 5,               // Espaçamento superior
  },
});

// Exporta o componente App para que possa ser usado em outros arquivos
export default App;
