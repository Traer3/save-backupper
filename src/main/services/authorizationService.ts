import { google } from 'googleapis'
import http from 'http'
import url from 'url'
import { shell } from 'electron'

export class AuthorizationService {
  // private oAuth2Client = new google.auth.OAuth2(
  //   process.env.GOOGLE_CLIENT_ID,
  //   process.env.GOOGLE_CLIENT_SECRET
  // )

  async login(): Promise<boolean> {
    //  const clientId = (import.meta.env as any).MAIN_VITE_GOOGLE_CLIENT_ID
    // const clientSecret = (import.meta.env as any).MAIN_VITE_GOOGLE_CLIENT_SECRET

    const clientId = import.meta.env.MAIN_VITE_GOOGLE_CLIENT_ID
    const clientSecret = import.meta.env.MAIN_VITE_GOOGLE_CLIENT_SECRET
    if (!clientId || !clientSecret) {
      console.error(`Error missing clientId OR clientSecret`)
      return false
    }

    return new Promise((resolve, reject) => {
      const server = http.createServer(async (req, res) => {
        try {
          if (req.url?.startsWith('/callback')) {
            const address = server.address()
            const port = typeof address !== 'string' ? address?.port : 0
            const currentRedirectUri = `http://127.0.0.1:${port}/callback`

            const queryParams = new url.URL(req.url, currentRedirectUri).searchParams
            const code = queryParams.get('code')

            if (code) {
              const oAuth2Client = new google.auth.OAuth2(
                clientId,
                clientSecret,
                currentRedirectUri
              )

              const { tokens } = await oAuth2Client.getToken({
                code: code,
                redirect_uri: currentRedirectUri
              })
              console.log('generated token is:', tokens)
              oAuth2Client.setCredentials(tokens)

              // if(tokens.refresh_token){
              //     // await this.saveRefreshToken(tokens.refresh_token)
              // }

              res.end('<h1>all good</h1>')
              server.close()
              resolve(true)
            }
          }
        } catch (err) {
          res.end('<h1>Authorization failed! Try later</h1>')
          server.close()
          reject(err)
        }
      })

      server.listen(0, '127.0.0.1', () => {
        const address = server.address()
        if (address && typeof address !== 'string') {
          const port = address.port
          const redirectUri = `http://127.0.0.1:${port}/callback`

          const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

          console.log('redirectUri', redirectUri)

          const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: ['https://www.googleapis.com/auth/drive.file']
          })
          //console.log('generated url is:', authUrl)
          shell.openExternal(authUrl)
        }
      })
    })
  }
}
export const authorizationService = new AuthorizationService()

/*
async function getAuthUrl() {
    if (!(await exists(CREDENTIALS_PATH))) {
        return false;
    };
    try {
        const content = await readMyFile(CREDENTIALS_PATH);
        const credentials = JSON.parse(content);
        const { client_secret, client_id, redirect_uris } = credentials.web;

        const redirectUri = redirect_uris[0];

        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirectUri
        );

        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
            prompt: 'consent'
        });
        //console.log("getAuthUrl authUrl :" , authUrl)
        return authUrl;
    } catch (err) {
        console.log(`Error in getAuthUrl : ${err}`);
        return null;
    }
};
*/
