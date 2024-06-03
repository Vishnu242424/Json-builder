"use client";

// components/JsonBuilder.tsx
import React, { useState } from 'react';

interface Header {
  text: string;
}

interface Step {
  text: string;
}

const JsonBuilder: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tabs, setTabs] = useState<string[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [description, setDescription] = useState('');

  const addTab = () => {
    setTabs([...tabs, '']);
  };

  const updateTab = (index: number, value: string) => {
    const newTabs = [...tabs];
    newTabs[index] = value;
    setTabs(newTabs);
  };

  const addHeader = () => {
    setHeaders([...headers, { text: '' }]);
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index].text = value;
    setHeaders(newHeaders);
  };

  const addStep = () => {
    setSteps([...steps, { text: '' }]);
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index].text = value;
    setSteps(newSteps);
  };

  const generateJSON = () => {
    const json = {
      title,
      tabs,
      headers,
      description,
      steps,
    };
    const jsonString = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom.json';
    a.click();
  };

  return (
    <div className="container">
      <h1>Custom JSON Builder</h1>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="short-width"
        />
      </div>
      <div className="form-group">
        <label>Tabs:</label>
        <div className="form-group-buttons">
          {tabs.map((tab, index) => (
            <input
              key={index}
              type="text"
              value={tab}
              onChange={(e) => updateTab(index, e.target.value)}
              className="short-width"
              style={{ marginBottom: '5px' }}
            />
          ))}
          <button onClick={addTab}>Add Tab</button>
        </div>
      </div>
      <div className="form-group">
        <label>Headers:</label>
        <div className="form-group-buttons">
          {headers.map((header, index) => (
            <input
              key={index}
              type="text"
              value={header.text}
              onChange={(e) => updateHeader(index, e.target.value)}
              className="short-width"
              style={{ marginBottom: '5px' }}
            />
          ))}
          <button onClick={addHeader}>Add Header</button>
        </div>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="short-width"
        />
      </div>
      <div className="form-group">
        <label>Steps:</label>
        <div className="form-group-buttons">
          {steps.map((step, index) => (
            <input
              key={index}
              type="text"
              value={step.text}
              onChange={(e) => updateStep(index, e.target.value)}
              className="short-width"
              style={{ marginBottom: '5px' }}
            />
          ))}
          <button onClick={addStep}>Add Step</button>
        </div>
      </div>
      <button onClick={generateJSON}>Generate JSON</button>
    </div>
  );
};

export default JsonBuilder;
