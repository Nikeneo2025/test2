import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cropData } from '../data/cropData';

const CropSelector = ({ selectedCrop, setSelectedCrop }) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          {t('selectTargetCrop')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('chooseCrop')} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(cropData).map(([key, crop]) => (
              <SelectItem key={key} value={key}>
                {crop.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedCrop && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800">Selected: {cropData[selectedCrop]?.name}</h4>
            <p className="text-sm text-green-700 mt-1">
              This analysis will compare your soil values against the optimal nutrient requirements for {cropData[selectedCrop]?.name.toLowerCase()} cultivation.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CropSelector;

