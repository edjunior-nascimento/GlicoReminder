import { ActivityIndicator, Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardGlicemia from '../../components/CardGlicemia';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore/lite';
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
  const [lastDoc, setLastDoc] = useState<any>();
  const [loading, setLoading] = useState(false);


  const handleDeleted = (id: string) => {
    setListaGlicemia(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    buscarInicial();
  }, []);



  async function buscarInicial() {
    setLoading(true);
    try {

      const glicemiaQuery = query(
        collection(db, 'glicemia'),
        orderBy('data', 'desc'),
        limit(10)
      );

      const querySnapshot = await getDocs(glicemiaQuery);

      const lista = [] as GlicemiaType[];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          glicemia: doc.data().glicemia,
          data: doc.data().data.toDate(),
        });
      });

      setListaGlicemia(lista);

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

    } catch (error) {

      console.log(error);

    }
    setLoading(false);
  }



  async function carregarMais() {

    if (!lastDoc || loading) return;

    setLoading(true);

    try {

      const glicemiaQuery = query(
        collection(db, 'glicemia'),
        orderBy('data', 'desc'),
        startAfter(lastDoc),
        limit(10)
      );

      const querySnapshot = await getDocs(glicemiaQuery);


      if (querySnapshot.empty) {
        setLoading(false);
        return;
      }


      const lista = [] as GlicemiaType[];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          glicemia: doc.data().glicemia,
          data: doc.data().data.toDate(),
        });
      });


      setListaGlicemia((prevLista) => {
        const novos = lista.filter(
          (item) => !prevLista.some((p) => p.id === item.id)
        );
        return [...prevLista, ...novos];
      });

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

    } catch (error) {

      console.log(error);

    }
    setLoading(false);
  }



  return (
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
            marginHorizontal:20
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

      <FlatList
        data={listaGlicemia}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardGlicemia key={item.id} id={item.id} glicemia={item.glicemia} data={item.data} onDelete={handleDeleted} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // 👈 gap
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="blue"
            />
          ) : (
            <View />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    flex: 1,
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