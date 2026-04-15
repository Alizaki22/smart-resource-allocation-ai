📦 DATABASE INFO — FOR TEAMMATES (COPY & PASTE READY)
🗄️ Database Basic Info
{
  "databaseName": "smart-resource-allocation-ai",
  "databaseType": "MongoDB",
  "connectionURL": "mongodb://localhost:27017/smart-resource-allocation-ai"
}
📁 Collections List
{
  "collections": [
    "users",
    "resources",
    "allocations"
  ]
}
👤 Users Collection Structure
{
  "collection": "users",
  "structure": {
    "name": "String",
    "email": "String",
    "role": "String",
    "createdAt": "Date"
  }
}
🖥️ Resources Collection Structure
{
  "collection": "resources",
  "structure": {
    "resourceName": "String",
    "type": "String",
    "availability": "Boolean",
    "capacity": "Number"
  }
}
📊 Allocations Collection Structure (Most Important)
{
  "collection": "allocations",
  "structure": {
    "userId": "ObjectId",
    "resourceId": "ObjectId",
    "requestData": {
      "cpu": "Number",
      "memory": "Number"
    },
    "aiPrediction": {
      "allocated": "Boolean",
      "score": "Number"
    },
    "timestamp": "Date"
  }
}
🧪 Sample Users (Already Added)
[
  {
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  },
  {
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "admin"
  }
]
🧪 Sample Resources (Already Added)
[
  {
    "resourceName": "GPU Server 1",
    "type": "Hardware",
    "availability": true,
    "capacity": 100
  },
  {
    "resourceName": "CPU Cluster",
    "type": "Hardware",
    "availability": true,
    "capacity": 200
  }
]
📂 Database Files Location
{
  "databaseFolder": "database/",
  "configFile": "database/config/db.js",
  "modelsFolder": "database/models/",
  "modelFiles": [
    "User.js",
    "Resource.js",
    "Allocation.js"
  ],
  "startupFile": "database/index.js"
}
▶️ How To Run Database
{
  "runCommand": "node index.js",
  "runLocation": "database/",
  "expectedOutput": [
    "MongoDB Connected Successfully",
    "Database initialized successfully"
  ]
}
🔌 For Backend Developer — Import Models
{
  "backendImports": [
    "require('../database/models/User')",
    "require('../database/models/Resource')",
    "require('../database/models/Allocation')"
  ]
}
🤖 For AI Developer — Allocation Data Format
{
  "requestDataFormat": {
    "cpu": 4,
    "memory": 16
  },
  "aiResponseFormat": {
    "allocated": true,
    "score": 0.92
  }
}
⚠️ Database Rules For Team
{
  "rules": [
    "Do not change collection names",
    "Do not modify schema without informing database developer",
    "Use correct field names",
    "Store AI results in allocations collection"
  ]
}
🧠 What This Helps With
Your teammates can now:

✅ Connect backend to database
✅ Send correct data format
✅ Store AI predictions
✅ Avoid schema errors
✅ Work faster

⭐ What You Should Do Now
Create a file:

database/TEAM_DATABASE_INFO.md
Paste everything above.

That file becomes:

📌 Your official database documentation for the team
📌 Very useful for backend + AI teammates

