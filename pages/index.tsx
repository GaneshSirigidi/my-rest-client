import { useState } from 'react';
import RequestForm from '../components/requestForm';

export default function Home() {
  const [response, setResponse] = useState<string>('');

  // Function to handle response from child component (RequestForm)
  const handleResponse = (res: string) => {
    setResponse(JSON.stringify(res, null, 2));
  };

  return (
    <div>
      <h1>REST Client</h1>
      <RequestForm onResponse={handleResponse} />
      <pre>{response}</pre>
    </div>
  );
}
