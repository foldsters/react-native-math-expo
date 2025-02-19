import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, TextInput } from 'react-native';
import { MathModule } from 'react-native-math';

export default function HomeScreen() {
  const [piValue, setPiValue] = useState<number | null>(null);
  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  const [stringResult, setStringResult] = useState<string>('');
  const [inputA, setInputA] = useState(5);
  const [inputB, setInputB] = useState(7);
  const [numberToFormat, setNumberToFormat] = useState('123.456789');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get Pi value from our module
      const pi = MathModule.pi;
      setPiValue(pi);
    } catch (err) {
      setError(`Error loading Pi: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, []);

  const calculateSum = () => {
    try {
      // Call the add method from our module
      const result = MathModule.add(inputA, inputB);
      setCalculationResult(result);
    } catch (err) {
      setError(`Error calculating sum: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const formatNumber = () => {
    try {
      const num = parseFloat(numberToFormat);
      if (isNaN(num)) {
        setError('Please enter a valid number');
        return;
      }
      
      // Call our C utility function through the Nitro module
      const formatted = MathModule.numberToString(num);
      setStringResult(formatted);
      setError(null);
    } catch (err) {
      setError(`Error formatting number: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const incrementInputA = () => setInputA(prev => prev + 1);
  const decrementInputA = () => setInputA(prev => prev - 1);
  const incrementInputB = () => setInputB(prev => prev + 1);
  const decrementInputB = () => setInputB(prev => prev - 1);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>Nitro Math Demo</Text>
        <Text style={styles.headerSubtitle}>Fast native calculations with C++</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pi Value from Native Module</Text>
        </View>
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            π = {piValue !== null ? piValue.toFixed(10) : 'Loading...'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Native Addition Calculation</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Input A:</Text>
          <View style={styles.numberInputContainer}>
            <TouchableOpacity style={styles.button} onPress={decrementInputA}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.numberInput}>
              <Text style={styles.numberInputText}>{inputA}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={incrementInputA}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Input B:</Text>
          <View style={styles.numberInputContainer}>
            <TouchableOpacity style={styles.button} onPress={decrementInputB}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.numberInput}>
              <Text style={styles.numberInputText}>{inputB}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={incrementInputB}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.calculateButton} onPress={calculateSum}>
          <Text style={styles.calculateButtonText}>Calculate Sum</Text>
        </TouchableOpacity>
        
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            Result: {calculationResult !== null ? calculationResult : 'Press Calculate'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Number Formatting (C Implementation)</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Number to format:</Text>
          <TextInput
            style={styles.textInput}
            value={numberToFormat}
            onChangeText={setNumberToFormat}
            keyboardType="numeric"
            placeholderTextColor="#bdcedb"
          />
        </View>
        
        <TouchableOpacity style={styles.calculateButton} onPress={formatNumber}>
          <Text style={styles.calculateButtonText}>Format Number</Text>
        </TouchableOpacity>
        
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            Formatted: {stringResult || 'Press Format Number'}
          </Text>
        </View>
      </View>

      <View style={styles.explainerContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>How It Works</Text>
        </View>
        <Text style={styles.explainerText}>
          This demo showcases a Nitro Module with C/C++ implementation. The module provides:
        </Text>
        <Text style={styles.bulletPoint}>
          • A constant value (π) accessed through a property
        </Text>
        <Text style={styles.bulletPoint}>
          • A native C++ method that performs addition
        </Text>
        <Text style={styles.bulletPoint}>
          • A method that uses a pure C utility for number formatting
        </Text>
        <Text style={styles.technicalNote}>
          Implementation: The number formatting logic is written in pure C (utils.c/h)
          and called from the HybridMath C++ class, demonstrating mixed-language integration.
        </Text>
        
        <View style={styles.codePreview}>
          <Text style={styles.codeTitle}>Math.nitro.ts</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeLine}><Text style={styles.codeKeyword}>interface</Text> <Text style={styles.codeClass}>Math</Text> <Text style={styles.codeKeyword}>extends</Text> <Text style={styles.codeClass}>HybridObject</Text> {'{'}</Text>
            <Text style={styles.codeLine}>  <Text style={styles.codeKeyword}>readonly</Text> pi: <Text style={styles.codeType}>number</Text></Text>
            <Text style={styles.codeLine}>  <Text style={styles.codeFunction}>add</Text>(a: <Text style={styles.codeType}>number</Text>, b: <Text style={styles.codeType}>number</Text>): <Text style={styles.codeType}>number</Text></Text>
            <Text style={styles.codeLine}>  <Text style={styles.codeFunction}>numberToString</Text>(value: <Text style={styles.codeType}>number</Text>): <Text style={styles.codeType}>string</Text></Text>
            <Text style={styles.codeLine}>{'}'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with Nitro Modules
        </Text>
        <Text style={styles.footerSubtext}>
          Documentation at nitro.margelo.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191e2d',
  },
  headerBanner: {
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#111625',
    borderBottomWidth: 2,
    borderBottomColor: '#4e5b79',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 28,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#bdcedb',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 99, 71, 0.3)',
  },
  errorText: {
    color: '#FF6347',
    fontWeight: '500',
  },
  section: {
    margin: 16,
    padding: 20,
    backgroundColor: '#232a3f',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4e5b79',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: '#e0e0e0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#bdcedb',
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberInput: {
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberInputText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#e0e0e0',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#4e5b79',
    borderRadius: 8,
    paddingHorizontal: 12,
    minWidth: 150,
    backgroundColor: '#2c3655',
    color: '#e0e0e0',
    fontSize: 16,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2c3655',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderWidth: 2,
    borderColor: '#4e5b79',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  calculateButton: {
    backgroundColor: '#59b3ef',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  calculateButtonText: {
    color: '#111625',
    fontWeight: '700',
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: '#2c3655',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4e5b79',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e0e0e0',
  },
  explainerContainer: {
    margin: 16,
    padding: 20,
    backgroundColor: '#232a3f',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4e5b79',
  },
  explainerText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#bdcedb',
    marginBottom: 16,
    lineHeight: 24,
  },
  bulletPoint: {
    fontWeight: '500',
    fontSize: 16,
    color: '#bdcedb',
    marginBottom: 8,
    paddingLeft: 8,
  },
  technicalNote: {
    fontWeight: '500',
    fontStyle: 'italic',
    fontSize: 14,
    color: '#a8c4d8',
    marginTop: 16,
    marginBottom: 24,
    opacity: 0.8,
  },
  codePreview: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4e5b79',
  },
  codeTitle: {
    fontWeight: '500',
    fontSize: 14,
    backgroundColor: '#171e31',
    color: '#bdcedb',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#4e5b79',
  },
  codeBlock: {
    backgroundColor: '#111625',
    padding: 16,
  },
  codeLine: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#bdcedb',
    marginBottom: 4,
  },
  codeKeyword: {
    color: '#c678dd', // purple for keywords
  },
  codeClass: {
    color: '#d19a66', // orange for class names
  },
  codeFunction: {
    color: '#61afef', // blue for functions
  },
  codeType: {
    color: '#98c379', // green for types
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#171e31',
    borderTopWidth: 2,
    borderTopColor: '#4e5b79',
  },
  footerText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#bdcedb',
    marginBottom: 4,
  },
  footerSubtext: {
    fontWeight: '500', 
    fontSize: 14,
    color: '#4e5b79',
  }
});