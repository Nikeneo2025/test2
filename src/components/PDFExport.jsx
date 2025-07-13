import React from 'react';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

const PDFExport = ({ targetElementId = 'pdf-content' }) => {
  const { t } = useTranslation();

  const exportToPDF = async () => {
    try {
      const element = document.getElementById(targetElementId);
      if (!element) {
        console.error('Target element not found');
        return;
      }

      // Create canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Calculate dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Save the PDF
      pdf.save('harvest-booster-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="flex justify-center mt-8 mb-4">
      <Button 
        onClick={exportToPDF}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg"
      >
        <FileDown className="w-5 h-5" />
        {t('exportPdf')}
      </Button>
    </div>
  );
};

export default PDFExport;

