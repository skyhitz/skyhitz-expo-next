import type { NextApiRequest, NextApiResponse } from 'next'

const association = {
  applinks: {
    apps: [],
    details: [
        {
            appID: "GUHNL23262.io.skyhitz.skyhitz",
            paths: ["/sign-in"]
        }
    ],
  },
}

export default (_: NextApiRequest, response: NextApiResponse) => {
  return response.status(200).send(association)
}