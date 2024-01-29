import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDF } from './PDF'

export const PDFButton = ({ atencion }) => (
  <>
    <PDFDownloadLink
      className='middle none center mr-4 rounded-lg bg-blue-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
      document={<PDF atencion={atencion} />}
      fileName={`BOLETA DE ATENCION - ${atencion.numero_atencion}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Cargando documento...' : 'Descargar PDF'
      }
    </PDFDownloadLink>
  </>
)
