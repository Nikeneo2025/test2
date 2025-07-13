import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import { cropData } from './data/cropData';
import SoilInputForm from './components/SoilInputForm';
import CropSelector from './components/CropSelector';
import ComparisonResults from './components/ComparisonResults';
import ImportanceSection from './components/ImportanceSection';
import LanguageSelector from './components/LanguageSelector';
import PDFExport from './components/PDFExport';

// Import crop images
import agriculturalPhoto from './assets/agricultural_photo1.jpg';
import cornImage from './assets/crop_photos/corn.jpg';
import paddyImage from './assets/crop_photos/paddy.jpg';
import wheatImage from './assets/crop_photos/wheat.jpg';
import ragiImage from './assets/crop_photos/ragi.jpg';
import cottonImage from './assets/crop_photos/cotton.jpg';
import jowarImage from './assets/crop_photos/jowar.jpg';
import turDalImage from './assets/crop_photos/tur_dal.jpg';
import moongDalImage from './assets/crop_photos/moong_dal.jpg';
import uradDalImage from './assets/crop_photos/urad_dal.jpg';
import groundnutImage from './assets/crop_photos/groundnut.jpg';
import sunflowerSeedsImage from './assets/crop_photos/sunflower_seeds.jpg';
import soyaBeanImage from './assets/crop_photos/soya_bean.jpg';
import sesamumImage from './assets/crop_photos/sesamum.jpg';
import masurImage from './assets/crop_photos/masur.jpg';
import safflowerImage from './assets/crop_photos/safflower.jpg';
import sugarcaneImage from './assets/crop_photos/sugarcane.jpg';

const cropImages = {
  corn: cornImage,
  paddy: paddyImage,
  wheat: wheatImage,
  ragi: ragiImage,
  cotton: cottonImage,
  jowar: jowarImage,
  tur_dal: turDalImage,
  moong_dal: moongDalImage,
  urad_dal: uradDalImage,
  groundnut: groundnutImage,
  sunflower_seeds: sunflowerSeedsImage,
  soya_bean: soyaBeanImage,
  sesamum: sesamumImage,
  masur: masurImage,
  safflower: safflowerImage,
  sugarcane: sugarcaneImage,
};

function App() {
  const { t } = useTranslation();
  const [soilData, setSoilData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    ec: '',
  });
  const [selectedCrop, setSelectedCrop] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setShowResults(true);
  };

  const handleBackToInput = () => {
    setShowResults(false);
  };

  const visionTable = [
    { metric: 'Small/Marginal Farmers', india: '85%', global: 'N/A', gap: 'High' },
    { metric: 'Fertilizer Misuse', india: 'Common', global: 'Less', gap: 'High' },
    { metric: 'Soil Degradation', india: '30%', global: 'Varies', gap: 'High' },
    { metric: 'Traditional Soil Testing', india: 'Slow/Manual', global: 'Advanced', gap: 'High' },
    { metric: 'Yield Gap (Rice)', india: '2.7 ton/ha', global: '4.5 ton/ha', gap: '-40%' },
    { metric: 'Yield Gap (Maize)', india: '3.0 ton/ha', global: '5.8 ton/ha', gap: '-48%' },
    { metric: 'Yield Gap (Wheat)', india: '3.0 ton/ha', global: '3.5 ton/ha', gap: '-14%' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-green-700 mb-2">{t('title')}</h1>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Agricultural Photo at the top */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={selectedCrop && cropImages[selectedCrop] ? cropImages[selectedCrop] : agriculturalPhoto} 
            alt="Agricultural Field" 
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        {!showResults ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <SoilInputForm soilData={soilData} setSoilData={setSoilData} />
              <CropSelector selectedCrop={selectedCrop} setSelectedCrop={setSelectedCrop} />
              <button 
                onClick={handleAnalyze} 
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {t('analyzeButton')}
              </button>
            </div>
            <div>
              <ImportanceSection />
              {/* Vision Table */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">{t('vision.title')}</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">{t('vision.metric')}</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">{t('vision.india')}</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">{t('vision.global')}</th>
                        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">{t('vision.gap')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visionTable.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-2 px-4 border-b text-sm text-gray-800">{t(`vision.data.${row.metric.replace(/\s|\(|\)/g, '')}`)}</td>
                          <td className="py-2 px-4 border-b text-sm text-gray-800">{row.india}</td>
                          <td className="py-2 px-4 border-b text-sm text-gray-800">{row.global}</td>
                          <td className="py-2 px-4 border-b text-sm text-gray-800">{row.gap}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="dashboard-content">
            <ComparisonResults soilData={soilData} selectedCrop={selectedCrop} />
            <button 
              onClick={handleBackToInput} 
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('backButton')}
            </button>
            <div className="mt-4 flex justify-center">
              <PDFExport targetElementId="dashboard-content" fileName="HarvestBooster_Report.pdf" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


