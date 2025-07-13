import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cropData } from '../data/cropData';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

// Define nutrient units locally
const nutrientUnits = {
  nitrogen: 'mg/kg',
  phosphorus: 'mg/kg', 
  potassium: 'mg/kg',
  ph: 'pH',
  ec: 'dS/m'
};

const ComparisonResults = ({ soilData, selectedCrop }) => {
  const { t } = useTranslation();

  if (!selectedCrop || !cropData[selectedCrop]) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-gray-500">Select a crop to see comparison results</p>
        </CardContent>
      </Card>
    );
  }

  const cropInfo = cropData[selectedCrop];
  const cropRequirements = {
    nitrogen: { min: cropInfo.optimal.N[0], max: cropInfo.optimal.N[1], optimal: (cropInfo.optimal.N[0] + cropInfo.optimal.N[1]) / 2 },
    phosphorus: { min: cropInfo.optimal.P[0], max: cropInfo.optimal.P[1], optimal: (cropInfo.optimal.P[0] + cropInfo.optimal.P[1]) / 2 },
    potassium: { min: cropInfo.optimal.K[0], max: cropInfo.optimal.K[1], optimal: (cropInfo.optimal.K[0] + cropInfo.optimal.K[1]) / 2 },
    ph: { min: cropInfo.optimal.pH[0], max: cropInfo.optimal.pH[1], optimal: (cropInfo.optimal.pH[0] + cropInfo.optimal.pH[1]) / 2 },
    ec: { min: cropInfo.optimal.EC[0], max: cropInfo.optimal.EC[1], optimal: (cropInfo.optimal.EC[0] + cropInfo.optimal.EC[1]) / 2 }
  };
  const sellingPrice = cropInfo.msp; // Get selling price
  
  // Conversion factor: 1 mg/kg = 0.81 kg/acre (approx. for 15cm depth, 1.33 g/cm3 bulk density)
  const MG_KG_TO_KG_ACRE = 0.81;

  const analyzeNutrient = (nutrient, currentValue, requirements) => {
    const { min, max, optimal } = requirements;
    const current = parseFloat(currentValue) || 0;
    
    let status = 'optimal';
    let message = '';
    let percentage = 0;
    let yieldImpactPercentage = 0;
    let nutrientGapMgKg = 0;
    let nutrientGapKgAcre = 0;

    if (nutrient === 'ph') {
      if (current < min) {
        status = 'deficient';
        message = t('analysis.phBelowOptimal', { amount: (optimal - current).toFixed(1) });
        percentage = (current / optimal) * 100;
        yieldImpactPercentage = -((optimal - current) / optimal) * 100; // Negative impact
      } else if (current > max) {
        status = 'excess';
        message = t('analysis.phAboveOptimal', { amount: (current - optimal).toFixed(1) });
        percentage = 100;
        yieldImpactPercentage = -((current - optimal) / optimal) * 100; // Negative impact
      } else {
        status = 'optimal';
        message = t('analysis.withinOptimalRange');
        percentage = Math.min(100, (current / optimal) * 100);
        yieldImpactPercentage = Math.max(0, 100 - Math.abs(current - optimal) / optimal * 100);
      }
    } else { // For NPK and EC
      if (current < min) {
        status = 'deficient';
        nutrientGapMgKg = optimal - current;
        nutrientGapKgAcre = nutrientGapMgKg * MG_KG_TO_KG_ACRE;
        message = t('analysis.belowMinimum', { amount: (min - current).toFixed(1), unit: nutrientUnits[nutrient] });
        percentage = (current / min) * 100;
        yieldImpactPercentage = -((min - current) / optimal) * 100; // Negative impact
      } else if (current > max) {
        status = 'excess';
        message = t('analysis.aboveMaximum', { amount: (current - max).toFixed(1), unit: nutrientUnits[nutrient] });
        percentage = 100;
        yieldImpactPercentage = -((current - max) / optimal) * 50; // Negative impact but less severe
      } else {
        status = 'optimal';
        message = t('analysis.withinOptimalRange');
        percentage = Math.min(100, (current / optimal) * 100);
        yieldImpactPercentage = Math.max(0, 100 - Math.abs(current - optimal) / optimal * 100);
      }
    }
    
    return { status, message, percentage, current, optimal, min, max, yieldImpactPercentage, nutrientGapMgKg, nutrientGapKgAcre };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'deficient':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'excess':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-500';
      case 'deficient':
        return 'bg-red-500';
      case 'excess':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      optimal: 'bg-green-100 text-green-800',
      deficient: 'bg-red-100 text-red-800',
      excess: 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge className={colors[status]}>
        {t(`status.${status}`)}
      </Badge>
    );
  };

  // Focus on NPK, pH, EC only
  const focusNutrients = ['nitrogen', 'phosphorus', 'potassium', 'ph', 'ec'];
  const analyses = focusNutrients.map(nutrient => ({
    nutrient,
    ...analyzeNutrient(nutrient, soilData[nutrient], cropRequirements[nutrient])
  }));

  const deficientNutrients = analyses.filter(a => a.status === 'deficient');
  const excessNutrients = analyses.filter(a => a.status === 'excess');
  const optimalNutrients = analyses.filter(a => a.status === 'optimal');

  // Calculate overall yield impact percentage
  const overallYieldImpactPercentage = analyses.reduce((sum, analysis) => sum + analysis.yieldImpactPercentage, 0) / analyses.length;

  // Calculate estimated yield loss in monetary value
  const estimatedYieldLoss = (100 - overallYieldImpactPercentage) / 100 * sellingPrice;

  const HorizontalGraph = ({ analysis }) => {
    const { nutrient, current, optimal, min, max, status } = analysis;
    const maxValue = Math.max(max, current);
    const currentPercentage = (current / maxValue) * 100;
    const optimalPercentage = (optimal / maxValue) * 100;
    const minPercentage = (min / maxValue) * 100;
    const maxPercentage = (max / maxValue) * 100;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status)}
            <span className="font-medium">{t(`nutrients.${nutrient}`)}</span>
            {getStatusBadge(status)}
          </div>
          <span className="text-sm text-gray-600">
            {current} / {optimal} {nutrientUnits[nutrient]}
          </span>
        </div>
        
        <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
          {/* Optimal range background */}
          <div 
            className="absolute h-full bg-green-200"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          {/* Current value bar */}
          <div 
            className={`absolute h-full ${getStatusColor(status)} transition-all duration-500`}
            style={{ width: `${currentPercentage}%` }}
          />
          
          {/* Optimal value marker */}
          <div 
            className="absolute h-full w-1 bg-green-700"
            style={{ left: `${optimalPercentage}%` }}
          />
          
          {/* Value labels */}
          <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-gray-700">
            <span>0</span>
            <span className="font-semibold">Current: {current}</span>
            <span>Target: {optimal}</span>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Min: {min}</span>
          <span>Optimal: {optimal}</span>
          <span>Max: {max}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            {t('analysis.harvestBoosterAnalysis', { crop: cropData[selectedCrop].name })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Overall Yield Impact */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{t('analysis.overallYieldImpact')}</h3>
                <p className="text-sm text-gray-600">{t('analysis.basedOnNutrientLevels')}</p>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold flex items-center gap-2 ${overallYieldImpactPercentage >= 80 ? 'text-green-600' : overallYieldImpactPercentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {overallYieldImpactPercentage >= 80 ? <TrendingUp className="w-8 h-8" /> : <TrendingDown className="w-8 h-8" />}
                  {overallYieldImpactPercentage.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600">{t('analysis.potentialYield')}</p>
              </div>
            </div>
            {sellingPrice && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {t('analysis.estimatedYieldLoss', { amount: estimatedYieldLoss.toFixed(2) })}
                </p>
                <p className="text-sm text-gray-600">
                  {t('analysis.basedOnSellingPrice', { price: sellingPrice })}
                </p>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{optimalNutrients.length}</div>
              <div className="text-sm text-green-700">{t('status.optimal')}</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{deficientNutrients.length}</div>
              <div className="text-sm text-red-700">{t('status.deficient')}</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{excessNutrients.length}</div>
              <div className="text-sm text-orange-700">{t('status.excess')}</div>
            </div>
          </div>

          {/* Horizontal Graphs */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{t('analysis.nutrientAnalysis')}</h3>
            {analyses.map((analysis) => (
              <div key={analysis.nutrient} className="border rounded-lg p-4">
                <HorizontalGraph analysis={analysis} />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-700">{analysis.message}</p>
                  <div className="text-sm font-medium">
                    {t('analysis.yieldImpact')}
                    <span className={`ml-1 ${analysis.yieldImpactPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analysis.yieldImpactPercentage >= 0 ? '+' : ''}{analysis.yieldImpactPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {(deficientNutrients.length > 0 || excessNutrients.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              {t('recommendations.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {deficientNutrients.length > 0 && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">{t('recommendations.deficiencies')}</h4>
                <ul className="space-y-1">
                  {deficientNutrients.map(({ nutrient, message, yieldImpactPercentage, nutrientGapKgAcre }) => (
                    <li key={nutrient} className="text-sm text-red-700">
                      • <strong>{t(`nutrients.${nutrient}`)}:</strong> {message}
                      {nutrientGapKgAcre > 0 && (
                        <span className="ml-2 text-gray-700">
                          {t('analysis.addApprox', { amount: nutrientGapKgAcre.toFixed(2) })}
                        </span>
                      )}
                      <span className="ml-2 text-red-600 font-medium">
                        ({t('analysis.yieldImpact')} {yieldImpactPercentage.toFixed(1)}%)
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-red-700 mt-2">
                  {t('recommendations.deficiencyAdvice')}
                </p>
              </div>
            )}

            {excessNutrients.length > 0 && (
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">{t('recommendations.excesses')}</h4>
                <ul className="space-y-1">
                  {excessNutrients.map(({ nutrient, message, yieldImpactPercentage }) => (
                    <li key={nutrient} className="text-sm text-orange-700">
                      • <strong>{t(`nutrients.${nutrient}`)}:</strong> {message}
                      <span className="ml-2 text-orange-600 font-medium">
                        ({t('analysis.yieldImpact')} {yieldImpactPercentage.toFixed(1)}%)
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-orange-700 mt-2">
                  {t('recommendations.excessAdvice')}
                </p>
              </div>
            )}

            {optimalNutrients.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">{t('recommendations.optimalNutrients')}</h4>
                <p className="text-sm text-green-700">
                  {t('recommendations.optimalAdvice')} {' '}
                  {optimalNutrients.map(({ nutrient }) => t(`nutrients.${nutrient}`)).join(', ')}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {t('recommendations.maintainLevels')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComparisonResults;



