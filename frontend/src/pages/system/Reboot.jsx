import React from 'react';

const Reboot = () => {
  const handleReboot = () => {
    if (window.confirm("Are you sure you want to reboot the gateway?")) {
      alert("Rebooting...");
      // Add actual reboot API call here later
    }
  };

  return (
    <div style={{ margin: '-20px', minHeight: 'calc(100vh - 60px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#eaedf2', padding: '15px 20px', borderBottom: '1px solid #dee2e6' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>
          Reboot
        </h2>
      </div>

      <div style={{ padding: '20px 20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '16px', backgroundColor: '#003fb4', marginRight: '10px' }}></span>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#333' }}>System Reboot</span>
        </div>
        
        <div style={{ paddingLeft: '20px', maxWidth: '600px' }}>
          <div style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f', padding: '15px', marginBottom: '30px', fontSize: '13px', color: '#666', borderRadius: '2px', lineHeight: 1.5 }}>
            <span style={{ color: '#faad14', fontWeight: 'bold', marginRight: '5px' }}>Warning:</span> 
            Rebooting the gateway will interrupt all current connections and processes. Please ensure all settings have been saved and applied before proceeding.
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '150px', textAlign: 'right', paddingRight: '20px', color: '#333', fontSize: '13px', fontWeight: 600 }}>Action:</span>
            <button 
              onClick={handleReboot}
              style={{ backgroundColor: '#e71562', color: 'white', border: 'none', padding: '8px 40px', borderRadius: '3px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
              Reboot Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reboot;
