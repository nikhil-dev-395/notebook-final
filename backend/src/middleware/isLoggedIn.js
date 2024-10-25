// import jwt from "jsonwebtoken";

// const isLoggedIn = (req, res, next) => {
//   let token = jwt.headers["authorization"];
//   if (!token) return res.status(401).json({ message: "Token is required" });

//   try {
//     const decode = jwt.verify(token, "secret");
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export default isLoggedIn;

import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  let token = req.headers["authorization"];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  // Remove "Bearer " prefix if present
  token = token.replace("Bearer ", "");

  try {
    // Verify the token
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;


    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ message: "Invalid Token" });
  }
};

export default isLoggedIn;
