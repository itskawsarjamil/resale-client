import { useEffect, useState } from "react"

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        fetch(`https://resale-server-murex.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                const token = data.Access_token;
                localStorage.setItem('accessToken', token);
                setToken(token);
            })
    }, [email])
    return token;
}
export default useToken;