import { useNavigate } from "react-router-dom"

export default function Role({ name }) {
    const navigate = useNavigate()
    const rawUser = localStorage.getItem('user')

    useEffect(() => {
        if (rawUser) {
            const user = JSON.parse(rawUser)


            console.log(user)

            console.log(user.role)
            if (user.role !== name) return navigate(`/${name}/dashboard`)
        }
    }, [rawUser])
}