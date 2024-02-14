import { useState } from 'react';
import axios from 'axios';

interface Props {
  onResponse: (response: string) => void;
}

const RequestForm: React.FC<Props> = ({ onResponse }) => {
  const [method, setMethod] = useState<string>('GET');
  const [url, setUrl] = useState<string>('');
  const [headers, setHeaders] = useState<any>('');
  const [body, setBody] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqBody = {
      method: method,
      headers: JSON.parse(headers),
      body: JSON.parse(body),
      url:url
      
    }
    console.log(reqBody);
    
    try {

      const res = await fetch('/api/request',{
      method: 'POST',
        headers: new Headers({
          "Content-type":"Application/json"
        }),
        body: JSON.stringify(reqBody)
      });
      const response = await res.json()
      onResponse(response);
    } catch (error:any) {
      onResponse(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={method} onChange={(e) => setMethod(e.target.value)} placeholder="Method" />
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
      <input type="text" value={headers} onChange={(e) => setHeaders(e.target.value)} placeholder="Headers (JSON)" />
      <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body (JSON)" />
      <button type="submit">Send Request</button>
    </form>
  );
}

export default RequestForm;
