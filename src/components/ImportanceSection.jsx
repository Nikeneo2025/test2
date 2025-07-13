import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ImportanceSection = () => {
  const { t } = useTranslation();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          {t('importanceTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-green-700">{t('nutrients.nitrogen')}</h4>
          <p className="text-sm text-gray-700">
            {t('importance.nitrogen')}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">{t('nutrients.phosphorus')}</h4>
          <p className="text-sm text-gray-700">
            {t('importance.phosphorus')}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">{t('nutrients.potassium')}</h4>
          <p className="text-sm text-gray-700">
            {t('importance.potassium')}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">{t('nutrients.ph')}</h4>
          <p className="text-sm text-gray-700">
            {t('importance.ph')}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">{t('nutrients.ec')}</h4>
          <p className="text-sm text-gray-700">
            {t('importance.ec')}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-green-700">Humidity</h4>
          <p className="text-sm text-gray-700">
            {t('importance.humidity')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportanceSection;

