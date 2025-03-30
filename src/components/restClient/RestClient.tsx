'use client';

import Input from '../ui/inputs/Input';
import SelectInput from '../ui/inputs/SelectInput';
import Textarea from '../ui/inputs/Textarea';
import './restClient.scss';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const RestClient = () => {
  return (
    <section className="container">
      <div className="path-wrapper">
        <SelectInput
          forInput="methods"
          type="text"
          options={methods}
          customStyle="widthMeth"
          value="GET"
        />
        <Input forInput="path" type="text" customStyle="widthPath" />
        <button className="button">Send</button>
      </div>
      <div className="request-wrapper">
        <header className="head-wrapper">
          <p className="rest-title">Headers:</p>
          <button className="button">Add Header</button>
        </header>
        <div className="path-wrapper">
          <SelectInput
            forInput="headers key"
            type="text"
            options={methods}
            customStyle="widthMeth"
          />
          <Input forInput="headers value" type="text" customStyle="widthPath" />
          <button className="button">Remove</button>
        </div>
      </div>
      <div className="request-wrapper">
        <header className="head-wrapper">
          <p className="rest-title">Generated request code:</p>
          <button className="button">Generated</button>
        </header>
        <pre className="whitespace-pre-wrap">
          <code>
            {`
               fetch("https://api.example.com/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: "Alice" })
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error("Error:", error));
            `}
          </code>
        </pre>
      </div>
      <div className="request-wrapper">
        <header className="head-wrapper">
          <p className="rest-title">Body:</p>
        </header>
        <Textarea forInput="body-json"/>
      </div>
    </section>
  );
};

export default RestClient;
