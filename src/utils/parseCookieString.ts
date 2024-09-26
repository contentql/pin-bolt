interface CookieAttributes {
  value: string
  expires?: Date
  path?: string
  domain?: string
  httponly: boolean
  secure: boolean
  samesite?: 'Lax' | 'Strict' | 'None'
}

interface Cookies {
  [key: string]: CookieAttributes
}

/**
 * Parses a cookie string into a structured object of cookies.
 * The function handles the parsing of cookie attributes such as `expires`, `path`, `domain`, `httponly`, `secure`, and `samesite`.
 *
 * @param {string} cookieString - The cookie string to parse. It should be a semi-colon-separated list of cookies with their attributes.
 * @returns {Cookies} - An object where each key is a cookie name and its value is an object containing its attributes.
 *
 * @example
 * ```
 * const cookieString = 'session=abc123; expires=Wed, 21 Aug 2024 07:28:00 GMT; path=/; httponly; secure, theme=dark; samesite=Lax';
 * const cookies = parseCookieString(cookieString);
 *
 * // Example output:
 * // {
 * //   session: {
 * //     value: 'abc123',
 * //     expires: '2024-08-21T07:28:00.000Z',
 * //     path: '/',
 * //     httponly: true,
 * //     secure: true,
 * //   },
 * //   theme: {
 * //     value: 'dark',
 * //     samesite: 'Lax'
 * //   }
 * // }
 * ```
 */
export const parseCookieString = (cookieString: string): Cookies => {
  const cookieParts = cookieString.split(/,(?=\s*[^\s=;]+=[^;]*)/)
  const cookies: Cookies = {}

  cookieParts.forEach(part => {
    const parts = part.split(';').map(p => p.trim())
    const [firstNameValue, ...attrs] = parts
    const [name, value] = firstNameValue.split('=')

    const attributes = attrs.reduce(
      (acc: Partial<CookieAttributes>, attr) => {
        const [attrName, attrValue] = attr.split('=')
        const key = attrName.trim().toLowerCase()

        switch (key) {
          case 'expires':
            acc.expires = attrValue
              ? new Date(decodeURIComponent(attrValue))
              : undefined
            break
          case 'path':
          case 'domain':
            acc[key] = decodeURIComponent(attrValue)
            break
          case 'samesite':
            if (['Lax', 'Strict', 'None'].includes(attrValue)) {
              acc.samesite = attrValue as 'Lax' | 'Strict' | 'None'
            }
            break
          case 'httponly':
          case 'secure':
            acc[key] = true
            break
        }

        return acc
      },
      {
        value: decodeURIComponent(value),
        httponly: false,
        secure: false,
      } as Partial<CookieAttributes>,
    )

    cookies[decodeURIComponent(name)] = attributes as CookieAttributes
  })

  return cookies
}
