const mongoose = require('mongoose');

const coinSchema = mongoose.Schema(
  {
    token_owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token_name: {
      type: String,
      required: [true, 'Please enter a token name'],
      unique: true,
    },
    token_symbol: {
      type: String,
      required: [true, 'Please enter a token symbol'],
      unique: true,
    },
    token_network: {
      type: String,
      required: [true, 'Please provide a token network'],
      enum: ['Binance', 'Ethereum', 'Polygon', 'Tron', 'Solana'],
    },
    token_contract_address: {
      type: String,
      required: [true, 'Please enter your contract address'],
      unique: true,
    },
    token_description: {
      type: String,
      required: [true, 'Please enter a discription'],
    },
    token_logo: {
      type: String,
      required: [true, 'Please enter an address to your token logo'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    token_stage: {
      type: Boolean,
      default: false,
    },
    token_chart_url: {
      type: String,
      default: '',
    },
    token_swap_url: {
      type: String,
      default: '',
    },
    token_website_url: {
      type: String,
      default: '',
    },
    token_launch_date: {
      type: String,
      default: '',
    },
    token_telegram_url: {
      type: String,
      default: '',
    },
    token_twitter_url: {
      type: String,
      default: '',
    },
    token_discord_url: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Coin', coinSchema);
