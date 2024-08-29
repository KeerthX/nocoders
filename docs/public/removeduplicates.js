const fs = require('fs');

// Path to your JSON file
const filePath = './tools.json';  // Adjust path as needed

// Read the JSON file
const jsonData = fs.readFileSync(filePath, 'utf8');
const json = JSON.parse(jsonData);

// Identify the key(s) that define uniqueness
const uniqueKeys = ['name'];  // Adjust keys as needed

// Create a new object to store unique entries
const uniqueJson = {};

// Iterate through the JSON object and remove duplicates
for (const entry of json) {
    const key = uniqueKeys.map(k => entry[k]).join('_');
    uniqueJson[key] = entry;
}

// Write the updated JSON object back to the file
fs.writeFileSync(filePath, JSON.stringify(Object.values(uniqueJson), null, 2), 'utf8');

console.log('Duplicates removed and file updated successfully.');
