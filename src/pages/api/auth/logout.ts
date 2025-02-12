import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);

  cookies.set("token", "", { expires: new Date(0) });
  cookies.set("role", "", { expires: new Date(0) });

  res.status(200).json({ message: "Logged out successfully" });
}
