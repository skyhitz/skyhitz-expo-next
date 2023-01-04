import type { NextApiRequest, NextApiResponse } from "next";

const association = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "GUHNL23262.io.skyhitz.skyhitz",
        paths: ["*"],
      },
    ],
  },
};

export default (_: NextApiRequest, response: NextApiResponse) => {
  return response
    .setHeader("Content-Type", "application/json")
    .status(200)
    .send(association);
};
