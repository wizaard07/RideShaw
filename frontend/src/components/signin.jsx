import React from 'react'
import { useNavigate } from 'react-router-dom'


const SignIn = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = React.useState({email:"",
    password:""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3001/api/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });

        const json = await response.json()
        console.log(json)
        
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate('/')
        }
        else{
            alert("Invalid credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <body className="bg-white font-family-karla h-screen">

        <div className="w-full flex flex-wrap">

            <div className="w-full md:w-1/2 flex flex-col">

                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-3xl">Welcome</p>
                    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col pt-4">
                            <label for="email" className="text-lg">Email</label>
                            <input type="email" name="email" value={credentials.email} onChange={onChange} id="email" placeholder="your@email.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
        
                        <div className="flex flex-col pt-4">
                            <label for="password" className="text-lg">Password</label>
                            <input type="password" name="password"  id="password" placeholder="Password" value={credentials.password} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
        
                        <input type="submit" value="Log In" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
                    </form>
                    <div className="text-center pt-12 pb-12">
                        <p>Don't have an account? <a href="/signup" className="underline font-semibold">Register here.</a></p>
                    </div>
                </div>

            </div>

            <div className="w-1/2 shadow-2xl">
                <img className="object-cover w-full h-screen hidden md:block" src="https://media.istockphoto.com/id/1041476372/photo/online-payment-authorization-mobile-phone-password.jpg?s=2048x2048&w=is&k=20&c=88TgU5R7or0jmOFA7P31SmdALoi77TMzmvInbt6aH3M=" alt="backgruond" />
            </div>
        </div>

        </body>
    )
}

export default SignIn
