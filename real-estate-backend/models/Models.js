const mongoose = require('mongoose');

//Schemas
const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      unique: true,
    },
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    phone: { type: String },
    role: {
      type: [String],
      enum: ['buyer', 'agent'],
      default: ['buyer'],
    },
    active: { type: Number, default: 0 },
    token: { type: String },
    avatar: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const CoordinateSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false, versionKey: false },
);

const PropertySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    description: { type: String },
    size: { type: String },
    price: { type: String },
    address: { type: String },
    furniture: { type: String },
    images: { type: [String], default: [] },
    type: { type: String, enum: ['Cho bán', 'Cho thuê'], required: true },
    status: {
      type: String,
      enum: [
        'Chung cư mini, căn hộ',
        'Nhà riêng',
        'Nhà biệt thự, nhà liền kề',
        'Nhà mặt phố',
        'Shophouse',
        'Đất nền dự án',
        'Đất bán',
        'Kho, nhà xưởng',
      ],
      required: true,
    },
    agent: { type: mongoose.Schema.Types.ObjectId, required: true },
    coordinate: { type: CoordinateSchema, required: true },
    creataAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const AgentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: UserSchema, required: true },
    properties: { type: [PropertySchema], default: [] },
  },
  { versionKey: false },
);

const NewsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    publisher_name: { type: String, required: true },
    creataAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const AccountSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: [UserSchema], required: true },
    deactive: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
  },
  { versionKey: false },
);

const AdminSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    properties: { type: [PropertySchema], default: [] },
    accounts: { type: [AccountSchema], default: [] },
    news: { type: [NewsSchema], default: [] },
  },
  { versionKey: false },
);

const MessageSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    text: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    seen: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: UserSchema,
      required: true,
      ref: 'User',
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Chat',
    },
  },
  { timestamps: true },
);

const ChatSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    from_user_to: { type: UserSchema, required: true },
    to_agent: { type: AgentSchema, required: true },
    message: { type: [{ type: MessageSchema, ref: 'Message' }] },
    lastMessage: { type: String },
    timestamp: { type: Date, default: Date.now },
    // status: { type: String},
  },
  { versionKey: false },
);

//Models
const Admin = mongoose.model('Admin', AdminSchema);
const Agent = mongoose.model('Agent', AgentSchema);
const User = mongoose.model('User', UserSchema);
const Property = mongoose.model('Property', PropertySchema);
const News = mongoose.model('News', NewsSchema);
const Account = mongoose.model('Account', AccountSchema);
const Chat = mongoose.model('Chat', ChatSchema);
const Message = mongoose.model('Message', MessageSchema);

module.exports = { Admin, User, Agent, Property, News, Account, Chat, Message };
