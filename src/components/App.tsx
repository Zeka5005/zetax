import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { TaxCalculator } from './components/calculator/TaxCalculator';
import { DocumentCenter } from './components/documents/DocumentCenter';
import { RefundStatus } from './components/status/RefundStatus';

function App() {
  const [activeSection, setActiveSection] = useState<'calculator' | 'documents' | 'status'>('calculator');

  return (
    <Layout>
      <Hero />
      <Features />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveSection('calculator')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
              ${activeSection === 'calculator' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Tax Calculator
          </button>
          <button
            onClick={() => setActiveSection('documents')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
              ${activeSection === 'documents' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Document Center
          </button>
          <button
            onClick={() => setActiveSection('status')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
              ${activeSection === 'status' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Refund Status
          </button>
        </div>

        {activeSection === 'calculator' && <TaxCalculator />}
        {activeSection === 'documents' && <DocumentCenter />}
        {activeSection === 'status' && <RefundStatus />}
      </div>
    </Layout>
  );
}

export default App;