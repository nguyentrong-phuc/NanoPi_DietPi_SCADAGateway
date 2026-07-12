import React, { useState } from 'react';

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
  const itemsPerPage = 15;

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
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark, #f0f2f5)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: 'white', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Data Point
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Slave</span>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: '#666', marginRight: '20px' }}>Version: 1779939851</span>
            <button className="btn btn-primary active-btn" style={{ padding: '6px 20px', marginRight: '10px', fontWeight: 600, fontSize: '13px' }}>Add</button>
            <button className="btn btn-primary active-btn" style={{ padding: '6px 20px', marginRight: '10px', fontWeight: 600, fontSize: '13px' }}>Import</button>
            <button className="btn btn-primary active-btn" style={{ padding: '6px 20px', fontWeight: 600, fontSize: '13px' }}>Export</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          {mockSlaves.map(slave => (
            <div 
              key={slave.id} 
              onClick={() => { setActiveSlave(slave.id); setCurrentPage(1); }}
              className="w-card"
              style={{ 
                backgroundColor: 'white', 
                border: activeSlave === slave.id ? '1px solid var(--primary-color)' : '1px solid #dcdfe6', 
                boxShadow: activeSlave === slave.id ? '0 0 0 2px rgba(0,63,180,0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                padding: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                height: '160px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                <div style={{ fontWeight: 700, color: '#222', fontSize: '15px', borderLeft: '3px solid var(--primary-color)', paddingLeft: '8px' }}>
                  {slave.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#666', fontWeight: 600 }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: slave.status === 'online' ? '#28a745' : '#dc3545', marginRight: '6px' }}></div>
                  {slave.status}
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#555', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ margin: 0, marginBottom: 'auto', whiteSpace: 'pre-line', lineHeight: '1.4' }}>{slave.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <p style={{ margin: 0 }}>protocol: <strong style={{ color: '#333' }}>{slave.protocol}</strong></p>
                  {slave.isCustom && (
                    <div style={{ color: '#dc3545', fontSize: '12px', fontWeight: 600 }}>
                      <span style={{ color: 'var(--primary-color)', marginRight: '10px', cursor: 'pointer' }}>✎ Edit</span>
                      <span style={{ cursor: 'pointer' }}>🗑 Delete</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'space-between', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>List of slave points</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Please enterPoint Screen" className="form-control" style={{ padding: '6px 12px', fontSize: '13px', width: '200px', height: 'auto' }} />
            <button className="btn" style={{ backgroundColor: '#e0e0e0', color: '#fff', padding: '6px 20px', fontWeight: 600, fontSize: '13px' }} disabled>Point Screen</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e9ecef', color: '#333', fontWeight: 700, borderBottom: '1px solid #ddd' }}>
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
                  <td style={{ padding: '10px' }}>
                    <span style={{ color: '#aaa', cursor: 'not-allowed', marginRight: '10px' }}>Edit</span>
                    <span style={{ color: '#aaa', cursor: 'not-allowed' }}>Delete</span>
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
  );
};

export default DataPoint;
