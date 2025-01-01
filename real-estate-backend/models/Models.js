const mongoose = require('mongoose');

//Schemas
const CoordinateSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false, versionKey: false },
);

// const LocationSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     code: { type: Number, required: true },
//   },
//   { _id: false, versionKey: false },
// );

const PostSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    size: { type: Number },
    price: { type: Number },
    address: { type: String },
    province: { type: [String] },
    district: { type: [String] },
    ward: { type: [String] },
    bedroom: { type: String },
    bathroom: { type: String },
    type: { type: String },
    status: { type: String },
    direction: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postDetailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostDetail',
      require: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
const PostDetailSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    images: { type: [String], default: [] },
    description: { type: String },
    certificate: { type: String },
    coordinate: { type: CoordinateSchema, required: true },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { versionKey: false },
);
const FavoriteSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
    from_user_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to_agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
      required: true,
    },
    message: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    },
    lastMessage: { type: String },
    timestamp: { type: Date, default: Date.now },
    // status: { type: String},
  },
  { versionKey: false },
);
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
      enum: ['buyer', 'agent', 'admin'],
      default: ['buyer'],
    },
    active: { type: Number, default: 0 },
    token: { type: String },
    avatar: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    chats: { type: [ChatSchema], default: [] },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  { versionKey: false },
);
const AgentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    posts: { type: [PostSchema], default: [] },
  },
  { versionKey: false },
);
const NewsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    views: { type: Number, default: 0 },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
const AccountSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
    email: { type: String },
    name: { type: String },
    phone: { type: String },
    role: { type: String, default: 'admin' },
    avatar: { type: String, default: null },
    posts: { type: [PostSchema], default: [] },
    accounts: { type: [AccountSchema], default: [] },
    news: { type: [NewsSchema], default: [] },
  },
  { versionKey: false },
);

//Models
const Admin = mongoose.model('Admin', AdminSchema);
const Agent = mongoose.model('Agent', AgentSchema);
const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const PostDetail = mongoose.model('PostDetail', PostDetailSchema);
const Favorite = mongoose.model('Favorite', FavoriteSchema);
const News = mongoose.model('News', NewsSchema);
const Account = mongoose.model('Account', AccountSchema);
const Chat = mongoose.model('Chat', ChatSchema);
const Message = mongoose.model('Message', MessageSchema);

module.exports = {
  Admin,
  User,
  Agent,
  Post,
  PostDetail,
  Favorite,
  News,
  Account,
  Chat,
  Message,
};
