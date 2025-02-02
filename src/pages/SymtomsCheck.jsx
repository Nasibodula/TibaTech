import React, { useState } from "react";
import { Form, Button, InputGroup, Badge, Alert } from "react-bootstrap";

const commonSymptoms = [
  "Abdominal pain", "Chest pain", "Confusion", "Diarrhea", "Dizziness", "Headache", "Leg concern", "Skin rash"
];

const symptomDiagnosisMap = {
  "Headache": ["Migraine", "Tension Headache", "Dehydration"],
  "Chest pain": ["Heart Attack", "Indigestion", "Panic Attack"],
  "Dizziness": ["Low Blood Pressure", "Vertigo", "Anemia"],
  "Abdominal pain": ["Appendicitis", "Gastritis", "Food Poisoning"],
  "Diarrhea": ["Food Poisoning", "Irritable Bowel Syndrome", "Infection"],
  "Confusion": ["Stroke", "Dehydration", "Low Blood Sugar"],
  "Leg concern": ["Blood Clot", "Muscle Strain", "Nerve Damage"],
  "Skin rash": ["Allergic Reaction", "Eczema", "Psoriasis"]
};

const SymptomChecker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  
  const handleSelectSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleRemoveSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const getSuggestedDiagnoses = () => {
    let possibleDiagnoses = new Set();
    selectedSymptoms.forEach(symptom => {
      if (symptomDiagnosisMap[symptom]) {
        symptomDiagnosisMap[symptom].forEach(diagnosis => possibleDiagnoses.add(diagnosis));
      }
    });
    return Array.from(possibleDiagnoses);
  };

  return (
    <div className="symptom-checker-container text-center p-4">
      <h5 className="step">STEP 2/4</h5>
      <h2>Add your symptoms</h2>
      <p>Please use the search or click on the body model for more options.</p>

      <InputGroup className="mb-3 search-bar">
        <Form.Control
          type="text"
          placeholder="Search, e.g. headache"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {searchTerm && (
        <div className="autocomplete-list">
          {commonSymptoms
            .filter((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((symptom, index) => (
              <div key={index} className="autocomplete-item" onClick={() => handleSelectSymptom(symptom)}>
                {symptom}
              </div>
            ))}
        </div>
      )}

      <div className="selected-symptoms mb-3">
        {selectedSymptoms.map((symptom, index) => (
          <Badge pill  className="m-1 btn" key={index}>
            {symptom} <span className="remove-symptom p-1" onClick={() => handleRemoveSymptom(symptom)}>x</span>
          </Badge>
        ))}
      </div>

      <div className="common-symptoms">
        <h6>Common Symptoms:</h6>
        {commonSymptoms.map((symptom, index) => (
          <Button key={index}  className="m-1 btn" onClick={() => handleSelectSymptom(symptom)}>
            {symptom}
          </Button>
        ))}
      </div>

      {selectedSymptoms.length > 0 && (
        <div className="suggested-diagnoses mt-4">
          <h6>Possible Diagnoses:</h6>
          {getSuggestedDiagnoses().length > 0 ? (
            <Alert variant="info">
              {getSuggestedDiagnoses().map((diagnosis, index) => (
                <div key={index}>• {diagnosis}</div>
              ))}
            </Alert>
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      )}

      <div className="body-model mt-4">
        <img src="/path/to/body-model.png" alt="Body Model" className="img-fluid" />
        <p className="rotate-text">🔄 Rotate model</p>
      </div>

      <div className="navigation-buttons mt-4">
        <Button className="btn">← Previous</Button>
        <Button  className="ms-2 btn">Next →</Button>
      </div>
    </div>
  );
};

export default SymptomChecker;
