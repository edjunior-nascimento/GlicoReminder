import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type CardAlimentoProps = {
    imagem: ImageSourcePropType | string;
    alimento: string;
    medidaCaseira: string;
};

function getImageSource(imagem: ImageSourcePropType | string): ImageSourcePropType {
    if (typeof imagem === "string") {
        return { uri: imagem };
    }

    return imagem;
}

export default function CardAlimento({
    imagem,
    alimento,
    medidaCaseira,
}: CardAlimentoProps) {
    return (
        <View style={styles.card}>
            <Image source={getImageSource(imagem)} style={styles.imagem} resizeMode="contain" />

            <View style={styles.content}>
                <Text style={styles.alimento}>{alimento}</Text>

                <View style={styles.separator} />

                <Text style={styles.medidaCaseira}>{medidaCaseira}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#8C8C8C",
        borderStyle: "dashed",
        backgroundColor: "#FFFFFF",
    },
    imagem: {
        width: 112,
        height: 86,
        marginRight: 14,
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    alimento: {
        color: "#204F17",
        fontSize: 25,
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    separator: {
        width: "92%",
        borderBottomWidth: 1,
        borderBottomColor: "#BDBDBD",
        borderStyle: "dashed",
        marginTop: 8,
        marginBottom: 12,
    },
    quantidade: {
        fontSize: 22,
        fontWeight: "400",
        color: "#111111",
        lineHeight: 30,
    },
    medidaCaseira: {
        fontSize: 22,
        fontWeight: "400",
        color: "#111111",
        lineHeight: 30,
    },
});
