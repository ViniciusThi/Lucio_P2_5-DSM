/**
 * Calculadora de Desconto de INSS (Avançado)
 * 
 * Este aplicativo calcula o desconto do INSS baseado na tabela
 * de alíquotas progressivas aplicável a partir de 2024.
 * 
 * Tabela de Alíquotas Progressivas:
 * - Até R$ 1.518,00: 7,5%
 * - De R$ 1.518,01 até R$ 2.793,88: 9,0%
 * - De R$ 2.793,89 até R$ 4.190,83: 12,0%
 * - De R$ 4.190,84 até R$ 8.157,41: 14,0%
 * 
 * Teto do INSS: R$ 8.154,41
 * Desconto máximo: R$ 876,96
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
  ScrollView,        // ScrollView permite rolar o conteúdo quando ele é maior que a tela
} from 'react-native';

// Função principal do aplicativo
function App() {
  // useState cria um estado para armazenar o salário bruto digitado pelo usuário
  // O primeiro valor (salarioBruto) é o valor atual, o segundo (setSalarioBruto) é a função para alterá-lo
  // '' significa que começa vazio (string vazia)
  const [salarioBruto, setSalarioBruto] = useState('');

  // useState cria um estado para armazenar o desconto do INSS calculado
  // null significa que ainda não foi calculado
  const [descontoINSS, setDescontoINSS] = useState<number | null>(null);

  // useState cria um estado para armazenar o salário líquido (bruto - desconto)
  // null significa que ainda não foi calculado
  const [salarioLiquido, setSalarioLiquido] = useState<number | null>(null);

  // Função que calcula o desconto do INSS baseado na tabela progressiva
  const calcularINSS = () => {
    // parseFloat converte a string (texto) para um número decimal
    // Por exemplo: "5000" vira 5000 (número)
    const salario = parseFloat(salarioBruto);

    // Verifica se o valor digitado é um número válido
    // isNaN significa "is Not a Number" (não é um número)
    if (isNaN(salario)) {
      // Se não for um número válido, exibe um alerta de erro
      Alert.alert('Erro', 'Por favor, digite um valor numérico válido!');
      // Retorna para parar a execução da função
      return;
    }

    // Verifica se o valor é negativo ou zero
    if (salario <= 0) {
      // Se for negativo ou zero, exibe um alerta de erro
      Alert.alert('Erro', 'O salário deve ser maior que zero!');
      // Retorna para parar a execução da função
      return;
    }

    // Define o teto do INSS (valor máximo de salário que incide desconto)
    const TETO_INSS = 8154.41;

    // Define o desconto máximo do INSS
    const DESCONTO_MAXIMO = 876.96;

    // Variável que armazenará o desconto total calculado
    let desconto = 0;

    // Verifica se o salário é maior que o teto
    if (salario > TETO_INSS) {
      // Se o salário for maior que o teto, aplica o desconto máximo
      desconto = DESCONTO_MAXIMO;
    } else {
      // Se o salário for menor ou igual ao teto, calcula progressivamente

      // 1ª FAIXA: Até R$ 1.518,00 com alíquota de 7,5%
      // Verifica se o salário é maior que o limite da 1ª faixa
      if (salario > 1518.0) {
        // Se for maior, calcula o desconto sobre toda a 1ª faixa
        // 1518.0 * 0.075 = desconto sobre os primeiros R$ 1.518,00
        desconto += 1518.0 * 0.075;
      } else {
        // Se o salário estiver dentro da 1ª faixa, calcula sobre o valor total
        // salario * 0.075 = desconto sobre o salário completo
        desconto += salario * 0.075;
        // Retorna o desconto calculado (não precisa calcular outras faixas)
        setDescontoINSS(desconto);
        setSalarioLiquido(salario - desconto);
        return;
      }

      // 2ª FAIXA: De R$ 1.518,01 até R$ 2.793,88 com alíquota de 9,0%
      // Verifica se o salário é maior que o limite da 2ª faixa
      if (salario > 2793.88) {
        // Se for maior, calcula o desconto sobre toda a 2ª faixa
        // (2793.88 - 1518.0) = diferença entre os limites da 2ª faixa
        // * 0.09 = desconto de 9% sobre essa diferença
        desconto += (2793.88 - 1518.0) * 0.09;
      } else {
        // Se o salário estiver dentro da 2ª faixa, calcula sobre a parte que excede a 1ª faixa
        // (salario - 1518.0) = parte do salário que está na 2ª faixa
        // * 0.09 = desconto de 9% sobre essa parte
        desconto += (salario - 1518.0) * 0.09;
        // Retorna o desconto calculado (não precisa calcular outras faixas)
        setDescontoINSS(desconto);
        setSalarioLiquido(salario - desconto);
        return;
      }

      // 3ª FAIXA: De R$ 2.793,89 até R$ 4.190,83 com alíquota de 12,0%
      // Verifica se o salário é maior que o limite da 3ª faixa
      if (salario > 4190.83) {
        // Se for maior, calcula o desconto sobre toda a 3ª faixa
        // (4190.83 - 2793.88) = diferença entre os limites da 3ª faixa
        // * 0.12 = desconto de 12% sobre essa diferença
        desconto += (4190.83 - 2793.88) * 0.12;
      } else {
        // Se o salário estiver dentro da 3ª faixa, calcula sobre a parte que excede a 2ª faixa
        // (salario - 2793.88) = parte do salário que está na 3ª faixa
        // * 0.12 = desconto de 12% sobre essa parte
        desconto += (salario - 2793.88) * 0.12;
        // Retorna o desconto calculado (não precisa calcular outras faixas)
        setDescontoINSS(desconto);
        setSalarioLiquido(salario - desconto);
        return;
      }

      // 4ª FAIXA: De R$ 4.190,84 até R$ 8.157,41 com alíquota de 14,0%
      // Se chegou aqui, o salário está na 4ª faixa
      // Calcula o desconto sobre a parte que excede a 3ª faixa
      // (salario - 4190.83) = parte do salário que está na 4ª faixa
      // * 0.14 = desconto de 14% sobre essa parte
      desconto += (salario - 4190.83) * 0.14;
    }

    // Arredonda o desconto para 2 casas decimais (centavos)
    // toFixed(2) formata para 2 casas decimais e retorna string
    // parseFloat converte de volta para número
    desconto = parseFloat(desconto.toFixed(2));

    // Atualiza o estado do desconto do INSS com o valor calculado
    setDescontoINSS(desconto);

    // Calcula o salário líquido (salário bruto - desconto do INSS)
    const liquido = salario - desconto;

    // Arredonda o salário líquido para 2 casas decimais
    const liquidoArredondado = parseFloat(liquido.toFixed(2));

    // Atualiza o estado do salário líquido
    setSalarioLiquido(liquidoArredondado);
  };

  // Função para limpar os campos
  const limpar = () => {
    // Limpa o campo de salário bruto
    setSalarioBruto('');
    
    // Limpa o desconto do INSS
    setDescontoINSS(null);
    
    // Limpa o salário líquido
    setSalarioLiquido(null);
  };

  // Função auxiliar para formatar valores monetários em Real (R$)
  const formatarMoeda = (valor: number) => {
    // toLocaleString formata o número com separadores de milhar e casas decimais
    // 'pt-BR' = formato brasileiro
    // { minimumFractionDigits: 2, maximumFractionDigits: 2 } = sempre 2 casas decimais
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Retorna a interface do aplicativo (o que aparece na tela)
  return (
    // SafeAreaView garante que o conteúdo não fique atrás de barras do sistema
    <SafeAreaView style={styles.container}>
      {/* ScrollView permite rolar o conteúdo se for maior que a tela */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} // Esconde a barra de rolagem
      >
        {/* View principal que contém todo o conteúdo */}
        <View style={styles.content}>
          
          {/* Texto do título do aplicativo */}
          <Text style={styles.title}>Calculadora de INSS</Text>

          {/* Texto do subtítulo explicativo */}
          <Text style={styles.subtitle}>
            Cálculo de desconto progressivo
          </Text>

          {/* View que agrupa o campo de entrada */}
          <View style={styles.inputContainer}>
            
            {/* Label (rótulo) para o campo de entrada */}
            <Text style={styles.label}>Salário Bruto (R$):</Text>
            
            {/* Campo de entrada para o salário bruto */}
            <TextInput
              style={styles.input}                          // Aplica o estilo definido em styles.input
              placeholder="Digite o salário bruto"            // Texto que aparece quando o campo está vazio
              placeholderTextColor="#999"                    // Cor do texto placeholder
              keyboardType="numeric"                         // Define o teclado como numérico (mostra números e ponto decimal)
              value={salarioBruto}                           // O valor exibido no campo vem do estado salarioBruto
              onChangeText={setSalarioBruto}                 // Quando o texto muda, atualiza o estado salarioBruto
      />
    </View>

          {/* View que agrupa os botões */}
          <View style={styles.buttonContainer}>
            
            {/* Botão para calcular o desconto do INSS */}
            <TouchableOpacity
              style={styles.button}                         // Aplica o estilo do botão
              onPress={calcularINSS}                        // Quando pressionado, chama a função calcularINSS
            >
              {/* Texto dentro do botão */}
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            {/* Botão para limpar os campos */}
            <TouchableOpacity
              style={[styles.button, styles.buttonClear]}   // Aplica dois estilos: button e buttonClear
              onPress={limpar}                               // Quando pressionado, chama a função limpar
            >
              {/* Texto dentro do botão */}
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {/* View que exibe o resultado (só aparece se o cálculo foi feito) */}
          {/* && significa "e também" - só renderiza se descontoINSS não for null */}
          {descontoINSS !== null && (
            <View style={styles.resultContainer}>
              {/* Texto do título da seção de resultados */}
              <Text style={styles.resultTitle}>Resultado do Cálculo</Text>

              {/* View que exibe o salário bruto */}
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Salário Bruto:</Text>
                <Text style={styles.resultValue}>
                  R$ {formatarMoeda(parseFloat(salarioBruto))}
                </Text>
              </View>

              {/* View que exibe o desconto do INSS */}
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Desconto INSS:</Text>
                <Text style={[styles.resultValue, styles.descontoValue]}>
                  - R$ {formatarMoeda(descontoINSS)}
                </Text>
              </View>

              {/* Linha separadora visual */}
              <View style={styles.separator} />

              {/* View que exibe o salário líquido */}
              <View style={styles.resultRow}>
                <Text style={styles.resultLabelFinal}>Salário Líquido:</Text>
                <Text style={[styles.resultValue, styles.liquidoValue]}>
                  R$ {formatarMoeda(salarioLiquido!)}
                </Text>
              </View>

              {/* View que exibe informações sobre o teto (se aplicável) */}
              {parseFloat(salarioBruto) > 8154.41 && (
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    ⚠️ Salário acima do teto do INSS (R$ 8.154,41)
                  </Text>
                  <Text style={styles.infoText}>
                    Desconto máximo aplicado: R$ 876,96
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* View que exibe a tabela de alíquotas */}
          <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>Tabela de Alíquotas (2024)</Text>
            
            {/* Linha da 1ª faixa */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Até R$ 1.518,00</Text>
              <Text style={styles.tableCell}>7,5%</Text>
            </View>

            {/* Linha da 2ª faixa */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>R$ 1.518,01 até R$ 2.793,88</Text>
              <Text style={styles.tableCell}>9,0%</Text>
            </View>

            {/* Linha da 3ª faixa */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>R$ 2.793,89 até R$ 4.190,83</Text>
              <Text style={styles.tableCell}>12,0%</Text>
            </View>

            {/* Linha da 4ª faixa */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>R$ 4.190,84 até R$ 8.157,41</Text>
              <Text style={styles.tableCell}>14,0%</Text>
            </View>

            {/* Linha do teto */}
            <View style={[styles.tableRow, styles.tableRowTeto]}>
              <Text style={styles.tableCell}>Teto: R$ 8.154,41</Text>
              <Text style={styles.tableCell}>Máx: R$ 876,96</Text>
            </View>
          </View>

        </View>
      </ScrollView>
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
  
  // Estilo do conteúdo do ScrollView
  scrollContent: {
    flexGrow: 1,                // Permite que o conteúdo cresça
    padding: 20,                // Espaçamento interno de 20 pixels
  },
  
  // Estilo do conteúdo interno
  content: {
    flex: 1,                    // Ocupa todo o espaço disponível
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
    fontSize: 16,               // Tamanho da fonte
    textAlign: 'center',        // Centraliza o texto
    marginBottom: 30,           // Espaçamento inferior de 30 pixels
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
    marginBottom: 30,           // Espaçamento inferior
    padding: 20,                // Espaçamento interno
    backgroundColor: '#fff',    // Cor de fundo branca
    borderRadius: 8,            // Arredonda as bordas
  },
  
  // Estilo do título do resultado
  resultTitle: {
    fontSize: 20,               // Tamanho da fonte
    fontWeight: 'bold',         // Texto em negrito
    marginBottom: 15,           // Espaçamento inferior
    color: '#333',              // Cor do texto
    textAlign: 'center',        // Centraliza o texto
  },
  
  // Estilo da linha do resultado
  resultRow: {
    flexDirection: 'row',       // Coloca os elementos lado a lado
    justifyContent: 'space-between', // Espaça os elementos
    marginBottom: 10,            // Espaçamento inferior
    alignItems: 'center',       // Centraliza verticalmente
  },
  
  // Estilo do label do resultado
  resultLabel: {
    fontSize: 16,               // Tamanho da fonte
    color: '#666',              // Cor do texto (cinza médio)
  },
  
  // Estilo do label final (salário líquido)
  resultLabelFinal: {
    fontSize: 18,               // Tamanho da fonte maior
    fontWeight: '600',          // Peso da fonte
    color: '#333',              // Cor do texto
  },
  
  // Estilo do valor do resultado
  resultValue: {
    fontSize: 16,               // Tamanho da fonte
    fontWeight: '600',          // Peso da fonte
    color: '#333',              // Cor do texto
  },
  
  // Estilo do valor do desconto
  descontoValue: {
    color: '#FF3B30',           // Cor vermelha para destacar desconto
  },
  
  // Estilo do valor do salário líquido
  liquidoValue: {
    fontSize: 20,               // Tamanho da fonte maior
    fontWeight: 'bold',         // Texto em negrito
    color: '#34C759',           // Cor verde para destacar
  },
  
  // Estilo da linha separadora
  separator: {
    width: '100%',              // Largura total
    height: 1,                  // Altura de 1 pixel
    backgroundColor: '#ddd',    // Cor cinza claro
    marginVertical: 15,         // Espaçamento vertical
  },
  
  // Estilo da caixa de informação
  infoBox: {
    marginTop: 15,              // Espaçamento superior
    padding: 12,                // Espaçamento interno
    backgroundColor: '#FFF3CD', // Cor de fundo amarela clara
    borderRadius: 6,            // Arredonda as bordas
    borderWidth: 1,             // Largura da borda
    borderColor: '#FFC107',     // Cor da borda amarela
  },
  
  // Estilo do texto de informação
  infoText: {
    fontSize: 14,               // Tamanho da fonte
    color: '#856404',           // Cor do texto (marrom escuro)
    marginBottom: 5,            // Espaçamento inferior
  },
  
  // Estilo do container da tabela
  tableContainer: {
    marginTop: 20,              // Espaçamento superior
    padding: 15,                // Espaçamento interno
    backgroundColor: '#fff',     // Cor de fundo branca
    borderRadius: 8,            // Arredonda as bordas
    marginBottom: 20,           // Espaçamento inferior
  },
  
  // Estilo do título da tabela
  tableTitle: {
    fontSize: 18,               // Tamanho da fonte
    fontWeight: 'bold',         // Texto em negrito
    marginBottom: 15,           // Espaçamento inferior
    color: '#333',              // Cor do texto
    textAlign: 'center',        // Centraliza o texto
  },
  
  // Estilo da linha da tabela
  tableRow: {
    flexDirection: 'row',       // Coloca os elementos lado a lado
    justifyContent: 'space-between', // Espaça os elementos
    paddingVertical: 10,        // Espaçamento vertical
    borderBottomWidth: 1,        // Largura da borda inferior
    borderBottomColor: '#eee',   // Cor da borda inferior
  },
  
  // Estilo da linha do teto (destaque)
  tableRowTeto: {
    backgroundColor: '#E3F2FD', // Cor de fundo azul claro
    marginTop: 5,               // Espaçamento superior
    borderRadius: 4,            // Arredonda as bordas
    paddingHorizontal: 5,       // Espaçamento horizontal
  },
  
  // Estilo da célula da tabela
  tableCell: {
    fontSize: 14,               // Tamanho da fonte
    color: '#333',              // Cor do texto
    flex: 1,                    // Ocupa espaço igual
  },
});

// Exporta o componente App para que possa ser usado em outros arquivos
export default App;
