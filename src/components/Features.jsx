import React from 'react'
import {Stethoscope, Mic, WifiOff } from "lucide-react";

export default function features() {
  return (
    <div>
           <section className="container mt-5">
        <h2 className="text-center fw-bold mb-4">Key Features</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="feature-card">
              <Stethoscope size={40} className="text-primary mb-2" />
              <h5>Symptom Checker</h5>
              <p className="text-muted">AI-powered symptom analysis for quick self-diagnosis.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="feature-card">
              <Mic size={40} className="text-primary mb-2" />
              <h5>Voice Interaction</h5>
              <p className="text-muted">Ask health-related questions using voice commands.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="feature-card">
              <WifiOff size={40} className="text-primary mb-2" />
              <h5>Offline Mode</h5>
              <p className="text-muted">Access essential health tools even without internet.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
