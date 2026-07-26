const mongoose = require("mongoose");
const dns = require("dns");

// Some networks (routers, ISPs, VPNs) block or mishandle the DNS SRV record
// lookups that mongodb+srv:// URIs depend on, even though normal domain
// lookups work fine. Forcing Node to use a public DNS resolver sidesteps
// that instead of relying on whatever DNS the OS/network hands it.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not set in environment variables");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;