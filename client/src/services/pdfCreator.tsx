import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Roboto from '../assets/Roboto-Regular.ttf'
import Font = ReactPDF.Font;


Font.register({
    family: 'Roboto',
    src: Roboto
})
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const MyDocument = (props: { objects: { [key: string]: string }[] }) => (
    <Document>

            {props.objects.map((obj, index) => (
                <Page key={index}  size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Diplom pro ...{obj['Jméno a příjmení']}</Text>
                    <Text>Za {obj['Umístění']}. místo</Text>
                    <Text>V kategorii {obj['Kategorie']}</Text>
                    <Text>V disciplíně {obj['Disciplína']}</Text>
                </View>
                </Page>
            ))}

    </Document>
);

export default MyDocument;
