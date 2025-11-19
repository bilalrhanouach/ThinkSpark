// Test the API endpoint directly to see the error
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAPIEndpoint() {
  try {
    console.log('🧪 Testing the chat API endpoint...');
    
    const response = await fetch('http://localhost:3002/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [],
        newMessage: {
          role: 'user',
          content: 'Hello, can you help me with math?'
        }
      })
    });
    
    console.log('📊 Response Status:', response.status);
    console.log('📊 Response Headers:', Object.fromEntries(response.headers));
    
    const data = await response.text();
    console.log('📄 Response Body:', data);
    
    if (response.ok) {
      console.log('✅ API endpoint is working!');
    } else {
      console.log('❌ API endpoint returned an error');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPIEndpoint();