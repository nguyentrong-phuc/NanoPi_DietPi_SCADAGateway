import React, { useState, useEffect } from 'react';
import { message } from 'antd';

const ModalToggleSwitch = ({ isOn, handleToggle }) => (
  <div onClick={handleToggle} style={{ width: '36px', height: '20px', borderRadius: '10px', backgroundColor: isOn ? 'var(--primary-color)' : '#dcdfe6', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}>
    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '2px', left: isOn ? '18px' : '2px', transition: 'left 0.2s' }}></div>
  </div>
);

const DataPoint = () => {
  const [slaves, setSlaves] = useState([]);
  const [points, setPoints] = useState({});
  const [activeSlave, setActiveSlave] = useState('slave_status');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, mode: 'add', data: null });
  const itemsPerPage = 15;
  const API_URL = import.meta.env.DEV ? 'http://192.168.41.6' : '';

  useEffect(() => {
    fetch(`${API_URL}/api/edge/data-points`)
      .then(res => res.json())
      .then(data => {
        if (data.slaves) setSlaves(data.slaves);
        if (data.points) setPoints(data.points);
      })
      .catch(console.error);
  }, []);

  const saveConfig = (newSlaves, newPoints) => {
    fetch(`${API_URL}/api/edge/data-points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slaves: newSlaves, points: newPoints })
    })
    .then(res => res.json())
    .then(() => {
      message.success('Configuration saved successfully', 2);
    })
    .catch(console.error);
  };

  const openAddModal = () => {
    setModalConfig({ 
      isOpen: true, 
      mode: 'add', 
      data: { name: '', desc: '', protocol: 'Virtual Slave', polling: '0', merge: 'Open', switch: true } 
    });
  };

  const openEditModal = (slave, e) => {
    e.stopPropagation();
    setModalConfig({ 
      isOpen: true, 
      mode: 'edit', 
      data: { 
        ...slave,
        polling: slave.polling || '500', 
        merge: slave.merge || 'Open', 
        switch: slave.switch !== false,
        ip: slave.ip || slave.desc?.match(/(\d+\.\d+\.\d+\.\d+)/)?.[0] || '127.0.0.1',
        port: slave.port || slave.desc?.match(/:(\d+)/)?.[1] || '502',
        slaveAddress: slave.slaveAddress || '1'
      } 
    });
  };

  const handleDeleteSlave = (slaveId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this Data Point?')) {
      const newSlaves = slaves.filter(s => s.id !== slaveId);
      const newPoints = { ...points };
      delete newPoints[slaveId];
      setSlaves(newSlaves);
      setPoints(newPoints);
      saveConfig(newSlaves, newPoints);
      if (activeSlave === slaveId) {
        setActiveSlave('slave_status');
      }
    }
  };

  const handleDeletePoint = (pointId) => {
    if (window.confirm('Are you sure you want to delete this Point?')) {
      const newPoints = { ...points };
      newPoints[activeSlave] = newPoints[activeSlave].filter(p => p.id !== pointId);
      setPoints(newPoints);
      saveConfig(slaves, newPoints);
    }
  };

  const handleSaveModal = () => {
    let newSlaves = [...slaves];
    let newPoints = { ...points };
    
    if (modalConfig.mode === 'add') {
      const newId = 'custom_' + Date.now();
      newSlaves.push({
        id: newId,
        name: modalConfig.data.name || 'New Slave',
        desc: modalConfig.data.desc || (modalConfig.data.protocol === 'Modbus_TCP' ? `Data Sources: ${modalConfig.data.ip}:${modalConfig.data.port}` : ''),
        protocol: modalConfig.data.protocol,
        status: 'offline',
        isCustom: true,
        ...modalConfig.data
      });
      newPoints[newId] = [];
    } else if (modalConfig.mode === 'edit') {
      const idx = newSlaves.findIndex(s => s.id === modalConfig.data.id);
      if (idx > -1) {
        newSlaves[idx] = { 
          ...newSlaves[idx], 
          ...modalConfig.data,
          desc: modalConfig.data.protocol === 'Modbus_TCP' ? `Data Sources: ${modalConfig.data.ip}:${modalConfig.data.port}` : modalConfig.data.desc
        };
      }
    } else if (modalConfig.mode === 'addPoint') {
      if (!newPoints[activeSlave]) newPoints[activeSlave] = [];
      const newId = newPoints[activeSlave].length > 0 ? Math.max(...newPoints[activeSlave].map(p => p.id)) + 1 : 1;
      newPoints[activeSlave].push({
        id: newId,
        ...modalConfig.data,
        name: modalConfig.data.name || `Point ${newId}`,
        type: modalConfig.data.type || '8 Bit Unsigned',
        rw: modalConfig.data.rw || 'Only Read',
        data: '--',
        address: modalConfig.data.address || '--'
      });
    } else if (modalConfig.mode === 'editPoint') {
      const pIdx = newPoints[activeSlave].findIndex(p => p.id === modalConfig.data.id);
      if (pIdx > -1) {
        newPoints[activeSlave][pIdx] = { ...newPoints[activeSlave][pIdx], ...modalConfig.data };
      }
    }

    setSlaves(newSlaves);
    setPoints(newPoints);
    saveConfig(newSlaves, newPoints);
    closeModal();
  };

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

    const currentPoints = points[activeSlave] || [];
  const totalItems = currentPoints.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const displayedPoints = currentPoints.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const currentSlaveObj = slaves.find(s => s.id === activeSlave);
  const isCustomSlave = currentSlaveObj?.isCustom;

  const showFormulaCols = activeSlave !== 'system_attrs';

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      
      {/* Top Header */}
      <div className="page-title-container">
        <h2 className="page-title">Data Point</h2>
      </div>

      <div className="content-area">
        
        {/* SLAVE SECTION */}
        <div className="card-panel" style={{ marginBottom: '15px' }}>
          <div className="card-header" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="card-header-line"></span>
              <span className="card-title">Slave</span>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginRight: '20px' }}>Version: 1779939851</span>
              <button className="btn btn-primary" onClick={openAddModal} style={{ marginRight: '10px' }}>Add</button>
              <button className="btn btn-outline" onClick={() => setModalConfig({ isOpen: true, mode: 'import', data: null })} style={{ marginRight: '10px' }}>Import</button>
              <button className="btn btn-outline" onClick={() => setModalConfig({ isOpen: true, mode: 'export', data: null })}>Export</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
    {slaves.map(slave => (
              <div 
                key={slave.id} 
                onClick={() => { setActiveSlave(slave.id); setCurrentPage(1); }}
                style={{ 
                  backgroundColor: activeSlave === slave.id ? 'var(--primary-light, #f8fbff)' : 'white', 
                  border: '1px solid',
                  borderColor: activeSlave === slave.id ? 'var(--primary-color)' : '#e4e7ed', 
                  boxShadow: activeSlave === slave.id ? '0 4px 12px rgba(0,63,180,0.1)' : '0 2px 6px rgba(0,0,0,0.02)',
                  borderRadius: '6px',
                  padding: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '140px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {activeSlave === slave.id && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: 'var(--primary-color)' }}></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', marginTop: activeSlave === slave.id ? '2px' : '0' }}>
                  <div style={{ fontWeight: 700, color: '#333', fontSize: '15px', borderLeft: '3px solid var(--primary-color)', paddingLeft: '8px', lineHeight: '15px', borderRadius: '1px' }}>
                    {slave.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#666', fontWeight: 600 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: slave.status === 'online' ? '#28a745' : '#dc3545', marginRight: '6px' }}></div>
                    {slave.status}
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#555', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-line', lineHeight: '1.4' }}>{slave.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ margin: 0 }}>protocol: <strong style={{ color: '#333' }}>{slave.protocol}</strong></p>
                    {slave.isCustom && (
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>
                        <span onClick={(e) => openEditModal(slave, e)} style={{ color: 'var(--primary-color)', opacity: 0.9, marginRight: '12px', cursor: 'pointer' }}>Edit</span>
                        <span onClick={(e) => handleDeleteSlave(slave.id, e)} style={{ color: '#e74c3c', opacity: 0.9, cursor: 'pointer' }}>Delete</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIST OF SLAVE POINTS SECTION */}
        <div className="card-panel" style={{ flex: 1, padding: 0 }}>
          <div className="card-header" style={{ justifyContent: 'space-between', padding: '15px 20px', margin: 0, borderBottom: '1px solid var(--border-color)', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="card-header-line"></div>
              <span className="card-title">List of slave points</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {isCustomSlave && (
                <>
                  <button className="btn btn-primary" onClick={() => setModalConfig({ isOpen: true, mode: 'addPoint', data: null })}>Add</button>
                  <button className="btn btn-danger solid">Delete</button>
                </>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px 20px', backgroundColor: 'white', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Please enterPoint Screen" className="form-input-standard" style={{ width: '220px' }} />
              <button className="btn btn-primary">Point Screen</button>
            </div>
          </div>

          <div className="table-container" style={{ padding: '0 20px', marginTop: '20px' }}>
            <table className="table-unified">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>ID</th>
                  <th>Node name</th>
                  <th>Data Type</th>
                  <th>Decimal Number</th>
                  <th>Address</th>
                  <th>Read Write Status</th>
                  <th>Priority</th>
                  <th>Timeout(ms)</th>
                  <th>Data</th>
                  {showFormulaCols && <th>Acquisition formula</th>}
                  {showFormulaCols && <th>Control formula</th>}
                  <th>Node desc</th>
                  {isCustomSlave && <th>Operation</th>}
                </tr>
              </thead>
              <tbody>
                {displayedPoints.length > 0 ? displayedPoints.map(point => (
                  <tr key={point.id}>
                    <td><input type="checkbox" style={{ margin: 0 }} /></td>
                    <td>{point.id}</td>
                    <td>{point.name}</td>
                    <td>{point.type}</td>
                    <td>{point.decimal}</td>
                    <td>{point.address}</td>
                    <td>{point.rw}</td>
                    <td>{point.priority}</td>
                    <td>{point.timeout}</td>
                    <td>{point.data}</td>
                    {showFormulaCols && <td>{point.acq || '--'}</td>}
                    {showFormulaCols && <td>{point.ctrl || '--'}</td>}
                    <td>{point.desc}</td>
                    {isCustomSlave && (
                      <td style={{ fontWeight: 600 }}>
                        <span onClick={() => setModalConfig({ isOpen: true, mode: 'editPoint', data: point })} style={{ color: 'var(--primary-color)', cursor: 'pointer', marginRight: '12px' }}>Edit</span>
                        <span onClick={() => handleDeletePoint(point.id)} style={{ color: 'var(--danger-color)', cursor: 'pointer' }}>Delete</span>
                      </td>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="14" style={{ padding: '20px', color: '#999' }}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalItems > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '13px', color: 'var(--text-dark)', padding: '20px' }}>
              <span style={{ marginRight: '15px' }}>Total {totalItems}</span>
              <select className="form-input-standard" style={{ width: 'auto', padding: '4px 8px', marginRight: '15px' }}>
                <option>15/page</option>
              </select>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  className="btn btn-default" 
                  disabled={currentPage === 1} 
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ padding: '4px 10px' }}
                >Last</button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-default'}`} 
                    onClick={() => handlePageChange(i + 1)}
                    style={{ padding: '4px 12px' }}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  className="btn btn-default" 
                  disabled={currentPage === totalPages} 
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ padding: '4px 10px' }}
                >Next</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
                Go to <input type="number" min="1" max={totalPages} defaultValue={currentPage} className="form-input-standard" style={{ width: '40px', padding: '4px', margin: '0 5px', textAlign: 'center' }} />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal */}
      {modalConfig.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', width: '540px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Header */}
            <div style={{ padding: '15px 25px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#333' }}>
                {modalConfig.mode === 'add' ? 'Add' : modalConfig.mode === 'edit' ? 'Edit' : modalConfig.mode === 'import' ? 'Import mapping table' : modalConfig.mode === 'export' ? 'Export' : modalConfig.mode === 'editPoint' ? 'Edit' : 'Add'}
              </h3>
              <span onClick={closeModal} style={{ cursor: 'pointer', fontSize: '18px', color: '#999' }}>&times;</span>
            </div>
            
            {/* Body */}
            {modalConfig.mode === 'addPoint' || modalConfig.mode === 'editPoint' ? (
              <div style={{ padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Node name</span>
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.name} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, name: e.target.value }})} placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Node desc</span>
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.desc} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, desc: e.target.value }})} placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Data Type</span>
                  <select className="form-control" defaultValue={modalConfig.data?.type || (modalConfig.mode === 'addPoint' ? 'Bit' : '8 Bit Unsigned')} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, type: e.target.value }})} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: 'white', color: '#606266' }}>
                    <option>Bit</option>
                    <option>8 Bit Unsigned</option>
                    <option>8 Bit Signed</option>
                    <option>16 Bit Unsigned</option>
                    <option>16 Bit Signed</option>
                    <option>32 Bit Unsigned</option>
                    <option>32 Bit Signed</option>
                    <option>32 Bit Float</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Address</span>
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.address || ''} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, address: e.target.value }})} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Decimal Number</span>
                  <select className="form-control" defaultValue={modalConfig.data?.decimal || 0} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: 'white', color: '#606266' }}>
                    <option>0</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Read Write Status</span>
                  <div style={{ flex: 1, display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: (modalConfig.data?.rw === 'Only Read' || !modalConfig.data) ? 'var(--primary-color)' : '#606266', cursor: 'pointer', margin: 0 }}>
                      <input type="radio" name="rwStatus" defaultChecked={modalConfig.data?.rw === 'Only Read' || !modalConfig.data} onChange={() => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, rw: 'Only Read' }})} style={{ accentColor: 'var(--primary-color)', marginRight: '6px' }} /> Only Read
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: modalConfig.data?.rw === 'Read/Write' ? 'var(--primary-color)' : '#606266', cursor: 'pointer', margin: 0 }}>
                      <input type="radio" name="rwStatus" defaultChecked={modalConfig.data?.rw === 'Read/Write'} onChange={() => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, rw: 'Read/Write' }})} style={{ accentColor: 'var(--primary-color)', marginRight: '6px' }} /> Read/Write
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#c0c4cc', cursor: 'not-allowed', margin: 0 }}>
                      <input type="radio" name="rwStatus" disabled style={{ marginRight: '6px' }} /> Only Write
                    </label>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Priority</span>
                  <select className="form-control" defaultValue={modalConfig.data?.priority || (modalConfig.mode === 'addPoint' ? 'Level 0' : 'Level 1')} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: 'white', color: '#606266' }}>
                    <option>Level 0</option>
                    <option>Level 1</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>
                    {modalConfig.mode === 'addPoint' && <span style={{ color: '#ef4444' }}>* </span>}
                    Acquisition formula <span style={{ color: '#aaa', fontSize: '12px', marginLeft: '2px', cursor: 'pointer', backgroundColor: '#eee', borderRadius: '50%', padding: '0 4px' }}>?</span>
                  </span>
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.acq !== '--' ? modalConfig.data?.acq : ''} placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: modalConfig.mode === 'editPoint' ? '#f5f7fa' : 'white' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Control formula <span style={{ color: '#aaa', fontSize: '12px', marginLeft: '2px', cursor: 'pointer', backgroundColor: '#eee', borderRadius: '50%', padding: '0 4px' }}>?</span></span>
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.ctrl !== '--' ? modalConfig.data?.ctrl : ''} placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: modalConfig.mode === 'editPoint' ? '#f5f7fa' : 'white' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Timeout</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #dcdfe6', borderRadius: '4px', paddingRight: '10px' }}>
                    <input type="text" defaultValue={modalConfig.data?.timeout || '2000'} style={{ flex: 1, height: '32px', border: 'none', padding: '6px 12px', fontSize: '13px', outline: 'none', borderRadius: '4px' }} />
                    <span style={{ fontSize: '13px', color: '#606266' }}>ms</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Unit</span>
                  <input type="text" className="form-control" placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
              </div>
            ) : modalConfig.mode === 'export' ? (
              <div style={{ padding: '40px', color: '#606266', fontSize: '14px', lineHeight: '1.6', minHeight: '120px' }}>
                Note: The export point table will synchronously export the data point table, protocol conversion data point table, linkage control event table, and data reporting group table, and will be updated synchronously after importing
              </div>
            ) : modalConfig.mode === 'import' ? (
              <div style={{ padding: '40px 40px 60px 40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '14px', color: '#606266' }}>Import mode:</span>
                  <select 
                    className="form-control" 
                    defaultValue="Import cover"
                    style={{ width: '220px', height: '36px', padding: '6px 12px', fontSize: '14px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: 'white', color: '#606266', cursor: 'pointer' }}
                  >
                    <option value="Import cover">Import cover</option>
                    <option value="Import append">Import append</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '14px', color: '#606266' }}><span style={{ color: '#ef4444' }}>*</span> Select File:</span>
                  <div style={{ width: '280px', height: '36px', border: '1px solid #b3d8ff', borderRadius: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backgroundColor: 'white' }}>
                    <span style={{ color: '#409eff', fontSize: '14px' }}>Select File</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '25px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Slave Name:</span>
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.name} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, name: e.target.value }})} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Slave Description:</span>
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.desc} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, desc: e.target.value }})} placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Acquisition protocol</span>
                  <select 
                    className="form-control" 
                    defaultValue={modalConfig.data?.protocol} 
                    onChange={(e) => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, protocol: e.target.value } })}
                    style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: modalConfig.mode === 'edit' ? '#f5f7fa' : 'white', color: modalConfig.mode === 'edit' ? '#c0c4cc' : '#606266', appearance: 'none', cursor: modalConfig.mode === 'edit' ? 'not-allowed' : 'pointer' }}
                    disabled={modalConfig.mode === 'edit'}
                  >
                    <option value="Virtual Slave">Virtual Slave</option>
                    <option value="Modbus_TCP">Modbus_TCP</option>
                    <option value="Modbus_RTU">Modbus_RTU</option>
                    <option value="IEC_104">IEC_104</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Polling interval:</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #dcdfe6', borderRadius: '4px', paddingRight: '10px' }}>
                    <input type="text" defaultValue={modalConfig.data?.polling} style={{ flex: 1, height: '32px', border: 'none', padding: '6px 12px', fontSize: '13px', outline: 'none', borderRadius: '4px' }} />
                    <span style={{ fontSize: '13px', color: '#606266' }}>ms</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Merge acquisition:</span>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: modalConfig.data?.merge === 'Open' ? 'var(--primary-color)' : '#606266', cursor: 'pointer', margin: 0 }}>
                      <input type="radio" name="merge" defaultChecked={modalConfig.data?.merge === 'Open'} onChange={() => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, merge: 'Open' } })} style={{ accentColor: 'var(--primary-color)', marginRight: '8px' }} /> Open
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: modalConfig.data?.merge === 'Close' ? 'var(--primary-color)' : '#606266', cursor: 'pointer', margin: 0 }}>
                      <input type="radio" name="merge" defaultChecked={modalConfig.data?.merge === 'Close'} onChange={() => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, merge: 'Close' } })} style={{ accentColor: 'var(--primary-color)', marginRight: '8px' }} /> Close
                    </label>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Slave switch:</span>
                  <ModalToggleSwitch isOn={modalConfig.data?.switch} handleToggle={() => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, switch: !modalConfig.data.switch }})} />
                </div>
  
                {modalConfig.data?.protocol === 'Modbus_TCP' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> IP</span>
                      <input type="text" className="form-control" defaultValue={modalConfig.data?.ip || ''} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, ip: e.target.value }})} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Port</span>
                      <input type="text" className="form-control" defaultValue={modalConfig.data?.port || ''} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, port: e.target.value }})} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Slave Address</span>
                      <input type="text" className="form-control" defaultValue={modalConfig.data?.slaveAddress || ''} onChange={e => setModalConfig({ ...modalConfig, data: { ...modalConfig.data, slaveAddress: e.target.value }})} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                    </div>
                  </>
                )}
  
              </div>
            )}
            
            {/* Footer */}
            <div style={{ padding: '15px 25px', display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #f0f0f0' }}>
              <button className="btn btn-default" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={modalConfig.mode === 'import' || modalConfig.mode === 'export' ? closeModal : handleSaveModal}>
                {modalConfig.mode === 'import' || modalConfig.mode === 'export' ? 'Close' : 'Sure'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPoint;
