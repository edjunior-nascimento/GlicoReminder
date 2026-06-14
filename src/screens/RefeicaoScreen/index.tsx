import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CardAlimento from '../../components/CardAlimento';
import { dieta } from '../../data/dieta';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function RefeicaoScreen({ route }: any) {
    const refeicao = route?.params;

    const [abaAtiva, setAbaAtiva] = useState(0);
    const dietas = dieta.find(d => d.id.toString() === refeicao);

    useEffect(() => {
        if (dietas) {
            falar(0);
        }
    }, []);

    function falar(index:number) {
        Speech.stop();
        if (!dietas) return;

        if(index === 0) {
            Speech.speak(`Para o ${dietas?.refeicao}, você tem ${dietas?.opcoes.length} opção${dietas?.opcoes.length > 1 ? 's' : ''}. A opção ${index + 1} voce pode está comendo: ${dietas?.opcoes[index].itens.map(i => `${i.medidaCaseira} de ${i.alimento}`).join(', com')}`);
        }else {
            Speech.speak(`Na opção ${index + 1} voce pode está comendo: ${dietas?.opcoes[index].itens.map(i => `${i.medidaCaseira} de ${i.alimento}`).join(', com')}`);
        }
    }


    return (
        <ScrollView>
            <View style={styles.container}>

                <Pressable style={styles.titlePill}>
                    <Text style={styles.titleText}>{dietas?.refeicao}</Text>
                    <MaterialCommunityIcons name="leaf" size={32} color="#96B82E" />
                </Pressable>
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabsRow}
                    >
                        {
                            dietas?.opcoes.map((opcao, index) => (
                                <Pressable
                                    key={index}
                                    style={[styles.tabButton, abaAtiva === index && styles.tabButtonAtiva]}
                                    onPress={() => { setAbaAtiva(index); falar(index); }}
                                >
                                    <Text style={[styles.tabText, abaAtiva === index && styles.tabTextAtiva]}>OPÇÃO {index + 1}</Text>
                                </Pressable>
                            ))
                        }
                    </ScrollView>
                </View>

                <View style={styles.optionCard}>
                    {
                        dietas?.opcoes[abaAtiva].itens.map((item, index) => (
                            <CardAlimento key={index} alimento={item.alimento} medidaCaseira={item.medidaCaseira} imagem={item.imagem} />
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 16,

    },
    tabsRow: {
        flexDirection: 'row',
        gap: 8,
    },
    tabButton: {
        minWidth: 140,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonAtiva: {
        backgroundColor: '#0f3d0f',
    },
    tabText: {
        color: '#1b4115',
        fontSize: 16,
        fontWeight: '700',
    },
    tabTextAtiva: {
        color: '#ffffff',
    },
    titlePill: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#0f3d0f',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: '700',
    },
    optionCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
    },
});
