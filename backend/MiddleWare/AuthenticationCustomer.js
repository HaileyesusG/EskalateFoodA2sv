const jwt = require("jsonwebtoken");
const Customer = require("../Model/Customer");
const AuthenticationCustomer = async (req, res, next) => {
  //verify
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token reqired" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.customer = await Customer.findOne({ _id });

    //const customer_id = req.user._id;
    //req.cat = await Category.find({ user_id }).select("_id");

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request not authorized" });
  }
};
module.exports = AuthenticationCustomer;
