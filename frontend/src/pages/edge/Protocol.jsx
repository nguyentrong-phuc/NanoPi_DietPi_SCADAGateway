import React, { useState } from 'react';

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

const ModbusConfig = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
      {/* Basic settings */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Basic settings</span>
        </div>
        
        <div style={{ padding: '0 15px', borderBottom: '1px solid #eee', paddingBottom: '30px', marginBottom: '30px' }}>
          {/* Connection Config */}
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#333', marginBottom: '20px' }}>Connection Config</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '30px' }}>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> Protocol:</span>
              <select className="form-control" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }}>
                <option>TCP Server</option>
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> Local Port:</span>
              <input type="text" className="form-control" defaultValue="502" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> Maximum of Client:</span>
              <input type="text" className="form-control" defaultValue="2" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px' }}></div>
          </div>

          {/* Slave Configuration */}
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#333', marginBottom: '20px' }}>Slave Configuration</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '30px' }}>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '180px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> Slave Address:</span>
              <input type="text" className="form-control" defaultValue="1" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '180px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> Protocol_Conversion.bit16_int:</span>
              <select className="form-control" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }}>
                <option>AB</option>
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '180px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> 32 bit integer byte order:</span>
              <select className="form-control" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }}>
                <option>AB CD</option>
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '180px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> 32 bit float byte order:</span>
              <select className="form-control" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }}>
                <option>AB CD</option>
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '180px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}>64 bit integer byte order:</span>
              <span style={{ fontSize: '12px', color: '#333' }}>ABCDEFGH</span>
            </div>
            <div style={{ flex: '1', minWidth: '300px' }}></div>
          </div>
          <button className="btn btn-primary active-btn" style={{ padding: '6px 30px', fontWeight: 600, fontSize: '13px' }}>apply</button>
        </div>
      </div>

      {/* Node mapping table */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Node mapping table</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary active-btn" style={{ padding: '6px 30px', fontWeight: 600, fontSize: '13px' }}>Add</button>
            <button className="btn" style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 30px', fontWeight: 600, fontSize: '13px' }}>Delete</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#eaedf2', color: '#333', fontWeight: 700 }}>
                <th style={{ padding: '12px 10px', width: '40px' }}><input type="checkbox" style={{ margin: 0 }} /></th>
                <th style={{ padding: '12px 10px', width: '50px' }}>ID</th>
                <th style={{ padding: '12px 10px' }}>Position Name</th>
                <th style={{ padding: '12px 10px' }}>Source(slave)</th>
                <th style={{ padding: '12px 10px' }}>Data Type</th>
                <th style={{ padding: '12px 10px' }}>Mapping Address</th>
                <th style={{ padding: '12px 10px' }}>Read Write Status</th>
                <th style={{ padding: '12px 10px' }}>Operation</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, pos: 'COS', src: 'Node', type: '32 Bit Float', addr: '30024', rw: 'Read/Write' },
                { id: 2, pos: 'HZ', src: 'Node', type: '32 Bit Float', addr: '30022', rw: 'Read/Write' },
                { id: 3, pos: 'IC', src: 'Node', type: '32 Bit Float', addr: '30020', rw: 'Read/Write' },
                { id: 4, pos: 'IB', src: 'Node', type: '32 Bit Float', addr: '30018', rw: 'Read/Write' },
                { id: 5, pos: 'IA', src: 'Node', type: '32 Bit Float', addr: '30016', rw: 'Read/Write' },
                { id: 6, pos: 'VC', src: 'Node', type: '32 Bit Float', addr: '30014', rw: 'Read/Write' },
                { id: 7, pos: 'VB', src: 'Node', type: '32 Bit Float', addr: '30012', rw: 'Read/Write' },
                { id: 8, pos: 'VA', src: 'Node', type: '32 Bit Float', addr: '30010', rw: 'Read/Write' },
                { id: 9, pos: 'QOUT', src: 'Node', type: '32 Bit Float', addr: '30008', rw: 'Read/Write' },
                { id: 10, pos: 'AINV_D1', src: 'Node', type: '32 Bit Float', addr: '30006', rw: 'Read/Write' }
              ].map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #f0f0f0', color: '#555' }}>
                  <td style={{ padding: '10px' }}><input type="checkbox" style={{ margin: 0 }} /></td>
                  <td style={{ padding: '10px' }}>{row.id}</td>
                  <td style={{ padding: '10px' }}>{row.pos}</td>
                  <td style={{ padding: '10px' }}>{row.src}</td>
                  <td style={{ padding: '10px' }}>{row.type}</td>
                  <td style={{ padding: '10px' }}>{row.addr}</td>
                  <td style={{ padding: '10px' }}>{row.rw}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ color: 'var(--primary-color)', cursor: 'pointer', marginRight: '10px' }}>Edit</span>
                    <span style={{ color: '#dc3545', cursor: 'pointer' }}>Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '12px', color: '#666' }}>
          <span style={{ marginRight: '15px' }}>Total 26</span>
          <select style={{ padding: '4px 8px', border: '1px solid #ddd', borderRadius: '3px', marginRight: '15px', color: '#333' }}>
            <option>10/page</option>
          </select>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button style={{ padding: '4px 10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', color: '#aaa', cursor: 'not-allowed', borderRadius: '3px' }}>Last</button>
            <button style={{ padding: '4px 10px', border: 'none', backgroundColor: 'var(--primary-color)', color: 'white', cursor: 'pointer', borderRadius: '3px' }}>1</button>
            <button style={{ padding: '4px 10px', border: 'none', backgroundColor: 'white', color: '#333', cursor: 'pointer', borderRadius: '3px' }}>2</button>
            <button style={{ padding: '4px 10px', border: 'none', backgroundColor: 'white', color: '#333', cursor: 'pointer', borderRadius: '3px' }}>3</button>
            <button style={{ padding: '4px 10px', border: '1px solid #ddd', backgroundColor: 'white', color: '#333', cursor: 'pointer', borderRadius: '3px' }}>Next</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
            Go to <input type="text" defaultValue="1" style={{ width: '30px', padding: '4px', margin: '0 5px', border: '1px solid #ddd', borderRadius: '3px', textAlign: 'center' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const IEC104Config = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
      {/* Basic settings */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Basic settings</span>
        </div>
        
        <div style={{ padding: '0 15px', borderBottom: '1px solid #eee', paddingBottom: '30px', marginBottom: '30px' }}>
          {/* Connection Config */}
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#333', marginBottom: '20px' }}>Connection Config</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '30px' }}>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}>Server Address:</span>
              <input type="text" className="form-control" defaultValue="192.168.30.1" disabled style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px', backgroundColor: '#f5f7fa', color: '#aaa', border: '1px solid #eaeaea' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> Local Port:</span>
              <input type="text" className="form-control" defaultValue="2404" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> COT size:</span>
              <select className="form-control" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }}>
                <option>2</option>
              </select>
            </div>
            
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> K:</span>
              <input type="text" className="form-control" defaultValue="25" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> W:</span>
              <input type="text" className="form-control" defaultValue="25" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> T0:</span>
              <input type="text" className="form-control" defaultValue="30" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> T1:</span>
              <input type="text" className="form-control" defaultValue="25" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> T2:</span>
              <input type="text" className="form-control" defaultValue="25" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> T3:</span>
              <input type="text" className="form-control" defaultValue="25" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>

            <div style={{ flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
              <span style={{ width: '150px', fontSize: '12px', color: '#666', textAlign: 'right', paddingRight: '15px' }}><span style={{ color: '#dc3545' }}>*</span> Maximum connection:</span>
              <input type="text" className="form-control" defaultValue="10" style={{ flex: 1, padding: '6px 12px', fontSize: '13px', height: '32px' }} />
            </div>
            <div style={{ flex: '1', minWidth: '300px' }}></div>
            <div style={{ flex: '1', minWidth: '300px' }}></div>
          </div>
          <button style={{ backgroundColor: '#e0e0e0', color: '#fff', border: 'none', padding: '6px 30px', borderRadius: '2px', cursor: 'not-allowed', fontSize: '13px', fontWeight: 600 }} disabled>apply</button>
        </div>
      </div>

      {/* Node mapping table */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '14px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#333' }}>Node mapping table</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary active-btn" style={{ padding: '6px 30px', fontWeight: 600, fontSize: '13px' }}>Add</button>
            <button className="btn" style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 30px', fontWeight: 600, fontSize: '13px' }}>Delete</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#eaedf2', color: '#333', fontWeight: 700 }}>
                <th style={{ padding: '12px 10px', width: '40px' }}><input type="checkbox" style={{ margin: 0 }} /></th>
                <th style={{ padding: '12px 10px', width: '50px' }}>ID</th>
                <th style={{ padding: '12px 10px' }}>Position Name</th>
                <th style={{ padding: '12px 10px' }}>Source(slave)</th>
                <th style={{ padding: '12px 10px' }}>Data Type</th>
                <th style={{ padding: '12px 10px' }}>Read Write Status</th>
                <th style={{ padding: '12px 10px' }}>Mapping Address</th>
                <th style={{ padding: '12px 10px' }}>ASDU</th>
                <th style={{ padding: '12px 10px' }}>Operation</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, pos: 'COS', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_12', asdu: '3' },
                { id: 2, pos: 'HZ', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_11', asdu: '3' },
                { id: 3, pos: 'IC', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_10', asdu: '3' },
                { id: 4, pos: 'IB', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_9', asdu: '3' },
                { id: 5, pos: 'IA', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_8', asdu: '3' },
                { id: 6, pos: 'VC', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_7', asdu: '3' },
                { id: 7, pos: 'VB', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_6', asdu: '3' },
                { id: 8, pos: 'VA', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_5', asdu: '3' },
                { id: 9, pos: 'QOUT', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_4', asdu: '3' },
                { id: 10, pos: 'AINV_D1', src: 'Node', type: 'Float', rw: 'Read/Write', addr: 'M_ME_NC_1_3', asdu: '3' }
              ].map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #f0f0f0', color: '#555' }}>
                  <td style={{ padding: '10px' }}><input type="checkbox" style={{ margin: 0 }} /></td>
                  <td style={{ padding: '10px' }}>{row.id}</td>
                  <td style={{ padding: '10px' }}>{row.pos}</td>
                  <td style={{ padding: '10px' }}>{row.src}</td>
                  <td style={{ padding: '10px' }}>{row.type}</td>
                  <td style={{ padding: '10px' }}>{row.rw}</td>
                  <td style={{ padding: '10px' }}>{row.addr}</td>
                  <td style={{ padding: '10px' }}>{row.asdu}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ color: 'var(--primary-color)', cursor: 'pointer', marginRight: '10px' }}>Edit</span>
                    <span style={{ color: '#dc3545', cursor: 'pointer' }}>Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '12px', color: '#666' }}>
          <span style={{ marginRight: '15px' }}>Total 18</span>
          <select style={{ padding: '4px 8px', border: '1px solid #ddd', borderRadius: '3px', marginRight: '15px', color: '#333' }}>
            <option>10/page</option>
          </select>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button style={{ padding: '4px 10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', color: '#aaa', cursor: 'not-allowed', borderRadius: '3px' }}>Last</button>
            <button style={{ padding: '4px 10px', border: 'none', backgroundColor: 'var(--primary-color)', color: 'white', cursor: 'pointer', borderRadius: '3px' }}>1</button>
            <button style={{ padding: '4px 10px', border: 'none', backgroundColor: 'white', color: '#333', cursor: 'pointer', borderRadius: '3px' }}>2</button>
            <button style={{ padding: '4px 10px', border: '1px solid #ddd', backgroundColor: 'white', color: '#333', cursor: 'pointer', borderRadius: '3px' }}>Next</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
            Go to <input type="text" defaultValue="1" style={{ width: '30px', padding: '4px', margin: '0 5px', border: '1px solid #ddd', borderRadius: '3px', textAlign: 'center' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const [activeTab, setActiveTab] = useState('Modbus RTU');
  // Initially all protocols are "Closed" (false)
  const [protocolState, setProtocolState] = useState({
    'Modbus RTU': false,
    'Modbus TCP': false,
    'IEC104': false
  });

  const tabs = ['Modbus RTU', 'Modbus TCP', 'IEC104'];

  const toggleProtocol = () => {
    setProtocolState({
      ...protocolState,
      [activeTab]: !protocolState[activeTab]
    });
  };

  const isOpen = protocolState[activeTab];

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: '#eaedf2', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Protocol
        </h2>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left Sidebar for protocols */}
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

        {/* Right Content */}
        <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: 'var(--primary-color)', marginRight: '10px', borderRadius: '2px' }}></span>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#333', marginRight: '20px' }}>{activeTab}</span>
            <ToggleSwitch isOn={isOpen} handleToggle={toggleProtocol} />
          </div>
          
          <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Main view state */}
            {!isOpen ? (
              <>
                <div>
                  <button style={{ backgroundColor: '#e0e0e0', color: '#fff', border: 'none', padding: '8px 30px', borderRadius: '2px', cursor: 'not-allowed', fontSize: '13px', fontWeight: 600 }} disabled>apply</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-100px' }}>
                  <h3 style={{ fontSize: '20px', color: '#555', marginBottom: '15px', fontWeight: 600 }}>Function Close</h3>
                  <span onClick={toggleProtocol} style={{ color: 'var(--primary-color)', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Open</span>
                </div>
              </>
            ) : (
              activeTab === 'IEC104' ? <IEC104Config /> : <ModbusConfig />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Protocol;
