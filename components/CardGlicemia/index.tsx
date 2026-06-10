import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type CardGlicemiaProps = {
  glicemia: number;
  data: Date;
};

export default function CardGlicemia({ glicemia, data }: CardGlicemiaProps) {
  const date = data instanceof Date ? data : new Date(data);

  const hora = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  const diaMes = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  }).format(date);

  const diaSemana = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  }).format(date);

  const estadoConfig = {
    baixa: { icon: 'caret-down-sharp', iconColor: '#B50303', background: '#FFEDED' },
    alta: { icon: 'caret-up-sharp', iconColor: '#B50303', background: '#FFEDED' },
    normal: { icon: 'checkmark-circle', iconColor: '#009951', background: '#E0FFF1' },
    atencao: { icon: 'warning', iconColor: '#E5A000', background: '#FFFCD8' },
    perigo: { icon: 'alert-circle', iconColor: '#B50303', background: '#FFB7B7' },
  } as const;

  const getEstado = () => {
    if (glicemia < 70) return 'baixa';
    if (glicemia >= 70 && glicemia <= 140) return 'normal';
    if (glicemia > 140 && glicemia <= 180) return 'atencao';
    if (glicemia > 180 && glicemia <= 250) return 'alta';
    if (glicemia > 250) return 'perigo';
    return 'normal';
  }

  const config = estadoConfig[getEstado()];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: config.background,
        },
      ]}
    >
      <View style={styles.leftContent}>
        <Ionicons name={config.icon as any} size={36} color={config.iconColor} />
        <Text style={styles.glicemiaValue}>{glicemia}</Text>
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.time}>{hora}</Text>
        <Text style={styles.date}>{diaMes}</Text>
        <Text style={styles.weekday}>{diaSemana}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 120,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

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
    fontSize: 70,
    fontWeight: '400',
    color: '#000000',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 30,
    fontWeight: '400',
    color: '#000000',
  },
  date: {
    fontSize: 40,
    fontWeight: '400',
    color: '#000000',
  },
  weekday: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    textTransform: 'lowercase',
  },
});