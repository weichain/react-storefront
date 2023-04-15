var omise = require("../../omise-node")({
  publicKey: "pkey_test_5v0tzstq34vn9s6800h",
  secretKey: "skey_test_5v1asluvtklyiikdd5z",
});

omise.charges.retrieve("chrg_test_5vcgqggrhc7pl845s3p", (err, charge) => {
  console.log("error is: ", err);
  console.log("charge is: ", charge);
});
