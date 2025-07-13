import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SoilInputForm = ({ soilData, setSoilData }) => {
  const { t } = useTranslation();

  const handleInputChange = (field, value) => {
    setSoilData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          {t('currentSoilAnalysis')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Nutrients (NPK) */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-4">{t('primaryNutrients')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nitrogen">{t('nutrients.nitrogen')}</Label>
              <div className="relative">
                <Input
                  id="nitrogen"
                  type="number"
                  placeholder="0.0"
                  value={soilData.nitrogen}
                  onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {t('units.mgkg')}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phosphorus">{t('nutrients.phosphorus')}</Label>
              <div className="relative">
                <Input
                  id="phosphorus"
                  type="number"
                  placeholder="0.0"
                  value={soilData.phosphorus}
                  onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {t('units.mgkg')}
                </span>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="potassium">{t('nutrients.potassium')}</Label>
              <div className="relative">
                <Input
                  id="potassium"
                  type="number"
                  placeholder="0.0"
                  value={soilData.potassium}
                  onChange={(e) => handleInputChange('potassium', e.target.value)}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {t('units.mgkg')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Soil Properties */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-4">{t('soilProperties')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ph">{t('nutrients.ph')}</Label>
              <div className="relative">
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={soilData.ph}
                  onChange={(e) => handleInputChange('ph', e.target.value)}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {t('units.ph')}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec">{t('nutrients.ec')}</Label>
              <div className="relative">
                <Input
                  id="ec"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={soilData.ec}
                  onChange={(e) => handleInputChange('ec', e.target.value)}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {t('units.dsm')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilInputForm;

