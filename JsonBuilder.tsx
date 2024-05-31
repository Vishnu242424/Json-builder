"use client";

import React, { useState } from 'react';

interface Header {
  text: string;
  images: string[];
}

interface Step {
  text: string;
  items: string[];
}

interface JsonStructure {
  title: string;
  tabs: string[];
  headers: Header[];
  descriptionText: string;
  description: {
    steps: Step[];
  };
}

const JsonBuilder: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tabs, setTabs] = useState<string[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [descriptionText, setDescriptionText] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);

  const handleAddTab = () => setTabs([...tabs, '']);
  const handleTabChange = (index: number, value: string) => {
    const newTabs = [...tabs];
    newTabs[index] = value;
    setTabs(newTabs);
  };

  const handleAddHeader = () => setHeaders([...headers, { text: '', images: [''] }]);
  const handleHeaderChange = (index: number, text: string) => {
    const newHeaders = [...headers];
    newHeaders[index].text = text;
    setHeaders(newHeaders);
  };

  const handleAddImage = (headerIndex: number) => {
    const newHeaders = [...headers];
    newHeaders[headerIndex].images.push('');
    setHeaders(newHeaders);
  };

  const handleImageChange = (headerIndex: number, imageIndex: number, url: string) => {
    const newHeaders = [...headers];
    newHeaders[headerIndex].images[imageIndex] = url;
    setHeaders(newHeaders);
  };

  const handleAddStep = () => setSteps([...steps, { text: '', items: [''] }]);
  const handleStepChange = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index].text = text;
    setSteps(newSteps);
  };

  const handleAddItem = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].items.push('');
    setSteps(newSteps);
  };

  const handleItemChange = (stepIndex: number, itemIndex: number, value: string) => {
    const newSteps = [...steps];
    newSteps[stepIndex].items[itemIndex] = value;
    setSteps(newSteps);
  };

  const handleGenerateJson = () => {
    const json: JsonStructure = {
      title,
      tabs,
      headers,
      descriptionText,
      description: {
        steps,
      },
    };
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>Custom JSON Builder</h1>
      <div className="form-group">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Tabs</label>
        {tabs.map((tab, index) => (
          <input key={index} type="text" value={tab} onChange={(e) => handleTabChange(index, e.target.value)} />
        ))}
        <button onClick={handleAddTab}>Add Tab</button>
      </div>
      <div className="form-group">
        <label>Headers</label>
        {headers.map((header, index) => (
          <div key={index}>
            <input type="text" value={header.text} onChange={(e) => handleHeaderChange(index, e.target.value)} />
            {header.images.map((image, imgIndex) => (
              <input
                key={imgIndex}
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, imgIndex, e.target.value)}
              />
            ))}
            <button onClick={() => handleAddImage(index)}>Add Image</button>
          </div>
        ))}
        <button onClick={handleAddHeader}>Add Header</button>
      </div>
      <div className="form-group">
        <label>Description Text</label>
        <textarea
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
          placeholder="Enter description text here"
        />
      </div>
      <div className="form-group">
        <label>Steps</label>
        {steps.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              value={step.text}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Step ${index + 1} Text`}
            />
            {step.items.map((item, itemIndex) => (
              <input
                key={itemIndex}
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, itemIndex, e.target.value)}
                placeholder={`Step ${index + 1} Item ${itemIndex + 1}`}
              />
            ))}
            <button onClick={() => handleAddItem(index)}>Add Item</button>
          </div>
        ))}
        <button onClick={handleAddStep}>Add Step</button>
      </div>
      <button onClick={handleGenerateJson}>Generate JSON</button>
    </div>
  );
};

export default JsonBuilder;
