import React, { useState, useEffect } from 'react';
import { message } from 'antd';

const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div 
      onClick={handleToggle}
      style={{
        width: '40px', height: '20px', backgroundColor: isOn ? 'var(--primary-color)' : '#dcdfe6',
        borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
      }}
    >
      <div 
        style={{
          width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%',
          position: 'absolute', top: '2px', left: isOn ? '22px' : '2px', transition: 'all 0.3s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}
      />
    </div>
  );
};

// Modbus Config Component
const ModbusConfig = ({ activeTab, config, setConfig, saveConfig }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalData, setModalData] = useState({});

  const handleAdd = () => {
    setModalMode('add');
    setModalData({ id: config.nodes.length + 1, pos: '', src: '', type: '16 Bit Unsigned', addr: '', rw: 'Read/Write' });
    setModalOpen(true);
  };

  const handleEdit = (node) => {
    setModalMode('edit');
    setModalData({ ...node });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      setConfig({ ...config, nodes: config.nodes.filter(n => n.id !== id) });
    }
  };

  const handleSaveModal = () => {
    if (modalMode === 'add') {
      setConfig({ ...config, nodes: [...config.nodes, modalData] });
    } else {
      setConfig({ ...config, nodes: config.nodes.map(n => n.id === modalData.id ? modalData : n) });
    }
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div className="card-header" style={{ marginBottom: '20px' }}>
          <span className="card-header-line"></span>
          <span className="card-title">Basic settings</span>
        </div>
        
        <div style={{ padding: '0 15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '30px', marginBottom: '30px' }}>
          <div className="card-panel" style={{ padding: '20px 25px', marginBottom: '20px' }}>
            <div className="card-subtitle">Connection Config</div>
            <div style={{ display: 'flex', gap: '30px' }}>
              {activeTab === 'Modbus RTU' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#333', fontWeight: 600 }}><span style={{ color: '#e71562' }}>*</span> RS485:</span>
                  <div style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                    <ToggleSwitch isOn={config.basicSettings?.rs485 || false} handleToggle={() => setConfig({ ...config, basicSettings: { ...config.basicSettings, rs485: !config.basicSettings?.rs485 }})} />
                  </div>
                </div>
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Protocol:</span>
                <select className="form-input-standard" value={config.basicSettings?.protocol || ''} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, protocol: e.target.value}})} style={{ height: '34px' }}>
                  {activeTab === 'Modbus RTU' ? (
                    <>
                      <option value="RTU Master">RTU Master</option>
                      <option value="RTU Slave">RTU Slave</option>
                    </>
                  ) : (
                    <>
                      <option value="TCP Server">TCP Server</option>
                      <option value="TCP Client">TCP Client</option>
                    </>
                  )}
                </select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Local Port:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.port || '502'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, port: e.target.value}})} style={{ height: '34px' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Maximum of Client:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.maxClient || '2'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, maxClient: e.target.value}})} style={{ height: '34px' }} />
              </div>
            </div>
          </div>

          <div className="card-panel" style={{ padding: '20px 25px', marginBottom: '25px', overflowX: 'auto' }}>
            <div className="card-subtitle">Slave Configuration</div>
            <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr 1.3fr 1.3fr 1.5fr', gap: '20px', minWidth: '850px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Slave Address:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.slaveAddress || '1'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, slaveAddress: e.target.value}})} style={{ height: '34px', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Protocol Conversion (16 bit):</span>
                <select className="form-input-standard" value={config.basicSettings?.bit16 || 'AB'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, bit16: e.target.value}})} style={{ height: '34px', width: '100%' }}>
                  <option value="AB">AB</option>
                  <option value="BA">BA</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">32 bit integer byte order:</span>
                <select className="form-input-standard" value={config.basicSettings?.bit32int || 'AB CD'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, bit32int: e.target.value}})} style={{ height: '34px', width: '100%' }}>
                  <option value="AB CD">AB CD</option>
                  <option value="CD AB">CD AB</option>
                  <option value="BA DC">BA DC</option>
                  <option value="DC BA">DC BA</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">32 bit float byte order:</span>
                <select className="form-input-standard" value={config.basicSettings?.bit32float || 'AB CD'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, bit32float: e.target.value}})} style={{ height: '34px', width: '100%' }}>
                  <option value="AB CD">AB CD</option>
                  <option value="CD AB">CD AB</option>
                  <option value="BA DC">BA DC</option>
                  <option value="DC BA">DC BA</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">64 bit float byte order:</span>
                <select className="form-input-standard" value={config.basicSettings?.bit64float || 'ABCDEFGH'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, bit64float: e.target.value}})} style={{ height: '34px', width: '100%' }}>
                  <option value="ABCDEFGH">ABCDEFGH</option>
                  <option value="HGFEDCBA">HGFEDCBA</option>
                  <option value="GHEFCDAB">GHEFCDAB</option>
                  <option value="BADCFEHG">BADCFEHG</option>
                </select>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={saveConfig}>Apply</button>
        </div>

        <div className="card-header" style={{ marginBottom: '20px' }}>
          <span className="card-header-line"></span>
          <span className="card-title">Node mapping table</span>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className="btn btn-primary" onClick={handleAdd}>Add</button>
        </div>

        <div className="table-responsive" style={{ marginBottom: '15px' }}>
          <table className="table table-bordered table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Position Name</th>
                <th>Source(slave)</th>
                <th>Data Type</th>
                <th>Mapping Address</th>
                <th>Read Write Status</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {config.nodes && config.nodes.length > 0 ? config.nodes.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.pos}</td>
                  <td>{row.src}</td>
                  <td>{row.type}</td>
                  <td>{row.addr}</td>
                  <td>{row.rw}</td>
                  <td style={{ fontWeight: 600 }}>
                    <span onClick={() => handleEdit(row)} style={{ color: 'var(--primary-color)', cursor: 'pointer', marginRight: '10px', opacity: 0.9 }}>Edit</span>
                    <span onClick={() => handleDelete(row.id)} style={{ color: 'var(--danger-color)', cursor: 'pointer', opacity: 0.9 }}>Delete</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" style={{ padding: '40px', color: '#999', fontSize: '13px', textAlign: 'center' }}>No data yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '500px', padding: '20px' }}>
            <h3 style={{ marginTop: 0 }}>{modalMode === 'add' ? 'Add Mapping' : 'Edit Mapping'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Position Name:</span>
                <input className="form-control" value={modalData.pos || ''} onChange={e => setModalData({...modalData, pos: e.target.value})} style={{ flex: 1, padding: '5px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Source(slave):</span>
                <input className="form-control" value={modalData.src || ''} onChange={e => setModalData({...modalData, src: e.target.value})} style={{ flex: 1, padding: '5px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Data Type:</span>
                <select className="form-control" value={modalData.type || ''} onChange={e => setModalData({...modalData, type: e.target.value})} style={{ flex: 1, padding: '5px' }}>
                  <option>16 Bit Unsigned</option>
                  <option>16 Bit Signed</option>
                  <option>32 Bit Unsigned</option>
                  <option>32 Bit Signed</option>
                  <option>32 Bit Float</option>
                  <option>64 Bit Float</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Address:</span>
                <input className="form-control" value={modalData.addr || ''} onChange={e => setModalData({...modalData, addr: e.target.value})} style={{ flex: 1, padding: '5px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Read/Write:</span>
                <select className="form-control" value={modalData.rw || ''} onChange={e => setModalData({...modalData, rw: e.target.value})} style={{ flex: 1, padding: '5px' }}>
                  <option>Read/Write</option>
                  <option>Only Read</option>
                  <option>Only Write</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-default" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveModal}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// IEC104 Config Component
const IEC104Config = ({ config, setConfig, saveConfig }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalData, setModalData] = useState({});

  const handleAdd = () => {
    setModalMode('add');
    setModalData({ id: config.nodes.length + 1, pos: '', src: '', type: 'Measured value, short floating point number', addr: '', rw: 'Only Read', asdu: '1' });
    setModalOpen(true);
  };

  const handleEdit = (node) => {
    setModalMode('edit');
    setModalData({ ...node });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this mapping?")) {
      setConfig({ ...config, nodes: config.nodes.filter(n => n.id !== id) });
    }
  };

  const handleSaveModal = () => {
    if (modalMode === 'add') {
      setConfig({ ...config, nodes: [...config.nodes, modalData] });
    } else {
      setConfig({ ...config, nodes: config.nodes.map(n => n.id === modalData.id ? modalData : n) });
    }
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div className="card-header" style={{ marginBottom: '20px' }}>
          <span className="card-header-line"></span>
          <span className="card-title">Basic settings</span>
        </div>
        
        <div style={{ padding: '0 15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '30px', marginBottom: '30px' }}>
          <div className="card-panel" style={{ padding: '20px 25px', marginBottom: '20px', overflowX: 'auto' }}>
            <div className="card-subtitle">Connection Config</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', minWidth: '950px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Local Port:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.port || '2404'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, port: e.target.value}})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">COT size:</span>
                <select className="form-input-standard" value={config.basicSettings?.cot || '2'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, cot: e.target.value}})}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">K:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.k || '25'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, k: e.target.value}})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">W:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.w || '8'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, w: e.target.value}})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">T0:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.t0 || '30'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, t0: e.target.value}})} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', minWidth: '950px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">T1:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.t1 || '15'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, t1: e.target.value}})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">T2:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.t2 || '10'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, t2: e.target.value}})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">T3:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.t3 || '20'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, t3: e.target.value}})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Maximum connection:</span>
                <input type="text" className="form-input-standard" value={config.basicSettings?.maxConnection || '2'} onChange={e => setConfig({...config, basicSettings: {...config.basicSettings, maxConnection: e.target.value}})} />
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={saveConfig}>Apply</button>
        </div>

        <div className="card-header" style={{ marginBottom: '20px' }}>
          <span className="card-header-line"></span>
          <span className="card-title">Node mapping table</span>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className="btn btn-primary" onClick={handleAdd}>Add</button>
        </div>

        <div className="table-responsive" style={{ marginBottom: '15px' }}>
          <table className="table table-bordered table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Position Name</th>
                <th>Source(slave)</th>
                <th>Data Type</th>
                <th>Read Write Status</th>
                <th>Mapping Address</th>
                <th>ASDU</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {config.nodes && config.nodes.length > 0 ? config.nodes.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.pos}</td>
                  <td>{row.src}</td>
                  <td>{row.type}</td>
                  <td>{row.rw}</td>
                  <td>{row.addr}</td>
                  <td>{row.asdu}</td>
                  <td style={{ fontWeight: 600 }}>
                    <span onClick={() => handleEdit(row)} style={{ color: 'var(--primary-color)', cursor: 'pointer', marginRight: '10px', opacity: 0.9 }}>Edit</span>
                    <span onClick={() => handleDelete(row.id)} style={{ color: 'var(--danger-color)', cursor: 'pointer', opacity: 0.9 }}>Delete</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" style={{ padding: '40px', color: '#999', fontSize: '13px', textAlign: 'center' }}>No data yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '500px', padding: '20px' }}>
            <h3 style={{ marginTop: 0 }}>{modalMode === 'add' ? 'Add Mapping' : 'Edit Mapping'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Position Name:</span>
                <input className="form-control" value={modalData.pos || ''} onChange={e => setModalData({...modalData, pos: e.target.value})} style={{ flex: 1, padding: '5px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Source(slave):</span>
                <input className="form-control" value={modalData.src || ''} onChange={e => setModalData({...modalData, src: e.target.value})} style={{ flex: 1, padding: '5px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Data Type:</span>
                <select className="form-control" value={modalData.type || ''} onChange={e => setModalData({...modalData, type: e.target.value})} style={{ flex: 1, padding: '5px' }}>
                  <option>Measured value, short floating point number</option>
                  <option>Measured value, normalized value</option>
                  <option>Single point information</option>
                  <option>Double point information</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Address:</span>
                <input className="form-control" value={modalData.addr || ''} onChange={e => setModalData({...modalData, addr: e.target.value})} style={{ flex: 1, padding: '5px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>ASDU:</span>
                <input className="form-control" value={modalData.asdu || ''} onChange={e => setModalData({...modalData, asdu: e.target.value})} style={{ flex: 1, padding: '5px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '120px' }}>Read/Write:</span>
                <select className="form-control" value={modalData.rw || ''} onChange={e => setModalData({...modalData, rw: e.target.value})} style={{ flex: 1, padding: '5px' }}>
                  <option>Only Read</option>
                  <option>Read/Write</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-default" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveModal}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Protocol = () => {
  const tabs = ['Modbus RTU', 'Modbus TCP', 'IEC104'];
  const [activeTab, setActiveTab] = useState('Modbus RTU');
  const [protocolState, setProtocolState] = useState({
    'Modbus RTU': true,
    'Modbus TCP': true,
    'IEC104': true
  });
  
  const [config, setConfig] = useState({ basicSettings: {}, nodes: [] });

  const getEndpoint = (tab) => {
    if (tab === 'Modbus RTU') return 'modbus_rtu';
    if (tab === 'Modbus TCP') return 'modbus_tcp';
    return 'iec104';
  };

  useEffect(() => {
    fetch(`${API_URL}/api/edge/protocol/${getEndpoint(activeTab)}`)
      .then(res => res.json())
      .then(data => {
        if (data) setConfig({ basicSettings: data.basicSettings || {}, nodes: data.nodes || [] });
      })
      .catch(console.error);
  }, [activeTab]);

  const saveConfig = () => {
    fetch(`${API_URL}/api/edge/protocol/${getEndpoint(activeTab)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    })
    .then(res => res.json())
    .then(() => {
      message.success(`${activeTab} Configuration saved successfully`, 2);
    })
    .catch(console.error);
  };

  const toggleProtocol = () => {
    setProtocolState({
      ...protocolState,
      [activeTab]: !protocolState[activeTab]
    });
  };

  const isOpen = protocolState[activeTab];

  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      <div className="page-title-container">
        <h2 className="page-title">Protocol</h2>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: '180px', backgroundColor: 'white', borderRight: '8px solid #eaedf2' }}>
          {tabs.map(tab => (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '15px 20px', 
                cursor: 'pointer', 
                backgroundColor: activeTab === tab ? 'var(--primary-light, #f0f4f8)' : 'white', 
                color: activeTab === tab ? 'var(--primary-color)' : '#555', 
                fontWeight: activeTab === tab ? 600 : 400, 
                fontSize: '14px',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <span className="card-header-line"></span>
            <span className="card-title" style={{ marginRight: '20px' }}>{activeTab}</span>
            <ToggleSwitch isOn={isOpen} handleToggle={toggleProtocol} />
          </div>
          
          <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {!isOpen ? (
              <>
                <div>
                  <button className="btn btn-primary" style={{ padding: '0 30px' }} disabled>Apply</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-100px' }}>
                  <h3 style={{ fontSize: '20px', color: 'var(--text-dark)', marginBottom: '15px', fontWeight: 600 }}>Function Close</h3>
                  <span onClick={toggleProtocol} style={{ color: 'var(--primary-color)', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Open</span>
                </div>
              </>
            ) : (
              activeTab === 'IEC104' ? 
                <IEC104Config config={config} setConfig={setConfig} saveConfig={saveConfig} /> : 
                <ModbusConfig activeTab={activeTab} config={config} setConfig={setConfig} saveConfig={saveConfig} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protocol;
