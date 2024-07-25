import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Font = ReactPDF.Font;
import img_1 from "../assets/1.jpg";
import img_2 from "../assets/2.jpg";
import img_3 from "../assets/3.jpg";
import RingbearerCE from "../assets/RingbearerCE.otf";

Font.register({
  family: "RingbearerCE",
  src: RingbearerCE,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "RingbearerCE",
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
    marginTop: 140,
    padding: 8,
    fontSize: 30,
  },
  klepak_footer: {
    marginTop: 250,
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
          <Text style={styles.row}>{obj["Disciplína"]}</Text>
          <Text style={styles.klepak_footer}>Klepákův mlýn 2024</Text>
        </View>
      </Page>
    ))}
  </Document>
);

export default MyDocument;
