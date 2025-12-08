import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';

const Register = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [passToggle, setPassToggle] = useState(true)

    const handlePass = (e) => {
        e.preventDefault()
        setPassToggle(!passToggle)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        const name= e.target.name.value;
        const photo= e.target.photo.value;

        console.log('register clicked', email, password, terms, name, photo)

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/
        if (!passwordPattern.test(password)) {
            setError('Password is invalid!')
            return
        }
        if (!terms) {
            setError("Please accept our terms and condition")
            return
        }

        // reset status : success or error
        setError('')
        setSuccess(false)

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log('after creation of a new user', result.user)
                setSuccess(true)
                e.target.reset()

                // Update user profile
                const profile ={
                    displayName: name,
                    photoURL:  photo
                }
                updateProfile(result.user, profile)
                .then(()=>{})
                .catch()

                // send verification Email
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('please verify your email')
                    })
            })
            .catch(error => {
                console.log('error happened', error.message)
                setError(error.message)
            })
    }
    return (

        <div className="card bg-base-100 w-full m-auto mt-10 max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Register now!</h1>
                <form onSubmit={handleRegister}>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Enter Name" />

                        <label className="label">Photo Url</label>
                        <input type="text" name='photo' className="input" placeholder="Enter photo url" />

                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Enter Email" />

                        <label className="label">Password</label>
                        <div className='relative'>
                            <input
                                type={passToggle ? 'password' : 'text'}
                                name='password'
                                className="input"
                                placeholder="Enter Password" />
                            <button
                                onClick={handlePass}
                                className="btn btn-xs absolute top-2 right-6">
                                {passToggle ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        <div>
                            <label className="label">
                                <input type="checkbox" name='terms' className="checkbox" />
                                Accept our term and conditions
                            </label>
                        </div>
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                    {
                        success && <p className="text-green-500">Account create successfully</p>
                    }
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
                </form>
                <p>Already have an account? Please <Link className='text-blue-400 underline' to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;