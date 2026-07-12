import React, { useState, useEffect } from 'react';
import { message } from 'antd';

const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

const Location = () => {
  const [config, setConfig] = useState({
    latitude: '',
    longitude: '',
    altitude: '',
    description: '',
    useGPS: false
  });
  const [gpsData, setGpsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load saved location config
    fetch(`${API_URL}/api/system/location`)
      .then(res => res.json())
      .then(data => {
        if (data) setConfig(prev => ({ ...prev, ...data }));
      })
      .catch(console.error);

    // Load live GPS from system_attrs if available
    fetch(`${API_URL}/api/system/info`)
      .then(res => res.json())
      .then(data => {
        if (data?.gps) setGpsData(data.gps);
      })
      .catch(console.error);
  }, []);

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleUseGPSCoords = () => {
    if (gpsData) {
      setConfig(prev => ({
        ...prev,
        latitude: gpsData.latitude || '',
        longitude: gpsData.longitude || ''
      }));
      setHasChanges(true);
      message.info('GPS coordinates applied. Click Apply to save.', 2);
    }
  };

  const handleApply = () => {
    setLoading(true);
    fetch(`${API_URL}/api/system/location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    })
      .then(res => res.json())
      .then(() => {
        message.success('Location configuration saved successfully', 2);
        setHasChanges(false);
      })
      .catch(() => message.error('Failed to save location', 2))
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    setConfig({ latitude: '', longitude: '', altitude: '', description: '', useGPS: false });
    setHasChanges(false);
    message.info('Location configuration cleared', 2);
  };

  const mapsUrl = config.latitude && config.longitude
    ? `https://www.google.com/maps?q=${config.latitude},${config.longitude}`
    : null;

  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Location</h2>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* GPS Live Data Card */}
        <div className="card-panel" style={{ padding: '20px 25px' }}>
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <span className="card-header-line"></span>
            <span className="card-title">GPS Live Data</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '15px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>GPS Status</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: gpsData?.state === 'A' ? '#27ae60' : '#e74c3c' }}>
                {gpsData?.state === 'A' ? '● Active' : '● No Signal'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Latitude</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>{gpsData?.latitude || '--'}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Longitude</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>{gpsData?.longitude || '--'}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Satellites</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>{gpsData?.satellite || '--'}</div>
            </div>
          </div>
          {gpsData?.latitude && gpsData?.longitude && (
            <button className="btn btn-default" onClick={handleUseGPSCoords} style={{ fontSize: '13px' }}>
              ↙ Use GPS Coordinates
            </button>
          )}
        </div>

        {/* Manual Configuration Card */}
        <div className="card-panel" style={{ padding: '20px 25px' }}>
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <span className="card-header-line"></span>
            <span className="card-title">Manual Configuration</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '700px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label-bold"><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Latitude:</label>
              <input
                type="number"
                step="0.000001"
                min="-90"
                max="90"
                className="form-input-standard"
                placeholder="e.g. 10.762622"
                value={config.latitude}
                onChange={e => handleChange('latitude', e.target.value)}
                style={{ height: '36px' }}
              />
              <span style={{ fontSize: '11px', color: '#999' }}>Range: -90 to 90 (° decimal)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label-bold"><span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>Longitude:</label>
              <input
                type="number"
                step="0.000001"
                min="-180"
                max="180"
                className="form-input-standard"
                placeholder="e.g. 106.660172"
                value={config.longitude}
                onChange={e => handleChange('longitude', e.target.value)}
                style={{ height: '36px' }}
              />
              <span style={{ fontSize: '11px', color: '#999' }}>Range: -180 to 180 (° decimal)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label-bold">Altitude (m):</label>
              <input
                type="number"
                step="0.1"
                className="form-input-standard"
                placeholder="e.g. 5.0"
                value={config.altitude}
                onChange={e => handleChange('altitude', e.target.value)}
                style={{ height: '36px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="form-label-bold">Site Description:</label>
              <input
                type="text"
                className="form-input-standard"
                placeholder="e.g. Rooftop - Building A"
                value={config.description}
                onChange={e => handleChange('description', e.target.value)}
                style={{ height: '36px' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '25px', display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-primary"
              onClick={handleApply}
              disabled={loading || !hasChanges}
            >
              {loading ? 'Saving...' : 'Apply'}
            </button>
            <button className="btn btn-default" onClick={handleReset}>Reset</button>
          </div>
        </div>

        {/* Map Preview */}
        {config.latitude && config.longitude && (
          <div className="card-panel" style={{ padding: '20px 25px' }}>
            <div className="card-header" style={{ marginBottom: '15px' }}>
              <span className="card-header-line"></span>
              <span className="card-title">Map Preview</span>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ fontSize: '13px', color: '#555' }}>
                📍 <strong>{parseFloat(config.latitude).toFixed(6)}°</strong>, <strong>{parseFloat(config.longitude).toFixed(6)}°</strong>
                {config.altitude && <span style={{ marginLeft: '10px' }}>⬆ {config.altitude} m</span>}
                {config.description && <span style={{ marginLeft: '10px', color: '#888' }}>— {config.description}</span>}
              </div>
              {mapsUrl && (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-default" style={{ fontSize: '12px', padding: '4px 12px', textDecoration: 'none' }}>
                  Open in Google Maps ↗
                </a>
              )}
            </div>
            <iframe
              title="map-preview"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ borderRadius: '4px', border: '1px solid var(--border-color)' }}
              src={`https://maps.google.com/maps?q=${config.latitude},${config.longitude}&z=15&output=embed`}
              allowFullScreen
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Location;
