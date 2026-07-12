import React, { useState } from 'react';

const ModalToggleSwitch = ({ isOn, handleToggle }) => (
  <div onClick={handleToggle} style={{ width: '36px', height: '20px', borderRadius: '10px', backgroundColor: isOn ? 'var(--primary-color)' : '#dcdfe6', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}>
    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '2px', left: isOn ? '18px' : '2px', transition: 'left 0.2s' }}></div>
  </div>
);

const mockSlaves = [
  { id: 'slave_status', name: 'Slave_Status', desc: 'Slave Status\n0:offline 1:abnormal 2:online 3:stop', protocol: 'Slave Status', status: 'online', isCustom: false },
  { id: 'system_attrs', name: 'System_Attributes', desc: 'System Node', protocol: 'System Node', status: 'online', isCustom: false },
  { id: 'node', name: 'Node', desc: '', protocol: 'Virtual Slave', status: 'online', isCustom: true },
  { id: 'logger', name: 'Logger3000_1', desc: 'Data Sources: 172.168.41.20:502', protocol: 'Modbus_TCP', status: 'offline', isCustom: true },
  { id: 'pm5320', name: 'PM5320_1', desc: 'Data Sources: 172.168.41.12:502', protocol: 'Modbus_TCP', status: 'offline', isCustom: true },
  { id: 'envision', name: 'Envision_1', desc: 'Data Sources: 172.168.41.11:502', protocol: 'Modbus_TCP', status: 'offline', isCustom: true },
];

const mockPoints = {
  'slave_status': [
    { id: 1, name: 'Envision_1', type: '8 Bit Signed', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 2000, data: '--', acq: '--', ctrl: '--', desc: 'Envision_1' },
    { id: 2, name: 'PM5320_1', type: '8 Bit Signed', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 2000, data: '0', acq: '--', ctrl: '--', desc: 'PM5320_1' },
    { id: 3, name: 'Logger3000_1', type: '8 Bit Signed', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 2000, data: '0', acq: '--', ctrl: '--', desc: 'Logger3000_1' },
    { id: 4, name: 'Node', type: '8 Bit Signed', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 2000, data: '2', acq: '--', ctrl: '--', desc: 'Node' },
  ],
  'system_attrs': [
    { id: 1, name: 'sys_timestamp_str', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '1783838262', desc: 'String timestamp' },
    { id: 2, name: 'sys_local_time2', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '2026-07-12 13:37:43', desc: 'Sec local time' },
    { id: 3, name: 'sys_timestamp_ms', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '1783838263006', desc: 'Millisecond timestamp' },
    { id: 4, name: 'sys_timestamp', type: '32 Bit Unsigned(AB)', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '1783838263', desc: 'Timestamp' },
    { id: 5, name: 'sys_gps_state', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: 'V', desc: 'GPS status' },
    { id: 6, name: 'sys_satellite', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '0', desc: 'Satellite count' },
    { id: 7, name: 'sys_speed', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '0.00000000', desc: 'Ground speed' },
    { id: 8, name: 'sys_latitude', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '0.00000000', desc: 'Latitude' },
    { id: 9, name: 'sys_longitude', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '0.00000000', desc: 'Longitude' },
    { id: 10, name: 'sys_csq', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '0', desc: 'Signal strength' },
    { id: 11, name: 'sys_ver', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: 'V1.3.03.115731.1001', desc: 'Device version' },
    { id: 12, name: 'sys_iccid2', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '--', desc: 'ICCID2' },
    { id: 13, name: 'sys_iccid1', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '--', desc: 'ICCID1' },
    { id: 14, name: 'sys_imei', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '--', desc: 'Device IMEI' },
    { id: 15, name: 'sys_mac', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: 'D4:AD:20:F9:3F:C9', desc: 'Device MAC' },
    { id: 16, name: 'sys_sn', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '02800726042200000268', desc: 'Device SN' },
    { id: 17, name: 'sys_unix_time', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '1783838368759', desc: 'UNIX timestamp' },
    { id: 18, name: 'sys_local_time', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '2026-07-12 13:39:28', desc: 'Local time' },
    { id: 19, name: 'sys_utc_time', type: 'string', decimal: 0, address: '--', rw: 'Only Read', priority: 'Level 1', timeout: 0, data: '2026-07-12 06:39:28Z', desc: 'UTC time' },
  ],
  'node': [
     { id: 1, name: 'DO02', type: 'Bit', decimal: 0, address: 'DO 02', rw: 'Read/Write', priority: 'Level 1', timeout: 2000, data: '0', acq: '--', ctrl: '--', desc: '--' }
  ],
  'logger': [],
  'pm5320': [],
  'envision': []
};

const DataPoint = () => {
  const [activeSlave, setActiveSlave] = useState('slave_status');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, mode: 'add', data: null });
  const itemsPerPage = 15;

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
        name: slave.name, 
        desc: '', 
        protocol: slave.protocol, 
        polling: '500', 
        merge: 'Open', 
        switch: true,
        ip: slave.desc.match(/(\d+\.\d+\.\d+\.\d+)/)?.[0] || '172.168.41.12',
        port: slave.desc.match(/:(\d+)/)?.[1] || '502',
        slaveAddress: '255'
      } 
    });
  };

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const currentPoints = mockPoints[activeSlave] || [];
  const totalItems = currentPoints.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const displayedPoints = currentPoints.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const showFormulaCols = activeSlave !== 'system_attrs';

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: '#eaedf2', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <div style={{ padding: '15px 20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Data Point
        </h2>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* SLAVE SECTION (White Background) */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderTop: '1px solid #dee2e6', borderBottom: '1px solid #dee2e6', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Slave</span>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#666', marginRight: '20px' }}>Version: 1779939851</span>
              <button className="btn btn-primary active-btn" onClick={openAddModal} style={{ padding: '6px 20px', marginRight: '10px', fontWeight: 600, fontSize: '13px' }}>Add</button>
              <button className="btn" onClick={() => setModalConfig({ isOpen: true, mode: 'import', data: null })} style={{ padding: '6px 20px', marginRight: '10px', fontWeight: 600, fontSize: '13px', backgroundColor: 'white', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}>Import</button>
              <button className="btn" onClick={() => setModalConfig({ isOpen: true, mode: 'export', data: null })} style={{ padding: '6px 20px', fontWeight: 600, fontSize: '13px', backgroundColor: 'white', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}>Export</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {mockSlaves.map(slave => (
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
                        <span onClick={(e) => e.stopPropagation()} style={{ color: '#e74c3c', opacity: 0.9, cursor: 'pointer' }}>Delete</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIST OF SLAVE POINTS SECTION (White Background) */}
        <div style={{ backgroundColor: 'white', padding: '20px', flex: 1, borderTop: '1px solid #dee2e6' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>List of slave points</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary active-btn" onClick={() => setModalConfig({ isOpen: true, mode: 'addPoint', data: null })} style={{ padding: '0 20px', height: '32px', fontWeight: 600, fontSize: '13px' }}>Add</button>
              <button className="btn" style={{ backgroundColor: '#fff', color: '#f56c6c', padding: '0 20px', height: '32px', fontWeight: 600, fontSize: '13px', border: '1px solid #f56c6c' }}>Delete</button>
              <input type="text" placeholder="Please enterPoint Screen" className="form-control" style={{ padding: '6px 12px', fontSize: '13px', width: '220px', height: '32px', marginLeft: '10px' }} />
              <button className="btn" style={{ backgroundColor: '#e9ecef', color: '#666', padding: '0 20px', height: '32px', fontWeight: 600, fontSize: '13px', border: '1px solid #ddd' }} disabled>Point Screen</button>
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f7fa', color: '#333', fontWeight: 700 }}>
                  <th style={{ padding: '12px 10px', width: '40px' }}><input type="checkbox" style={{ margin: 0 }} /></th>
                  <th style={{ padding: '12px 10px', width: '50px' }}>ID</th>
                  <th style={{ padding: '12px 10px' }}>Node name</th>
                  <th style={{ padding: '12px 10px' }}>Data Type</th>
                  <th style={{ padding: '12px 10px' }}>Decimal Number</th>
                  <th style={{ padding: '12px 10px' }}>Address</th>
                  <th style={{ padding: '12px 10px' }}>Read Write Status</th>
                  <th style={{ padding: '12px 10px' }}>Priority</th>
                  <th style={{ padding: '12px 10px' }}>Timeout(ms)</th>
                  <th style={{ padding: '12px 10px' }}>Data</th>
                  {showFormulaCols && <th style={{ padding: '12px 10px' }}>Acquisition formula</th>}
                  {showFormulaCols && <th style={{ padding: '12px 10px' }}>Control formula</th>}
                  <th style={{ padding: '12px 10px' }}>Node desc</th>
                  <th style={{ padding: '12px 10px' }}>Operation</th>
                </tr>
              </thead>
              <tbody>
                {displayedPoints.length > 0 ? displayedPoints.map(point => (
                  <tr key={point.id} style={{ borderBottom: '1px solid #f0f0f0', color: '#555' }}>
                    <td style={{ padding: '10px' }}><input type="checkbox" style={{ margin: 0 }} /></td>
                    <td style={{ padding: '10px' }}>{point.id}</td>
                    <td style={{ padding: '10px' }}>{point.name}</td>
                    <td style={{ padding: '10px' }}>{point.type}</td>
                    <td style={{ padding: '10px' }}>{point.decimal}</td>
                    <td style={{ padding: '10px' }}>{point.address}</td>
                    <td style={{ padding: '10px' }}>{point.rw}</td>
                    <td style={{ padding: '10px' }}>{point.priority}</td>
                    <td style={{ padding: '10px' }}>{point.timeout}</td>
                    <td style={{ padding: '10px' }}>{point.data}</td>
                    {showFormulaCols && <td style={{ padding: '10px' }}>{point.acq || '--'}</td>}
                    {showFormulaCols && <td style={{ padding: '10px' }}>{point.ctrl || '--'}</td>}
                    <td style={{ padding: '10px' }}>{point.desc}</td>
                    <td style={{ padding: '10px', fontWeight: 600 }}>
                      <span style={{ color: 'var(--primary-color)', cursor: 'pointer', marginRight: '12px', opacity: 0.9 }}>Edit</span>
                      <span style={{ color: '#e74c3c', cursor: 'pointer', opacity: 0.9 }}>Delete</span>
                    </td>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '13px', color: '#333' }}>
              <span style={{ marginRight: '15px' }}>Total {totalItems}</span>
              <select style={{ padding: '4px 8px', border: '1px solid #ddd', borderRadius: '3px', marginRight: '15px', color: '#333' }}>
                <option>15/page</option>
              </select>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ padding: '4px 10px', border: '1px solid #ddd', backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white', color: currentPage === 1 ? '#aaa' : '#333', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', borderRadius: '3px' }}
                >
                  Last
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{ padding: '4px 10px', border: 'none', backgroundColor: currentPage === page ? 'var(--primary-color)' : 'white', color: currentPage === page ? 'white' : '#333', cursor: 'pointer', borderRadius: '3px' }}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{ padding: '4px 10px', border: '1px solid #ddd', backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white', color: currentPage === totalPages ? '#aaa' : '#333', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', borderRadius: '3px' }}
                >
                  Next
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
                Go to <input type="number" min="1" max={totalPages} defaultValue={currentPage} style={{ width: '40px', padding: '4px', margin: '0 5px', border: '1px solid #ddd', borderRadius: '3px', textAlign: 'center' }} />
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
                {modalConfig.mode === 'add' ? 'Add' : modalConfig.mode === 'edit' ? 'Edit' : modalConfig.mode === 'import' ? 'Import mapping table' : modalConfig.mode === 'export' ? 'Export' : 'Add'}
              </h3>
              <span onClick={closeModal} style={{ cursor: 'pointer', fontSize: '18px', color: '#999' }}>&times;</span>
            </div>
            
            {/* Body */}
            {modalConfig.mode === 'addPoint' ? (
              <div style={{ padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Node name</span>
                  <input type="text" className="form-control" placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Node desc</span>
                  <input type="text" className="form-control" placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Data Type</span>
                  <select className="form-control" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: 'white', color: '#606266' }}>
                    <option>Bit</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Position Number</span>
                  <input type="text" className="form-control" defaultValue="1" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Decimal Number</span>
                  <select className="form-control" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: 'white', color: '#606266' }}>
                    <option>0</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Read Write Status</span>
                  <div style={{ flex: 1, display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#eb7e30', cursor: 'pointer', margin: 0 }}>
                      <input type="radio" name="rwStatus" defaultChecked style={{ accentColor: '#eb7e30', marginRight: '6px' }} /> Only Read
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#606266', cursor: 'pointer', margin: 0 }}>
                      <input type="radio" name="rwStatus" style={{ marginRight: '6px' }} /> Read/Write
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#c0c4cc', cursor: 'not-allowed', margin: 0 }}>
                      <input type="radio" name="rwStatus" disabled style={{ marginRight: '6px' }} /> Only Write
                    </label>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Priority</span>
                  <select className="form-control" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none', backgroundColor: 'white', color: '#606266' }}>
                    <option>Level 0</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Acquisition formula <span style={{ color: '#aaa', fontSize: '12px', marginLeft: '2px', cursor: 'pointer', backgroundColor: '#eee', borderRadius: '50%', padding: '0 4px' }}>?</span></span>
                  <input type="text" className="form-control" placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Control formula <span style={{ color: '#aaa', fontSize: '12px', marginLeft: '2px', cursor: 'pointer', backgroundColor: '#eee', borderRadius: '50%', padding: '0 4px' }}>?</span></span>
                  <input type="text" className="form-control" placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Timeout</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #dcdfe6', borderRadius: '4px', paddingRight: '10px' }}>
                    <input type="text" defaultValue="2000" style={{ flex: 1, height: '32px', border: 'none', padding: '6px 12px', fontSize: '13px', outline: 'none', borderRadius: '4px' }} />
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
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.name} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}>Slave Description:</span>
                  <input type="text" className="form-control" defaultValue={modalConfig.data?.desc} placeholder="Please enter" style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
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
                      <input type="text" className="form-control" defaultValue={modalConfig.data?.ip || ''} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Port</span>
                      <input type="text" className="form-control" defaultValue={modalConfig.data?.port || ''} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '135px', textAlign: 'right', paddingRight: '15px', fontSize: '13px', color: '#333' }}><span style={{ color: '#ef4444' }}>*</span> Salve Address</span>
                      <input type="text" className="form-control" defaultValue={modalConfig.data?.slaveAddress || ''} style={{ flex: 1, height: '34px', padding: '6px 12px', fontSize: '13px', border: '1px solid #dcdfe6', borderRadius: '4px', outline: 'none' }} />
                    </div>
                  </>
                )}
  
              </div>
            )}
            
            {/* Footer */}
            <div style={{ padding: '15px 25px', display: 'flex', justifyContent: 'flex-end', gap: '15px', borderTop: '1px solid #f0f0f0' }}>
              <button className="btn" onClick={closeModal} style={{ padding: '8px 25px', fontSize: '13px', backgroundColor: 'white', border: '1px solid #dcdfe6', color: '#606266', borderRadius: '4px', cursor: 'pointer' }}>cancel</button>
              <button className="btn btn-primary" onClick={closeModal} style={{ padding: '8px 25px', fontSize: '13px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', backgroundColor: (modalConfig.mode === 'import' || modalConfig.mode === 'export' || modalConfig.mode === 'addPoint') ? '#eb7e30' : 'var(--primary-color)', color: 'white', border: 'none' }}>
                {modalConfig.mode === 'import' ? 'import' : modalConfig.mode === 'export' ? 'sure' : 'sure'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPoint;
