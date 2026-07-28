import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportPDFOptions {
  title: string;
  filename: string;
  columns: string[];
  data: any[][];
}

export const exportToPDF = ({ title, filename, columns, data }: ExportPDFOptions) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  doc.text(`Data de Geração: ${new Date().toLocaleDateString('pt-BR')}`, 14, 22);

  // Tabela
  autoTable(doc, {
    startY: 30,
    head: [columns],
    body: data,
    theme: 'grid',
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    styles: { fontSize: 8, cellPadding: 3 },
  });

  doc.save(`${filename}.pdf`);
};
