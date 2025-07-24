import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Font = ReactPDF.Font;
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import RingbearerMedium from "../assets/RingbearerCE.otf";

Font.register({
  family: "RingbearerMedium",
  src: RingbearerMedium,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "RingbearerMedium",
  },
  section: {
    margin: 10,
    marginTop: 73,
    padding: 10,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    textAlign: "center",
    zIndex: 0,
  },
  sectionBigMarginTop: {
    margin: 10,
    marginTop: 150,
    padding: 10,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    textAlign: "center",
    zIndex: 0,
  },
  pageCenter: {
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "RingbearerMedium",
  },

  heading: {
    padding: 8,
    fontSize: 55,
    marginBottom: 29,
  },
  row: {
    padding: 4,
    marginBottom: 10,
  },
  smallFont: {
    fontSize: 21,
    padding: 4,
    marginBottom: 13,
  },
  bigFont: {
    fontSize: 30,
    padding: 4,
    marginBottom: 16,
  },
  image: {
    zIndex: 0,
    position: "absolute",
    minWidth: 100,
    minHeight: 100,
  },
});
const images = [img1, img2, img3];
const MyDocument = (props: { objects: { [key: string]: string }[] }) => (
  <Document>
    {props.objects.map((obj, index) => {
      const isThirdImg = (index + 1) % 3 === 0;
      return (
        <Page key={index} size="A4" style={styles.page}>
          <Image src={images[index % images.length]} />
          <View
            style={isThirdImg ? styles.sectionBigMarginTop : styles.section}
          >
            <Text style={styles.heading}>Diplom</Text>
            <Text style={isThirdImg ? styles.smallFont : styles.bigFont}>
              Za {obj["Umístění"]}. místo
            </Text>
            <Text style={isThirdImg ? styles.smallFont : styles.bigFont}>
              Disciplína:
            </Text>
            <Text style={isThirdImg ? styles.smallFont : styles.bigFont}>
              {obj["Disciplína"]}
            </Text>
            <Text style={isThirdImg ? styles.smallFont : styles.bigFont}>
              Kategorie:
            </Text>
            <Text style={isThirdImg ? styles.smallFont : styles.bigFont}>
              {obj["Kategorie"]}
            </Text>
            <Text style={isThirdImg ? styles.smallFont : styles.bigFont}>
              {obj["Jméno a příjmení"]}
            </Text>
          </View>
        </Page>
      );
    })}
  </Document>
);

export default MyDocument;
