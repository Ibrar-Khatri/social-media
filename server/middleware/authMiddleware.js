import JWT from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.includes("Bearer"))
    next("Authentication failed");

  const token = authHeader.split(" ")[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.body.user = {
      userId: userToken.userId,
    };
    next();
  } catch (err) {
    console.log("🚀 ~ err:", err);
    next("Authentication failed");
  }
};

export default userAuth;
