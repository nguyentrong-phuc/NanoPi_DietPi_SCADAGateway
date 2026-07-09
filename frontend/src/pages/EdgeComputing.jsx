import React, { useState } from 'react';

const EdgeComputing = () => {
  const [nodes] = useState([
    { id: 1, name: 'COS', source: 'Node', type: '32 Bit Float', address: '30024', status: 'Read/Write' },
    { id: 2, name: 'HZ', source: 'Node', type: '32 Bit Float', address: '30022', status: 'Read/Write' },
    { id: 3, name: 'IC', source: 'Node', type: '32 Bit Float', address: '30020', status: 'Read/Write' },
    { id: 4, name: 'IB', source: 'Node', type: '32 Bit Float', address: '30018', status: 'Read/Write' },
  ]);

  return (
    <div className="fade-in">
      <h2>Edge Computing</h2>
      
      <div className="card">
        <div className="card-header">Modbus TCP Server Configuration</div>
        <div style={{ padding: '1rem' }}>
          <div className="grid grid-cols-2 grid-gap" style={{ marginBottom: '2rem' }}>
            <div className="form-group flex items-center justify-between">
              <label className="form-label mb-0">Protocol</label>
              <select className="form-control" style={{ width: '250px' }}>
                <option>TCP Server</option>
              </select>
            </div>
            <div className="form-group flex items-center justify-between">
              <label className="form-label mb-0">Local Port</label>
              <input type="number" className="form-control" defaultValue="502" style={{ width: '250px' }} />
            </div>
          </div>
          <button className="btn btn-primary">Apply Settings</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex justify-between">
          <span>Node Mapping Table</span>
          <button className="btn btn-primary text-sm">Add Node</button>
        </div>
        <div style={{ padding: '1rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Position Name</th>
                <th>Source</th>
                <th>Data Type</th>
                <th>Mapping Address</th>
                <th>Status</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map(node => (
                <tr key={node.id}>
                  <td>{node.id}</td>
                  <td>{node.name}</td>
                  <td>{node.source}</td>
                  <td>{node.type}</td>
                  <td>{node.address}</td>
                  <td>{node.status}</td>
                  <td>
                    <button className="btn btn-outline text-primary" style={{ padding: '2px 8px', marginRight: '5px' }}>Edit</button>
                    <button className="btn btn-outline text-danger" style={{ padding: '2px 8px' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EdgeComputing;
