import { google } from 'googleapis'
import http from 'http'
import url from 'url'
import { shell, safeStorage } from 'electron'
import { toolsService } from './toolsService'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET
const VITE_REDIRECT_IP = import.meta.env.VITE_REDIRECT_IP

type OAuth2Client = InstanceType<typeof google.auth.OAuth2>
export class AuthorizationService {
  private TOKEN_FILE = 'token.bin'

  async login(): Promise<boolean> {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error(`Error missing CLIENT_ID OR CLIENT_SECRET`)
      return false
    }

    const client = await this.checkToken()
    if (!client) {
      return new Promise((resolve, reject) => {
        const server = http.createServer(async (req, res) => {
          try {
            if (req.url?.startsWith('/callback')) {
              const address = server.address()
              const port = typeof address !== 'string' ? address?.port : 0
              const currentRedirectUri = `http://${VITE_REDIRECT_IP}:${port}/callback`
              const queryParams = new url.URL(req.url, currentRedirectUri).searchParams
              const code = queryParams.get('code')

              if (code) {
                const oAuth2Client = new google.auth.OAuth2(
                  CLIENT_ID,
                  CLIENT_SECRET,
                  currentRedirectUri
                )

                const { tokens } = await oAuth2Client.getToken({
                  code: code,
                  redirect_uri: currentRedirectUri
                })
                oAuth2Client.setCredentials(tokens)

                if (tokens.refresh_token) {
                  console.log('Token generating...')
                  await this.saveRefreshToken(tokens.refresh_token)
                }

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

        server.listen(0, `${VITE_REDIRECT_IP}`, () => {
          const address = server.address()
          if (address && typeof address !== 'string') {
            const port = address.port
            const redirectUri = `http://${VITE_REDIRECT_IP}:${port}/callback`

            const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, redirectUri)

            const authUrl = oAuth2Client.generateAuthUrl({
              access_type: 'offline',
              prompt: 'consent',
              scope: ['https://www.googleapis.com/auth/drive.file']
            })
            shell.openExternal(authUrl)
          }
        })
      })
    }
    return true
  }

  private async saveRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      if (!safeStorage.isEncryptionAvailable()) {
        console.error(`encryption safeStorage is unavailable`)
        return false
      }
      const encryptedBuffer = safeStorage.encryptString(refreshToken)
      const success = await toolsService.writeFile(this.TOKEN_FILE, encryptedBuffer, true)
      if (success) {
        console.log(`Refresh token saved successfully`)
      }
      return success
    } catch (err) {
      console.error(`Error encrypting token`, err)
      return false
    }
  }

  private async getSavedRefreshToken(): Promise<string | null> {
    try {
      if (!safeStorage.isEncryptionAvailable()) return null
      const encryptedBuffer = await toolsService.readMyFile<Buffer>(this.TOKEN_FILE, true)
      if (!encryptedBuffer) return null
      const decryptedToken = safeStorage.decryptString(encryptedBuffer)
      return decryptedToken
    } catch (err) {
      console.error(`Error decrypting token`, err)
      return null
    }
  }

  async deleteToken(): Promise<boolean | null> {
    try {
      const tokenExists = await toolsService.exists(this.TOKEN_FILE)
      if (tokenExists) {
        const answer = toolsService.deleteFile(this.TOKEN_FILE)
        console.log('Token deleted!')
        return answer
      }
      console.log(`${this.TOKEN_FILE} does not exist`)
      return false
    } catch (err) {
      console.log(`Error delteting token`, err)
      return null
    }
  }

  private async checkToken(): Promise<OAuth2Client | null> {
    const tokenExists = await toolsService.exists(this.TOKEN_FILE)
    if (!tokenExists) return null
    const refreshToken = await this.getSavedRefreshToken()
    if (!refreshToken) return null

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET)

    oAuth2Client.setCredentials({
      refresh_token: refreshToken
    })
    try {
      const { credentials } = await oAuth2Client.refreshAccessToken()
      oAuth2Client.setCredentials(credentials)
      console.log('Toking working')
      return oAuth2Client
    } catch (err) {
      console.log(`Error in checkToken : ${err}`)
      return null
    }
  }
}
export const authorizationService = new AuthorizationService()
