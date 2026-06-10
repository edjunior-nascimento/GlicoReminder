import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore/lite';
import { db } from '../../../firebase/config';
import * as Speech from 'expo-speech';
import { messagens } from '../../data/mensagens';
import { getEstado } from '../../utils/formatar';



export default function AddGlicemiaScreen({ navigation }: any) {


  const [glicemia, setGlicemia] = useState(0);

  
 async function salvar() {
    if (glicemia > 0) {

      falar();
      
      await addDoc(collection(db, 'glicemia'), {
        glicemia: glicemia,
        data: new Date(),
      });
      navigation.goBack();
    }
  }

  function falar() {

    //recuperar a lista de mensagens para o estado atual da glicemia
    const lista = messagens[getEstado(glicemia)]

    //sortear uma mensagem da lista
    const index = Math.floor(Math.random() * lista.length);

    //falar a mensagem sorteada
    Speech.speak(lista[index], {rate: 1.2});

  }


  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setGlicemia((prev) => Math.floor(prev / 10));
    } else {
      //limitar a glicemia a 3 dígitos
      if (glicemia < 100) {
        setGlicemia((prev) => prev * 10 + parseInt(key));
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.displayBox}>
        <Text style={styles.displayText}>{glicemia ? glicemia : ''}</Text>
      </View>

      <View style={styles.keypadContainer}>
        <View style={styles.keypadRow}>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('1')}>
            <Text style={styles.keyText}>1</Text>
          </Pressable>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('2')}>
            <Text style={styles.keyText}>2</Text>
          </Pressable>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('3')}>
            <Text style={styles.keyText}>3</Text>
          </Pressable>
        </View>
        <View style={styles.keypadRow}>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('4')}>
            <Text style={styles.keyText}>4</Text>
          </Pressable>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('5')}>
            <Text style={styles.keyText}>5</Text>
          </Pressable>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('6')}>
            <Text style={styles.keyText}>6</Text>
          </Pressable>
        </View>
        <View style={styles.keypadRow}>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('7')}>
            <Text style={styles.keyText}>7</Text>
          </Pressable>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('8')}>
            <Text style={styles.keyText}>8</Text>
          </Pressable>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('9')}>
            <Text style={styles.keyText}>9</Text>
          </Pressable>
        </View>
        <View style={styles.keypadRow}>
          <Pressable style={styles.keyButton}>
          </Pressable>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('0')}>
            <Text style={styles.keyText}>0</Text>
          </Pressable>
          <Pressable style={styles.keyButton} onPress={() => handleKeyPress('backspace')}>
            <Ionicons name="backspace-outline" size={36} color="black" />
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.saveButton} onPress={salvar}>
        <Text style={styles.saveButtonText}>SALVAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 12,
  },
  displayBox: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 35,
    color: '#111111',
    fontWeight: '400',
  },
  keypadContainer: {
    width: '100%'
  },
  keypadRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 8,
  },
  keyButton: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 35,
    color: '#111111',
    fontWeight: '400',
  },
  saveButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#c30000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
});