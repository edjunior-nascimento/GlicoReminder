import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { estadoConfig } from '../../data/estados';
import { formatarData, getEstado } from '../../utils/formatar';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { db } from '../../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore/lite';

type CardGlicemiaProps = {
  id: string;
  glicemia: number;
  data: Date;
  onDelete?: (id: string) => void;
};

export default function CardGlicemia({ id, glicemia, data, onDelete }: CardGlicemiaProps) {

  const config = estadoConfig[getEstado(glicemia)];
    const [visible, setVisible] = useState(false);
  

  function falar(){
    Speech.speak( 'Glicemia de '+ glicemia + ', ' + config.mensagem);
  }

  const excluirItem = () => {
    Alert.alert(
      'Apagar Registro',
      'Tem certeza que deseja apagar este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => {
            deleteDoc(doc(db, 'glicemia', id));
            onDelete?.(id);
            setVisible(false);
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: config.background,
        },
      ]}
      
    >
      <TouchableOpacity style={styles.clickContent} onPress={falar} onLongPress={() => setVisible(true)}>

        <View style={styles.leftContent}>
          <Ionicons name={config.icon as any} size={24} color={config.iconColor} />
          <Text style={styles.glicemiaValue}>{glicemia}</Text>
        </View>

        <View style={styles.rightContent}>
          <Text style={styles.time}>{formatarData({ data }).hora}</Text>
          <Text style={styles.date}>{formatarData({ data }).diaMes}</Text>
          <Text style={styles.weekday}>{formatarData({ data }).diaSemana}</Text>
        </View>
    </TouchableOpacity>
    <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setVisible(false)}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: 200,
              borderRadius: 10,
              padding: 10
            }}
          >
            <TouchableOpacity
              onPress={falar}
              style={{ padding: 15, display: 'flex', flexDirection: 'row', gap: 5 }}
            >
              <Ionicons name="volume-medium" size={24} color="black" />
              <Text style={{ fontSize: 20 }}>
                Ouvir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={excluirItem}
              style={{ padding: 15, display: 'flex', flexDirection: 'row', gap: 5 }}
            >
              <Ionicons name="trash-sharp" size={24} color="black" />
              <Text style={{ fontSize: 20 }}>
                Apagar
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 120,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clickContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  arrow: {
    fontSize: 46,
    lineHeight: 52,
    marginRight: 8,
    fontWeight: '700',
  },
  glicemiaValue: {
    fontSize: 35,
    fontWeight: '400',
    color: '#000000',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  date: {
    fontSize: 30,
    fontWeight: '400',
    color: '#000000',
  },
  weekday: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    textTransform: 'lowercase',
  },
});