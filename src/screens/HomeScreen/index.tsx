import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardGlicemia from '../../components/CardGlicemia';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { db } from '../../../firebase/config';
import { createStaticNavigation, useFocusEffect } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DietaScreen from '../DietaScreen';

type HomeScreenProps = {
  navigation: any;
};

type GlicemiaType = {
  id: string;
  glicemia: number;
  data: Date;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {

  const [listaGlicemia, setListaGlicemia] = useState<GlicemiaType[]>([]);
  const [loading, setLoading] = useState(false);


const handleDeleted = (id: string) => {
  setListaGlicemia(prev => prev.filter(item => item.id !== id));
};
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      buscarGlicemia();
    }, [])
  );

  

  async function buscarGlicemia() {

    try {

      const glicemiaQuery = query(
        collection(db, 'glicemia'),
        orderBy('data', 'desc')
      );

      const querySnapshot = await getDocs(
        glicemiaQuery
      );

      const lista = [] as GlicemiaType[];

      querySnapshot.forEach((doc) => {

        lista.push({
          id: doc.id,
          glicemia: doc.data().glicemia,
          data: doc.data().data.toDate(),
        });

      });

      setListaGlicemia(lista);

    } catch (error) {

      console.log(error);

    }
    setLoading(false);
  }



  return (
    <ScrollView>
      <View style={styles.cardContent}>
        <TouchableOpacity
          style={{
            backgroundColor: '#B50303',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('AddGlicemia')}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            ADICIONAR GLICEMIA
          </Text>
        </TouchableOpacity>

            {loading && (
              <ActivityIndicator
                size="large"
                color="blue"
              />
            )}

        {listaGlicemia.length > 0 && (
          listaGlicemia.map((item) => (
            <CardGlicemia key={item.id} id={item.id} glicemia={item.glicemia} data={item.data} onDelete={handleDeleted} />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  buttonAddGlicemia: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
});