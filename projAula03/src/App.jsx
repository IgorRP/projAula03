import { useState } from 'react'

export default function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      console.log('Sending text to server:', inputText);

      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();

      console.log(JSON.stringify(data.result, null, 2));

      //setResponseText('Aaaaaaaaaaa');
      setResponseText(JSON.stringify(data.result, null, 2));
    } catch (error) {
      console.error('Error sending text:', error);
      setResponseText(error.message || 'Failed to get a response from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Vercel React + Express Link 06</h2>
      
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type something here..."
        rows={5}
        cols={40}
      />
      
      <br /><br />
      
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : 'Submit to Server'}
      </button>

      <hr />

      <h3>Server Response:</h3>
      {/* The empty div that renders the returned string */}
      <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '4px', minHeight: '40px' }}>
        {responseText}
      </div>
    </div>
  );
}