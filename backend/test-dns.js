const dns = require("node:dns").promises;

(async () => {
  console.log("Starting DNS test...");

  try {
    const records = await dns.resolveSrv(
      "_mongodb._tcp.cluster0.jg7e9n9.mongodb.net"
    );

    console.log("SRV Records:");
    console.log(records);
  } catch (err) {
    console.error("DNS Error:");
    console.error(err);
  }

  console.log("Finished.");
})();