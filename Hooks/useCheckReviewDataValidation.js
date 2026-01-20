export const useCheckReviewDataValidation = (data) => {
  const errors = [];
  const warnings = [];
  // Garment Information validation
  if (!data.styleCode || data.styleCode.trim() === '') {
    errors.push({ message: 'Style Code is required', step: 'garment-info', field: 'styleCode' });
  }
  if (!data.garmentType || data.garmentType.trim() === '') {
    errors.push({ message: 'Garment Type is required', step: 'garment-info', field: 'garmentType' });
  }
  if (!data.garmentCategory || data.garmentCategory.trim() === '') {
    errors.push({ message: 'Category is required', step: 'garment-info', field: 'garmentCategory' });
  }
  if (!data.fitSilhouette || data.fitSilhouette.trim() === '') {
    warnings.push({ message: 'Fit/Silhouette is recommended', step: 'garment-info', field: 'fitSilhouette' });
  }
  if (!data.targetGender || data.targetGender.trim() === '') {
    warnings.push({ message: 'Target Gender is recommended', step: 'garment-info', field: 'targetGender' });
  }
  if (!data.season || data.season.trim() === '') {
    warnings.push({ message: 'Season is recommended', step: 'garment-info', field: 'season' });
  }
  if (!data.baseSize || data.baseSize.trim() === '') {
    errors.push({ message: 'Base Size is required', step: 'garment-info', field: 'baseSize' });
  }

  // Measurements validation
  if (!data.measurements || data.measurements.length === 0) {
    errors.push({ message: 'At least one measurement is required', step: 'measurements', field: 'measurements' });
  } else {
    data.measurements.forEach((m, index) => {
      if (!m.name || m.name.trim() === '') {
        errors.push({ message: `Measurement ${index + 1}: Name is required`, step: 'measurements', field: `measurements[${index}].name` });
      }
      if (!m.value || m.value.trim() === '') {
        errors.push({ message: `${m.name || 'Measurement ' + (index + 1)}: Value is required`, step: 'measurements', field: `measurements[${index}].value` });
      }
      if (!m.tolerance || m.tolerance.trim() === '') {
        warnings.push({ message: `${m.name || 'Measurement ' + (index + 1)}: Tolerance is recommended`, step: 'measurements', field: `measurements[${index}].tolerance` });
      }
    });
  }

  // Fabrics validation
  if (!data.fabrics || data.fabrics.length === 0) {
    errors.push({ message: 'At least one fabric is required', step: 'fabrics', field: 'fabrics' });
  } else {
    data.fabrics.forEach((fabric, index) => {
      if (!fabric.fabricName || fabric.fabricName.trim() === '') {
        errors.push({ message: `Fabric ${index + 1}: Name is required`, step: 'fabrics', field: `fabrics[${index}].fabricName` });
      }
      if (!fabric.composition || fabric.composition.trim() === '') {
        errors.push({ message: `${fabric.fabricName || 'Fabric ' + (index + 1)}: Composition is required`, step: 'fabrics', field: `fabrics[${index}].composition` });
      }
      if (!fabric.gsm || fabric.gsm.trim() === '') {
        warnings.push({ message: `${fabric.fabricName || 'Fabric ' + (index + 1)}: GSM is recommended`, step: 'fabrics', field: `fabrics[${index}].gsm` });
      }
      if (!fabric.constructionType || fabric.constructionType.trim() === '') {
        errors.push({ message: `${fabric.fabricName || 'Fabric ' + (index + 1)}: Construction Type is required`, step: 'fabrics', field: `fabrics[${index}].constructionType` });
      }
    });
  }

  // Trims validation
  if (data.trims && data.trims.length === 0) {
    warnings.push({ message: 'No trims defined - consider adding if applicable', step: 'trims', field: 'trims' });
  } else if (data.trims && data.trims.length > 0) {
    data.trims.forEach((trim, index) => {
      if (!trim.trimType || trim.trimType.trim() === '') {
        errors.push({ message: `Trim ${index + 1}: Type is required`, step: 'trims', field: `trims[${index}].trimType` });
      }
    });
  }

  // Construction validation
  if (!data.construction.neck.stitchType || data.construction.neck.stitchType.trim() === '') {
    warnings.push({ message: 'Neck: Stitch Type is recommended', step: 'construction', field: 'neck.stitchType' });
  }
  if (!data.construction.neck.spi || data.construction.neck.spi.trim() === '') {
    warnings.push({ message: 'Neck: SPI is recommended', step: 'construction', field: 'neck.spi' });
  }
  
  if (!data.construction.sleeve.stitchType || data.construction.sleeve.stitchType.trim() === '') {
    warnings.push({ message: 'Sleeve: Stitch Type is recommended', step: 'construction', field: 'sleeve.stitchType' });
  }
  if (!data.construction.sleeve.spi || data.construction.sleeve.spi.trim() === '') {
    errors.push({ message: 'Sleeve: SPI is required', step: 'construction', field: 'sleeve.spi' });
  }

  if (!data.construction.hem.stitchType || data.construction.hem.stitchType.trim() === '') {
    errors.push({ message: 'Hem: Stitch Type is required', step: 'construction', field: 'hem.stitchType' });
  }
  if (!data.construction.hem.spi || data.construction.hem.spi.trim() === '') {
    errors.push({ message: 'Hem: SPI is required', step: 'construction', field: 'hem.spi' });
  }

  // Artwork validation
  if (data.artworks && data.artworks.length === 0) {
    warnings.push({ message: 'No artwork defined - consider adding if applicable', step: 'artwork', field: 'artworks' });
  } else if (data.artworks && data.artworks.length > 0) {
    data.artworks.forEach((artwork, index) => {
      if (!artwork.artworkName || artwork.artworkName.trim() === '') {
        errors.push({ message: `Artwork ${index + 1}: Name is required`, step: 'artwork', field: `artworks[${index}].artworkName` });
      }
      if (!artwork.artworkType || artwork.artworkType.trim() === '') {
        errors.push({ message: `${artwork.artworkName || 'Artwork ' + (index + 1)}: Type is required`, step: 'artwork', field: `artworks[${index}].artworkType` });
      }
    });
  }

  // BOM validation
  if (!data.bomItems || data.bomItems.length === 0) {
    errors.push({ message: 'BOM must contain at least one item generated from fabrics/trims', step: 'bom', field: 'bomItems' });
  } else {
    data.bomItems.forEach((item, index) => {
      if (!item.componentName || item.componentName.trim() === '') {
        errors.push({ message: `BOM Item ${index + 1}: Component Name is required`, step: 'bom', field: `bomItems[${index}].componentName` });
      }
      if (!item.consumption || item.consumption.trim() === '') {
        warnings.push({ message: `${item.componentName || 'BOM Item ' + (index + 1)}: Consumption is recommended`, step: 'bom', field: `bomItems[${index}].consumption` });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};