import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DietaScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.item} onPress={() => navigation.navigate('Refeicao', '1')} >
                <Ionicons name="cafe-outline" size={24} color="black" />
                <Text style={styles.itemText}>Café da manhã</Text>
            </Pressable>
            <Pressable style={styles.item} onPress={() => navigation.navigate('Refeicao', '2')} >
                <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" />
                <Text style={styles.itemText}>Lanche da manhã</Text>
            </Pressable>
            <Pressable style={styles.item} onPress={() => navigation.navigate('Refeicao', '3')} >
                <MaterialCommunityIcons name="food-drumstick-outline" size={24} color="black" />
                <Text style={styles.itemText}>Almoço</Text>
            </Pressable>
            <Pressable style={styles.item} onPress={() => navigation.navigate('Refeicao', '4')} >
                <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" />
                <Text style={styles.itemText}>Lanche da tarde</Text>
            </Pressable>
            <Pressable style={styles.item} onPress={() => navigation.navigate('Refeicao', '5')} >
                <MaterialCommunityIcons name="bowl-mix-outline" size={24} color="black" />
                <Text style={styles.itemText}>Jantar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        backgroundColor: '#ffffff',
    },
    itemText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#222222',
    },
});
