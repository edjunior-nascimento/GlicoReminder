import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { estadoConfig } from '../../data/estados';
import { formatarData, getEstado } from '../../utils/formatar';
import * as Speech from 'expo-speech';

type CardGlicemiaProps = {
  glicemia: number;
  data: Date;
};

export default function CardGlicemia({ glicemia, data }: CardGlicemiaProps) {

  const config = estadoConfig[getEstado(glicemia)];

  function click(){
    Speech.speak( 'Glicemia de '+ glicemia + ', ' + config.mensagem);
  }

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: config.background,
        },
      ]}
      
    >
      <TouchableOpacity style={styles.clickContent} onPress={click}>

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