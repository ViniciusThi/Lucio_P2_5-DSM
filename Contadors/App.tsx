/**
 * Contador com Botões de Incremento e Decremento
 * 
 * Este aplicativo exibe um número centralizado na tela
 * e permite incrementar ou decrementar esse número usando botões.
 * O número nunca fica negativo.
 */

// Importa o React, necessário para criar componentes
import React from 'react';

// Importa o useState do React, que permite gerenciar estados (valores que mudam)
import { useState } from 'react';

// Importa componentes do React Native que vamos usar na interface
import {
  View,              // View é como uma "div" do HTML, usada para agrupar elementos
  Text,              // Text é usado para exibir textos na tela
  TouchableOpacity,  // TouchableOpacity é um botão que pode ser pressionado
  StyleSheet,        // StyleSheet é usado para criar estilos para os componentes
  SafeAreaView,      // SafeAreaView garante que o conteúdo não fique atrás de barras do sistema
} from 'react-native';

// Função principal do aplicativo
function App() {
  // useState cria um estado para armazenar o valor do contador
  // O primeiro valor (contador) é o valor atual, o segundo (setContador) é a função para alterá-lo
  // 0 significa que o contador começa em zero
  const [contador, setContador] = useState(0);

  // Função que será chamada quando o botão de incrementar for pressionado
  const incrementar = () => {
    // setContador atualiza o valor do contador
    // contador + 1 adiciona 1 ao valor atual do contador
    setContador(contador + 1);
  };

  // Função que será chamada quando o botão de decrementar for pressionado
  const decrementar = () => {
    // Verifica se o contador é maior que 0 antes de decrementar
    // Isso previne que o contador fique negativo
    if (contador > 0) {
      // Se o contador for maior que 0, decrementa (subtrai 1)
      setContador(contador - 1);
    }
    // Se o contador for 0 ou menor, não faz nada (não decrementa)
  };

  // Função que será chamada quando o botão de resetar for pressionado
  const resetar = () => {
    // Define o contador de volta para 0
    setContador(0);
  };

  // Retorna a interface do aplicativo (o que aparece na tela)
  return (
    // SafeAreaView garante que o conteúdo não fique atrás de barras do sistema
    <SafeAreaView style={styles.container}>
      {/* View principal que contém todo o conteúdo */}
      <View style={styles.content}>
        
        {/* Texto do título do aplicativo */}
        <Text style={styles.title}>Contador</Text>

        {/* View que contém o número do contador */}
        <View style={styles.counterContainer}>
          {/* Texto que exibe o valor atual do contador */}
          {/* toString() converte o número para texto para poder ser exibido */}
          <Text style={styles.counterText}>{contador.toString()}</Text>
        </View>

        {/* View que agrupa os botões */}
        <View style={styles.buttonContainer}>
          
          {/* Botão para decrementar (diminuir) o contador */}
          <TouchableOpacity
            style={[styles.button, styles.buttonDecrement]} // Aplica dois estilos: button e buttonDecrement
            onPress={decrementar}                           // Quando pressionado, chama a função decrementar
            disabled={contador === 0}                       // Desabilita o botão se o contador for 0
          >
            {/* Texto dentro do botão (sinal de menos) */}
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          {/* Botão para resetar o contador para zero */}
          <TouchableOpacity
            style={[styles.button, styles.buttonReset]}     // Aplica dois estilos: button e buttonReset
            onPress={resetar}                                // Quando pressionado, chama a função resetar
          >
            {/* Texto dentro do botão */}
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>

          {/* Botão para incrementar (aumentar) o contador */}
          <TouchableOpacity
            style={[styles.button, styles.buttonIncrement]} // Aplica dois estilos: button e buttonIncrement
            onPress={incrementar}                           // Quando pressionado, chama a função incrementar
          >
            {/* Texto dentro do botão (sinal de mais) */}
            <Text style={styles.buttonText}>+</Text>
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
    alignItems: 'center',       // Centraliza o conteúdo horizontalmente
  },
  
  // Estilo do título
  title: {
    fontSize: 32,               // Tamanho da fonte
    fontWeight: 'bold',         // Texto em negrito
    marginBottom: 50,           // Espaçamento inferior de 50 pixels
    color: '#333',              // Cor do texto (cinza escuro)
  },
  
  // Estilo do container do contador
  counterContainer: {
    marginBottom: 50,           // Espaçamento inferior de 50 pixels
    alignItems: 'center',       // Centraliza o conteúdo horizontalmente
    justifyContent: 'center',   // Centraliza o conteúdo verticalmente
  },
  
  // Estilo do texto do contador (o número grande)
  counterText: {
    fontSize: 72,               // Tamanho da fonte muito grande
    fontWeight: 'bold',         // Texto em negrito
    color: '#007AFF',           // Cor azul
  },
  
  // Estilo do container dos botões
  buttonContainer: {
    flexDirection: 'row',       // Coloca os botões lado a lado (horizontal)
    justifyContent: 'center',   // Centraliza os botões horizontalmente
    alignItems: 'center',       // Centraliza os botões verticalmente
    gap: 15,                    // Espaçamento entre os botões (15 pixels)
  },
  
  // Estilo base dos botões
  button: {
    width: 70,                  // Largura fixa de 70 pixels
    height: 70,                 // Altura fixa de 70 pixels
    borderRadius: 35,           // Arredonda as bordas (cria um círculo perfeito)
    justifyContent: 'center',   // Centraliza o conteúdo verticalmente
    alignItems: 'center',       // Centraliza o conteúdo horizontalmente
    elevation: 3,               // Sombra no Android
    shadowColor: '#000',         // Cor da sombra
    shadowOffset: {             // Deslocamento da sombra
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,        // Opacidade da sombra
    shadowRadius: 3.84,        // Raio da sombra
  },
  
  // Estilo do botão de decrementar (sobrescreve algumas propriedades do button)
  buttonDecrement: {
    backgroundColor: '#FF3B30', // Cor de fundo vermelha
  },
  
  // Estilo do botão de resetar (sobrescreve algumas propriedades do button)
  buttonReset: {
    backgroundColor: '#8E8E93', // Cor de fundo cinza
    width: 100,                 // Largura maior para o botão de reset
    borderRadius: 10,           // Bordas menos arredondadas
  },
  
  // Estilo do botão de incrementar (sobrescreve algumas propriedades do button)
  buttonIncrement: {
    backgroundColor: '#34C759', // Cor de fundo verde
  },
  
  // Estilo do texto dos botões
  buttonText: {
    color: '#fff',              // Cor do texto branca
    fontSize: 32,               // Tamanho da fonte grande
    fontWeight: 'bold',         // Texto em negrito
  },
});

// Exporta o componente App para que possa ser usado em outros arquivos
export default App;
