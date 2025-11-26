/**
 * Calculadora de Média Simples
 * 
 * Este aplicativo recebe 3 notas de um aluno,
 * calcula a média aritmética e exibe se foi Aprovado ou Reprovado.
 */

// Importa o React, que é necessário para criar componentes
import React from 'react';

// Importa o useState do React, que permite gerenciar estados (valores que mudam)
import { useState } from 'react';

// Importa componentes do React Native que vamos usar na interface
import {
  View,           // View é como uma "div" do HTML, usada para agrupar elementos
  Text,           // Text é usado para exibir textos na tela
  TextInput,      // TextInput é um campo de entrada de texto
  TouchableOpacity, // TouchableOpacity é um botão que pode ser pressionado
  StyleSheet,     // StyleSheet é usado para criar estilos para os componentes
  SafeAreaView,   // SafeAreaView garante que o conteúdo não fique atrás de barras do sistema
  Alert,          // Alert é usado para exibir mensagens popup
} from 'react-native';

// Função principal do aplicativo
function App() {
  // useState cria um estado para armazenar a nota N1
  // O primeiro valor (n1) é o valor atual, o segundo (setN1) é a função para alterá-lo
  // '' significa que começa vazio (string vazia)
  const [n1, setN1] = useState('');

  // useState para armazenar a nota N2
  const [n2, setN2] = useState('');

  // useState para armazenar a nota N3
  const [n3, setN3] = useState('');

  // useState para armazenar a média calculada
  // null significa que ainda não foi calculada
  const [media, setMedia] = useState<number | null>(null);

  // useState para armazenar a situação do aluno (Aprovado ou Reprovado)
  const [situacao, setSituacao] = useState('');

  // Função que será chamada quando o botão "Calcular" for pressionado
  const calcularMedia = () => {
    // Converte a string n1 para número usando parseFloat (permite decimais)
    const nota1 = parseFloat(n1);
    
    // Converte a string n2 para número
    const nota2 = parseFloat(n2);
    
    // Converte a string n3 para número
    const nota3 = parseFloat(n3);

    // Verifica se alguma das notas está vazia ou não é um número válido
    // isNaN significa "is Not a Number" (não é um número)
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
      // Se alguma nota for inválida, exibe um alerta
      Alert.alert('Erro', 'Por favor, preencha todas as notas com valores válidos!');
      // Retorna para parar a execução da função
      return;
    }

    // Verifica se as notas estão no intervalo válido (0 a 10)
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 || nota3 < 0 || nota3 > 10) {
      // Se alguma nota estiver fora do intervalo, exibe um alerta
      Alert.alert('Erro', 'As notas devem estar entre 0 e 10!');
      // Retorna para parar a execução da função
      return;
    }

    // Calcula a média aritmética: soma as 3 notas e divide por 3
    const mediaCalculada = (nota1 + nota2 + nota3) / 3;

    // Atualiza o estado da média com o valor calculado
    setMedia(mediaCalculada);

    // Verifica se a média é maior que 7
    if (mediaCalculada > 7) {
      // Se for maior que 7, o aluno está aprovado
      setSituacao('Aprovado');
    } else {
      // Se for menor ou igual a 7, o aluno está reprovado
      setSituacao('Reprovado');
    }
  };

  // Função para limpar todos os campos
  const limparCampos = () => {
    // Limpa o campo N1
    setN1('');
    
    // Limpa o campo N2
    setN2('');
    
    // Limpa o campo N3
    setN3('');
    
    // Limpa a média
    setMedia(null);
    
    // Limpa a situação
    setSituacao('');
  };

  // Retorna a interface do aplicativo (o que aparece na tela)
  return (
    // SafeAreaView garante que o conteúdo não fique atrás de barras do sistema
    <SafeAreaView style={styles.container}>
      {/* View principal que contém todo o conteúdo */}
      <View style={styles.content}>
        
        {/* Texto do título do aplicativo */}
        <Text style={styles.title}>Calculadora de Média</Text>

        {/* View que agrupa os campos de entrada */}
        <View style={styles.inputContainer}>
          
          {/* Label (rótulo) para a nota N1 */}
          <Text style={styles.label}>Nota N1:</Text>
          
          {/* Campo de entrada para a nota N1 */}
          <TextInput
            style={styles.input}                    // Aplica o estilo definido em styles.input
            placeholder="Digite a nota N1"         // Texto que aparece quando o campo está vazio
            placeholderTextColor="#999"             // Cor do texto placeholder
            keyboardType="numeric"                  // Define o teclado como numérico (mostra números)
            value={n1}                              // O valor exibido no campo vem do estado n1
            onChangeText={setN1}                    // Quando o texto muda, atualiza o estado n1
          />

          {/* Label para a nota N2 */}
          <Text style={styles.label}>Nota N2:</Text>
          
          {/* Campo de entrada para a nota N2 */}
          <TextInput
            style={styles.input}
            placeholder="Digite a nota N2"
            placeholderTextColor="#999"
            keyboardType="numeric"                  // Teclado numérico
            value={n2}                              // Valor do estado n2
            onChangeText={setN2}                    // Atualiza n2 quando o texto muda
          />

          {/* Label para a nota N3 */}
          <Text style={styles.label}>Nota N3:</Text>
          
          {/* Campo de entrada para a nota N3 */}
          <TextInput
            style={styles.input}
            placeholder="Digite a nota N3"
            placeholderTextColor="#999"
            keyboardType="numeric"                  // Teclado numérico
            value={n3}                              // Valor do estado n3
            onChangeText={setN3}                    // Atualiza n3 quando o texto muda
          />
        </View>

        {/* View que agrupa os botões */}
        <View style={styles.buttonContainer}>
          
          {/* Botão para calcular a média */}
          <TouchableOpacity
            style={styles.button}                   // Aplica o estilo do botão
            onPress={calcularMedia}                 // Quando pressionado, chama a função calcularMedia
          >
            {/* Texto dentro do botão */}
            <Text style={styles.buttonText}>Calcular Média</Text>
          </TouchableOpacity>

          {/* Botão para limpar os campos */}
          <TouchableOpacity
            style={[styles.button, styles.buttonClear]} // Aplica dois estilos: button e buttonClear
            onPress={limparCampos}                   // Quando pressionado, chama a função limparCampos
          >
            {/* Texto dentro do botão */}
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* View que exibe o resultado (só aparece se a média foi calculada) */}
        {media !== null && (
          <View style={styles.resultContainer}>
            {/* Texto que exibe a média calculada */}
            {/* toFixed(2) formata o número com 2 casas decimais */}
            <Text style={styles.resultText}>
              Média: {media.toFixed(2)}
            </Text>
            
            {/* Texto que exibe a situação do aluno */}
            {/* Se a situação for "Aprovado", usa estilo verde, senão usa vermelho */}
            <Text style={[
              styles.situacaoText,
              situacao === 'Aprovado' ? styles.aprovado : styles.reprovado
            ]}>
              {situacao}
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
    marginBottom: 30,           // Espaçamento inferior de 30 pixels
    color: '#333',              // Cor do texto (cinza escuro)
  },
  
  // Estilo do container dos inputs
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
  
  // Estilo dos campos de entrada
  input: {
    borderWidth: 1,             // Largura da borda
    borderColor: '#ddd',        // Cor da borda (cinza claro)
    borderRadius: 8,            // Arredonda as bordas
    padding: 12,                // Espaçamento interno
    fontSize: 16,               // Tamanho da fonte
    backgroundColor: '#fff',    // Cor de fundo branca
    marginBottom: 15,           // Espaçamento inferior entre os campos
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
  
  // Estilo do texto da média
  resultText: {
    fontSize: 24,               // Tamanho da fonte
    fontWeight: 'bold',         // Texto em negrito
    marginBottom: 10,           // Espaçamento inferior
    color: '#333',              // Cor do texto
  },
  
  // Estilo do texto da situação
  situacaoText: {
    fontSize: 22,               // Tamanho da fonte
    fontWeight: 'bold',         // Texto em negrito
  },
  
  // Estilo quando o aluno está aprovado
  aprovado: {
    color: '#34C759',           // Cor verde
  },
  
  // Estilo quando o aluno está reprovado
  reprovado: {
    color: '#FF3B30',           // Cor vermelha
  },
});

// Exporta o componente App para que possa ser usado em outros arquivos
export default App;
