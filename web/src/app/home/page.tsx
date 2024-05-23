import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default withPageAuthRequired(async function ProfileClient() {
  let user
  try {
    const { accessToken } = await getAccessToken()
    const response = await fetch('https://dev-ignite-lab-01-julio.us.auth0.com/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const data = await response.json()

    user = data
  } catch (error) {
    console.error(error)
  }

  return (
    <div>
      <Image src={user.picture} alt="Imagem do usuário" width={50} height={50} />
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}, {
  returnTo: '/api/auth/login'
})