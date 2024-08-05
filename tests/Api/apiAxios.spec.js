// import playwright from 'playwright';
// import axios from 'axios';

// (async () => {
//   const response = await axios.post('https://api.example.com/users', {
//     name: 'John Doe',
//     email: 'john@example.com'
//   });

//   const { id } = response.data;

//   const browser = await playwright.chromium.launch();
//   const page = await browser.newPage();
  
//   await page.goto('https://app.example.com');
  
//   // Log in as an admin user
//   await page.fill('input[name="username"]', 'admin');
//   await page.fill('input[name="password"]', 'admin');
//   await page.click('button[type="submit"]');
  
//   // Check if the newly created user is listed
//   const userLink = await page.$(`a[href="/users/${id}"]`);
//   if (userLink) {
//     console.log('User created successfully');
//   } else {
//     console.log('User creation failed');
//   }

//   await browser.close();
// })();