import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Font = ReactPDF.Font;
import img_1 from "../assets/diplom_1.png";
import img_2 from "../assets/diplom_2.png";
import img_3 from "../assets/diplom_3.png";
import Caudex from "../assets/Caudex-Regular.ttf";

Font.register({
  family: "Caudex-Regular",
  src: Caudex,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Caudex-Regular",
  },
  subsection: {
    marginTop: 0,
  },
  section: {
    margin: 10,
    marginTop: 133,
    padding: 10,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 0,
  },
  row: {
    padding: 8,
    fontSize: 30,
  },
  footer: {
    marginTop: 320,
    padding: 8,
    fontSize: 30,
  },
  klepak_footer: {
    marginTop: 9,
    padding: 8,
    fontSize: 20,
  },
  heading: {
    padding: 8,
    fontSize: 50,
    marginBottom: 15,
  },
  image: {
    zIndex: 0,
    position: "absolute",
    minWidth: 100,
    minHeight: 100,
  },
});

const img: Map<number, string> = new Map([
  [1, img_1],
  [2, img_2],
  [3, img_3],
]);
const MyDocument = (props: { objects: { [key: string]: string }[] }) => (
  <Document>
    {props.objects.map((obj, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <Image src={img.get(parseInt(obj["Umístění"]))} />
        <View style={styles.section}>
          <Text style={styles.heading}>{obj["Jméno a příjmení"]}</Text>
          <Text style={styles.footer}>
            získává diplom za {obj["Umístění"]}. místo
          </Text>
          {obj["Disciplína"] !== "Úklid" ? (
            <Text style={styles.row}>v kategorii {obj["Kategorie"]}</Text>
          ) : null}
          <Text style={styles.row}>v disciplíně {obj["Disciplína"]}</Text>
          <Text style={styles.klepak_footer}>Klepákův mlýn 2024</Text>
        </View>
      </Page>
    ))}
  </Document>
);

export default MyDocument;
