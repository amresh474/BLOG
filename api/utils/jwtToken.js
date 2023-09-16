import jwt from "jsonwebtoken";

export const tokenGenerate = (Id, SECRET_KEY, TIME) => {
  const token = jwt.sign({ id: Id }, SECRET_KEY, { expiresIn: TIME });
  return token;
};
