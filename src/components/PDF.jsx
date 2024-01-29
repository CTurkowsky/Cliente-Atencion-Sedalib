import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 20,
    borderBottom: '1 solid black',
    textAlign: 'center'
  },
  headerItem: {
    margin: 5,
    fontSize: 8 // reducido de 10 a 8
  },
  title: {
    fontSize: 18, // reducido de 20 a 18
    marginBottom: 10,
    textAlign: 'center'
  },
  bold: {
    fontWeight: '800'
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 0,
    padding: 5,
    flexGrow: 1,
    fontSize: 10, // reducido de 12 a 10
    marginBottom: 10 // Agregado margen inferior
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10 // Aumentado de 0 a 10
  },
  column: {
    flexDirection: 'column',
    margin: 0,
    width: '45%'
  },
  divider: {
    borderBottom: '1 solid black',
    marginBottom: 10,
    marginTop: 10
  },
  textRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: 100 // Ajusta este valor según tus necesidades
  },
  value: {
    flex: 1
  }
})

export const PDF = ({ atencion }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerItem}>
          NUEVO MUNDO ABC OUTSOURCING S.A.C.
        </Text>
        <Text style={[styles.title, styles.bold]}>
          BOLETA DE ATENCIÓN : {atencion.numero_atencion}
        </Text>
        <Text style={styles.headerItem}>
          JR. PUCALA NRO. 289 URB. MARANGA LIMA - LIMA - SAN MIGUEL
        </Text>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.textRow}>
              <Text style={styles.label}>Departamento:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.departamento}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Provincia:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.provincia}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Distrito:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.distrito}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Dirección:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.direccion}
              </Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.textRow}>
              <Text style={styles.label}>Nombre del Cliente:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.nombre_cliente}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Celular:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.celular}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Email:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.email}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Documento de Identidad:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.doc_identidad}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.textRow}>
              <Text style={styles.label}>Modalidad:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.modalidad}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Fecha:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {new Date(atencion.fecha).toISOString().split('T')[0]}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Categoría:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.categoria}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Sub Categoría:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.sub_categoria}
              </Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.textRow}>
              <Text style={styles.label}>Problema:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.problema}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Petitorio:</Text>
              <Text
                style={[styles.value, { marginRight: 10 }]}
                numberOfLines={null}
                ellipsizeMode='clip'
              >
                {atencion.petitorio}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
)
