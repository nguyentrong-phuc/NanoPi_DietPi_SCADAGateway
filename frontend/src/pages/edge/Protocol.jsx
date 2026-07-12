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

const ModbusConfig = ({ activeTab }) => {
  const [rs485, setRs485] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
      {/* Basic settings */}
      <div style={{ marginBottom: '20px' }}>
        <div className="card-header" style={{ marginBottom: '20px' }}>
          <span className="card-header-line"></span>
          <span className="card-title">Basic settings</span>
        </div>
        
        <div style={{ padding: '0 15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '30px', marginBottom: '30px' }}>
          {/* Connection Config */}
          <div className="card-panel" style={{ padding: '20px 25px', marginBottom: '20px' }}>
            <div className="card-subtitle">
              Connection Config
            </div>
            <div style={{ display: 'flex', gap: '30px' }}>
              {activeTab === 'Modbus RTU' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#333', fontWeight: 600 }}><span style={{ color: '#e71562' }}>*</span> RS485:</span>
                  <div style={{ height: '34px', display: 'flex', alignItems: 'center' }}>
                    <ToggleSwitch isOn={rs485} handleToggle={() => setRs485(!rs485)} />
                  </div>
                </div>
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Protocol:</span>
                <select className="form-input-standard" style={{ height: '34px' }}>
                  {activeTab === 'Modbus RTU' ? (
                    <>
                      <option>RTU Master</option>
                      <option>RTU Slave</option>
                    </>
                  ) : (
                    <>
                      <option>TCP Server</option>
                      <option>TCP Client</option>
                    </>
                  )}
                </select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Local Port:</span>
                <input type="text" className="form-input-standard" defaultValue="502" style={{ height: '34px' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Maximum of Client:</span>
                <input type="text" className="form-input-standard" defaultValue="2" style={{ height: '34px' }} />
              </div>
            </div>
          </div>

          {/* Slave Configuration */}
          <div className="card-panel" style={{ padding: '20px 25px', marginBottom: '25px', overflowX: 'auto' }}>
            <div className="card-subtitle">
              Slave Configuration
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr 1.3fr 1.3fr 1.5fr', gap: '20px', minWidth: '850px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Slave Address:</span>
                <input type="text" className="form-input-standard" defaultValue="1" style={{ height: '34px', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Protocol_Conversion.bit16_int:</span>
                <select className="form-input-standard" style={{ height: '34px', width: '100%' }}>
                  <option value="AB">AB</option>
                  <option value="BA">BA</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">32 bit integer byte order:</span>
                <select className="form-input-standard" style={{ height: '34px', width: '100%' }}>
                  <option value="AB CD">AB CD</option>
                  <option value="CD AB">CD AB</option>
                  <option value="BA DC">BA DC</option>
                  <option value="DC BA">DC BA</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">32 bit float byte order:</span>
                <select className="form-input-standard" style={{ height: '34px', width: '100%' }}>
                  <option value="AB CD">AB CD</option>
                  <option value="CD AB">CD AB</option>
                  <option value="BA DC">BA DC</option>
                  <option value="DC BA">DC BA</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold">64 bit integer byte order:</span>
                <select className="form-input-standard" style={{ height: '34px', width: '100%' }}>
                  <option value="ABCDEFGH">ABCDEFGH</option>
                  <option value="HGFEDCBA">HGFEDCBA</option>
                  <option value="GHEFCDAB">GHEFCDAB</option>
                  <option value="BADCFEHG">BADCFEHG</option>
                </select>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" style={{ padding: '0 40px' }}>Apply</button>
        </div>
      </div>

      {/* Node mapping table */}
      <div>
        <div className="card-header" style={{ marginBottom: '20px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="card-header-line"></span>
            <span className="card-title">Node mapping table</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary" style={{ padding: '0 30px' }}>Add</button>
            <button className="btn btn-outline" style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)', padding: '0 30px' }}>Delete</button>
          </div>
        </div>

        <div className="table-container" style={{ marginBottom: '20px' }}>
          <table className="table-unified">
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" style={{ margin: 0 }} /></th>
                <th style={{ width: '50px' }}>ID</th>
                <th>Position Name</th>
                <th>Source(slave)</th>
                <th>Data Type</th>
                <th>Mapping Address</th>
                <th>Read Write Status</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'Modbus RTU' ? (
                <tr>
                  <td colSpan="8" style={{ padding: '40px', color: '#999', fontSize: '13px' }}>No data yet</td>
                </tr>
              ) : (
                [
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
                  <tr key={row.id}>
                    <td><input type="checkbox" style={{ margin: 0 }} /></td>
                    <td>{row.id}</td>
                    <td>{row.pos}</td>
                    <td>{row.src}</td>
                    <td>{row.type}</td>
                    <td>{row.addr}</td>
                    <td>{row.rw}</td>
                    <td style={{ fontWeight: 600 }}>
                      <span style={{ color: 'var(--primary-color)', cursor: 'pointer', marginRight: '10px', opacity: 0.9 }}>Edit</span>
                      <span style={{ color: 'var(--danger-color)', cursor: 'pointer', opacity: 0.9 }}>Delete</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '13px', color: 'var(--text-dark)' }}>
          <span style={{ marginRight: '15px' }}>Total {activeTab === 'Modbus RTU' ? 0 : 26}</span>
          <select className="form-input-standard" style={{ width: 'auto', padding: '4px 8px', marginRight: '15px' }}>
            <option>10/page</option>
          </select>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button className="btn btn-default" style={{ padding: '4px 10px' }} disabled>Last</button>
            <button className="btn btn-primary" style={{ padding: '4px 12px' }}>1</button>
            <button className="btn btn-default" style={{ padding: '4px 12px' }}>2</button>
            <button className="btn btn-default" style={{ padding: '4px 12px' }}>3</button>
            <button className="btn btn-default" style={{ padding: '4px 10px' }}>Next</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
            Go to <input type="number" min="1" defaultValue="1" className="form-input-standard" style={{ width: '40px', padding: '4px', margin: '0 5px', textAlign: 'center' }} />
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
        <div className="card-header" style={{ marginBottom: '20px' }}>
          <span className="card-header-line"></span>
          <span className="card-title">Basic settings</span>
        </div>
        
        <div style={{ padding: '0 15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '30px', marginBottom: '30px' }}>
          {/* Connection Config */}
          <div className="card-panel" style={{ padding: '20px 25px', marginBottom: '20px', overflowX: 'auto' }}>
            <div className="card-subtitle">
              Connection Config
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', minWidth: '950px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold">Server Address:</span>
                <input type="text" className="form-input-standard" defaultValue="192.168.30.1" disabled style={{ backgroundColor: '#f5f7fa', color: '#c0c4cc' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Local Port:</span>
                <input type="text" className="form-input-standard" defaultValue="2404" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">COT size:</span>
                <select className="form-input-standard">
                  <option value="1">1</option>
                  <option value="2" selected>2</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">K:</span>
                <input type="text" className="form-input-standard" defaultValue="25" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">W:</span>
                <input type="text" className="form-input-standard" defaultValue="25" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">T0:</span>
                <input type="text" className="form-input-standard" defaultValue="30" />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', minWidth: '950px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">T1:</span>
                <input type="text" className="form-input-standard" defaultValue="25" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">T2:</span>
                <input type="text" className="form-input-standard" defaultValue="25" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">T3:</span>
                <input type="text" className="form-input-standard" defaultValue="25" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label-bold form-label-required">Maximum connection:</span>
                <input type="text" className="form-input-standard" defaultValue="10" />
              </div>
              <div style={{ flex: 1 }}></div>
              <div style={{ flex: 1 }}></div>
            </div>
          </div>
          <button className="btn" style={{ padding: '0 30px' }} disabled>Apply</button>
        </div>
      </div>

      {/* Node mapping table */}
      <div>
        <div className="card-header" style={{ marginBottom: '20px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="card-header-line"></span>
            <span className="card-title">Node mapping table</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary" style={{ padding: '0 30px' }}>Add</button>
            <button className="btn btn-outline" style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)', padding: '0 30px' }}>Delete</button>
          </div>
        </div>

        <div className="table-container" style={{ marginBottom: '20px' }}>
          <table className="table-unified">
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" style={{ margin: 0 }} /></th>
                <th style={{ width: '50px' }}>ID</th>
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
                <tr key={row.id}>
                  <td><input type="checkbox" style={{ margin: 0 }} /></td>
                  <td>{row.id}</td>
                  <td>{row.pos}</td>
                  <td>{row.src}</td>
                  <td>{row.type}</td>
                  <td>{row.rw}</td>
                  <td>{row.addr}</td>
                  <td>{row.asdu}</td>
                  <td style={{ fontWeight: 600 }}>
                    <span style={{ color: 'var(--primary-color)', cursor: 'pointer', marginRight: '10px', opacity: 0.9 }}>Edit</span>
                    <span style={{ color: 'var(--danger-color)', cursor: 'pointer', opacity: 0.9 }}>Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '13px', color: 'var(--text-dark)' }}>
          <span style={{ marginRight: '15px' }}>Total 18</span>
          <select className="form-input-standard" style={{ width: 'auto', padding: '4px 8px', marginRight: '15px' }}>
            <option>10/page</option>
          </select>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button className="btn btn-default" style={{ padding: '4px 10px' }} disabled>Last</button>
            <button className="btn btn-primary" style={{ padding: '4px 12px' }}>1</button>
            <button className="btn btn-default" style={{ padding: '4px 12px' }}>2</button>
            <button className="btn btn-default" style={{ padding: '4px 10px' }}>Next</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
            Go to <input type="number" min="1" defaultValue="1" className="form-input-standard" style={{ width: '40px', padding: '4px', margin: '0 5px', textAlign: 'center' }} />
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
    <div className="app-container" style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--bg-dark)' }}>
      
      <div className="page-title-container">
        <h2 className="page-title">Protocol</h2>
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
          <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <span className="card-header-line"></span>
            <span className="card-title" style={{ marginRight: '20px' }}>{activeTab}</span>
            <ToggleSwitch isOn={isOpen} handleToggle={toggleProtocol} />
          </div>
          
          <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Main view state */}
            {!isOpen ? (
              <>
                <div>
                  <button className="btn" style={{ backgroundColor: '#e0e0e0', color: '#fff', cursor: 'not-allowed', padding: '0 30px' }} disabled>Apply</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-100px' }}>
                  <h3 style={{ fontSize: '20px', color: 'var(--text-dark)', marginBottom: '15px', fontWeight: 600 }}>Function Close</h3>
                  <span onClick={toggleProtocol} style={{ color: 'var(--primary-color)', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Open</span>
                </div>
              </>
            ) : (
              activeTab === 'IEC104' ? <IEC104Config /> : <ModbusConfig activeTab={activeTab} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Protocol;
