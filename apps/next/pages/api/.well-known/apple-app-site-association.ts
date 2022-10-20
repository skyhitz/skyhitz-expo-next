import type { NextApiRequest, NextApiResponse } from 'next'

const association = {
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": [ "GUHNL23262.io.skyhitz.skyhitz" ],
        "components": [
          {
            "/": "/sign-in/*",
            "?": { "token": "*", "uid": "*" }
          }
        ],
        "appID": "GUHNL23262.io.skyhitz.skyhitz",
        "paths": ["*", "/sign-in/*"]
      }
    ]
  }
}

export default (_: NextApiRequest, response: NextApiResponse) => {
  return response.status(200).send(association)
}