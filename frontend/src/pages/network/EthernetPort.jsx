import React, { useState } from 'react';

const EthernetPort = () => {
  const [port1Mode, setPort1Mode] = useState('WAN');
  const [port2Mode, setPort2Mode] = useState('LAN');

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title Bar */}
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Ethernet Port
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '30px' }}>
          {/* Port 1 */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Ethernet Port 1</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>Work Mode</span>
              <div style={{ display: 'flex' }}>
                <button 
                  onClick={() => setPort1Mode('WAN')}
                  style={{ padding: '6px 20px', fontSize: '13px', fontWeight: 600, border: '1px solid #0d47a1', backgroundColor: port1Mode === 'WAN' ? '#0d47a1' : 'white', color: port1Mode === 'WAN' ? 'white' : '#0d47a1', cursor: 'pointer', borderRadius: '3px 0 0 3px' }}
                >
                  WAN
                </button>
                <button 
                  onClick={() => setPort1Mode('LAN')}
                  style={{ padding: '6px 20px', fontSize: '13px', fontWeight: 600, border: '1px solid #0d47a1', backgroundColor: port1Mode === 'LAN' ? '#0d47a1' : 'white', color: port1Mode === 'LAN' ? 'white' : '#0d47a1', cursor: 'pointer', borderRadius: '0 3px 3px 0', borderLeft: 'none' }}
                >
                  LAN
                </button>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: '15px' }}>
              <span onClick={() => alert(`Ethernet Port 1 changed to ${port1Mode} mode`)} style={{ color: '#003fb4', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                ⇌ Change Mode
              </span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div style={{ width: '1px', backgroundColor: '#e0e0e0', minHeight: '120px' }}></div>

          {/* Port 2 */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>Ethernet Port 2</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>Work Mode</span>
              <div style={{ display: 'flex' }}>
                <button 
                  onClick={() => setPort2Mode('WAN')}
                  style={{ padding: '6px 20px', fontSize: '13px', fontWeight: 600, border: '1px solid #0d47a1', backgroundColor: port2Mode === 'WAN' ? '#0d47a1' : 'white', color: port2Mode === 'WAN' ? 'white' : '#0d47a1', cursor: 'pointer', borderRadius: '3px 0 0 3px' }}
                >
                  WAN
                </button>
                <button 
                  onClick={() => setPort2Mode('LAN')}
                  style={{ padding: '6px 20px', fontSize: '13px', fontWeight: 600, border: '1px solid #0d47a1', backgroundColor: port2Mode === 'LAN' ? '#0d47a1' : 'white', color: port2Mode === 'LAN' ? 'white' : '#0d47a1', cursor: 'pointer', borderRadius: '0 3px 3px 0', borderLeft: 'none' }}
                >
                  LAN
                </button>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: '15px' }}>
              <span onClick={() => alert(`Ethernet Port 2 changed to ${port2Mode} mode`)} style={{ color: '#003fb4', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                ⇌ Change Mode
              </span>
            </div>
          </div>
        </div>

        {/* Thick Gray Divider */}
        <div style={{ height: '15px', backgroundColor: '#eaedf2', margin: '0 -20px 20px -20px' }}></div>

        <div>
          <button style={{ backgroundColor: '#003fb4', color: 'white', border: 'none', padding: '8px 30px', borderRadius: '2px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
            apply
          </button>
        </div>
      </div>
    </div>);
};

export default EthernetPort;
