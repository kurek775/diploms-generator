import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Roboto from "../assets/Roboto-Regular.ttf";
import Font = ReactPDF.Font;
import img from "../assets/diplom_3.png";
import Wednesday from "../assets/Wednesday.ttf";

Font.register({
  family: "Wednesday",
  src: Wednesday,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Wednesday",
  },
  subsection: {
    marginTop: 0,
  },
  section: {
    margin: 10,
    marginTop: 80,
    padding: 10,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 0,
  },
  row: {
    padding: 8,
    fontSize: 40,
  },
  footer: {
    marginTop: 320,
    padding: 8,
    fontSize: 40,
  },
  heading: {
    padding: 8,
    fontSize: 60,
    marginBottom: 35,
  },
  image: {
    zIndex: 0,
    position: "absolute",
    minWidth: 100,
    minHeight: 100,
  },
});

const MyDocument = (props: { objects: { [key: string]: string }[] }) => (
  <Document>
    {props.objects.map((obj, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <Image src={img} />
        <View style={styles.section}>
          <Text style={styles.heading}>{obj["Jméno a příjmení"]}</Text>
          <View style={styles.subsection}>
            <Text style={styles.row}>
              získává diplom za {obj["Umístění"]}. místo
            </Text>
            {/*<Text style={styles.row}>v kategorii {obj['Kategorie']}</Text>*/}
            <Text style={styles.row}>v disciplíně {obj["Disciplína"]}</Text>
          </View>
          <Text style={styles.footer}>Klepákův mlýn 2024</Text>
        </View>
      </Page>
    ))}
  </Document>
);

export default MyDocument;
