// Test login endpoint directly
require('dotenv').config({ path: '.env.local' });

async function testLogin() {
  console.log('🧪 Testing login endpoint...\n');
  
  const credentials = {
    email: 'admin@securethefuture.org',
    password: 'Admin123!'
  };
  
  console.log('Credentials:', credentials);
  console.log('\nSending POST request to http://localhost:3000/api/auth/login...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    
    const data = await response.json();
    console.log('\nResponse data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('\n✅ Login successful!');
      console.log('User:', data.user);
      console.log('Token received:', data.token ? 'Yes' : 'No');
    } else {
      console.log('\n❌ Login failed!');
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.error('\n❌ Request failed:', error);
  }
}

testLogin();
