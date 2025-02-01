import React, { useState } from 'react';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [severity, setSeverity] = useState('');
  const [advice, setAdvice] = useState('');

  const handleSubmit = () => {
    // Simple logic for demonstration
    if (symptoms.toLowerCase().includes('fever')) {
      setDiagnosis('Possible Flu');
      setSeverity('Moderate');
      setAdvice('Rest and hydrate. Consult a doctor if symptoms persist.');
    } else {
      setDiagnosis('Unknown');
      setSeverity('Mild');
      setAdvice('Monitor your symptoms.');
    }
  };

  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center py-4">
        <h1>Symptom Checker</h1>
        <button className="btn btn-secondary">Back</button>
      </header>

      <div className="input-area my-4">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Describe your symptoms..." 
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button className="btn btn-outline-secondary">
            <i className="bi bi-mic"></i> {/* Mic icon for voice input */}
          </button>
        </div>
      </div>

      <div className="suggestions my-4">
        {/* This is a placeholder for an autocomplete dropdown */}
        <ul className="list-group">
          <li className="list-group-item">Fever</li>
          <li className="list-group-item">Headache</li>
          <li className="list-group-item">Cough</li>
        </ul>
      </div>

      <div className="results-section my-4">
        <h4>Suggested Diagnosis: {diagnosis}</h4>
        <p><strong>Severity: </strong>{severity}</p>
        <p><strong>Advice: </strong>{advice}</p>
        <button className="btn btn-primary">Connect to a Doctor</button>
      </div>

      <footer className="my-4 text-center text-muted">
        <p><small>This is not a substitute for professional medical advice.</small></p>
      </footer>
    </div>
  );
};

export default SymptomChecker;