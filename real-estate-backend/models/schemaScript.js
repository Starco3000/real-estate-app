db.createCollection("chats", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "chats",
      required: ["_id", "from_user_id", "to_agent_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "from_user_id": { bsonType: "objectId" },
        "to_agent_id": { bsonType: "objectId" },
        "messages": { bsonType: "array", items: { bsonType: "string" } },
        "last_message": { bsonType: "string" },
        "timestamp": { bsonType: "date" },
        "status": { bsonType: "string" },
      },
    },
  },
});

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "users",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "username": { bsonType: "string" },
        "password": { bsonType: "string" },
        "email": { bsonType: "string" },
        "name": { bsonType: "string" },
        "phone": { bsonType: "string" },
        "role": { bsonType: "string" },
        "active": { bsonType: "string" },
        "create_at": { bsonType: "date" },
        "update_at": { bsonType: "date" },
      },
    },
  },
});

db.createCollection("admins", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "admins",
      required: ["_id", "user_id", "properties", "accounts", "news"],
      properties: {
        "_id": { bsonType: "objectId" },
        "user_id": { bsonType: "objectId" },
        "admin_name": { bsonType: "string" },
        "properties": { bsonType: "array", items: { bsonType: "objectId" } },
        "accounts": { bsonType: "array", items: { bsonType: "objectId" } },
        "news": { bsonType: "array", items: { bsonType: "objectId" } },
      },
    },
  },
});

db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "messages",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "text": { bsonType: "string" },
        "imageUrl": { bsonType: "string" },
        "videoUrl": { bsonType: "string" },
        "user_id": { bsonType: "string" },
        "chat_id": { bsonType: "string" },
        "timestamp": { bsonType: "date" },
      },
    },
  },
});

db.createCollection("agents", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "agents",
      required: ["_id", "user_id", "properties"],
      properties: {
        "_id": { bsonType: "objectId" },
        "user_id": { bsonType: "objectId" },
        "agent_name": { bsonType: "string" },
        "phone": { bsonType: "string" },
        "email": { bsonType: "string" },
        "properties": { bsonType: "array", items: { bsonType: "objectId" } },
        "create_at": { bsonType: "date" },
        "update_at": { bsonType: "date" },
      },
    },
  },
});

db.createCollection("news", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "news",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "title": { bsonType: "string" },
        "description": { bsonType: "array", items: { bsonType: "string" } },
        "publisher_name": { bsonType: "string" },
        "create_at": { bsonType: "date" },
        "update_at": { bsonType: "date" },
      },
    },
  },
});

db.createCollection("coordinates", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "coordinates",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "latitude": { bsonType: "double" },
        "longitude": { bsonType: "double" },
      },
    },
  },
});

db.createCollection("accounts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "accounts",
      required: ["_id", "user_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "user_id": { bsonType: "array", items: { bsonType: "objectId" } },
        "deactive": { bsonType: "bool" },
        "disable": { bsonType: "bool" },
      },
    },
  },
});

db.createCollection("properties", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "properties",
      required: ["_id", "coordinates", "agent_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "title": { bsonType: "string" },
        "description": { bsonType: "string" },
        "size": { bsonType: "string" },
        "price": { bsonType: "string" },
        "address": { bsonType: "string" },
        "furniture": { bsonType: "string" },
        "coordinates": { bsonType: "objectId" },
        "images": { bsonType: "array", items: { bsonType: "string" } },
        "type": { bsonType: "string" },
        "status": { bsonType: "string" },
        "agent_id": { bsonType: "objectId" },
        "create_at": { bsonType: "date" },
        "update_at": { bsonType: "date" },
      },
    },
  },
});