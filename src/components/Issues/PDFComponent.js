import React from 'react';
import {Button} from '@mui/material';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  usePDF,
  Font,
} from '@react-pdf/renderer';
import Roboto from '../../assets/Roboto.ttf';

const PdfComponent = ({timesheets}) => {
  Font.register({family: 'Roboto', src: Roboto});
  const pdfStyles = StyleSheet.create({
    page: {
      flexDirection: 'row',
    },
    title: {
      borderBottom: '1px #ccc solid',
      marginBottom: '20px',
      paddingBottom: '10px',
      fontSize: '16px',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      fontSize: '12px',
      fontFamily: 'Roboto',
    },
    item: {
      margin: '10px 0',
    },
  });

  const PDF = (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.title}>AUTHOR</Text>
          {timesheets.map((timesheet) => (
            <Text
              style={pdfStyles.item}
              key={timesheet.id}
            >
              {timesheet.author}
            </Text>
          ))}
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.title}>TIME</Text>
          {timesheets.map((timesheet) => (
            <Text
              style={pdfStyles.item}
              key={timesheet.id}
            >
              {timesheet.duration}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
  const [instance, updateInstance] = usePDF({document: PDF});

  const savePDF = async () => {
    const a = document.createElement('a');
    a.href = instance.url;
    a.download = 'timesheet';
    a.click();
  };
  return (
    <Button variant="contained" onClick={savePDF}>Download PDF</Button>
  );
};

export default PdfComponent;
