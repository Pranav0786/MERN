import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';


const SignupForm = ( {setIsLoggedIn}) => {

    const navigate = useNavigate() ;

    const [formData , setFormData] = useState( {
        firstname:"" , lastname:"",email:"",password:"",confirmpassword:""
    })

    const [showPassword , setShowPassword] = useState(false) ;
    const [showConfirmPassword, setshowConfirmPassword] = useState(false) ;
    const [accountType, setAccountType] = useState("student");

    function changeHandler(event) {
        setFormData ( (preData) => (
            {
                ...preData , 
                [event.target.name] : event.target.value 
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault() ;
        if( formData.password !== formData.confirmpassword) {
            toast.error("Password do not match") ;
            return ;
        }

        setIsLoggedIn(true) ;
        toast.success("Account Created") ;
        const accounData = { ...formData } ;
        const finalData = { ...accounData, accountType} ;
        console.log("Printing final account data") ;
        console.log(finalData) ;

        navigate("/dashboard") ;
        
    }

  return (
    <div>
      
        {/* student-instructor tab */}
        <div
        className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'
        >
            <button
            className={`${accountType === "student" ? 
                "bg-richblack-900 text-richblack-5" :
                "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={ () => setAccountType("student")} >
                Student
            </button>
            <button
            className={`${accountType === "instructor" ? 
                "bg-richblack-900 text-richblack-5" :
                "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={ () => setAccountType("instructor")} >
                Instructor
            </button>
        </div>
        {/* form */}
        <form onSubmit={submitHandler}>
            {/* firstName & lastName  */}
                <div className='flex gap-x-4 mt-[20px]'>
                    <label>
                        <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                        >First Name<sup className='text-pink-200'>*</sup></p>
                        <input 
                            required
                            type='text'
                            name='firstname'
                            onChange={changeHandler}
                            placeholder='Enter First Name'
                            value={formData.firstname}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                        />
                    </label>

                    <label>
                        <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                        >Last Name<sup className='text-pink-200'>*</sup></p>
                        <input 
                            required
                            type='text'
                            name='lastname'
                            onChange={changeHandler}
                            placeholder='Enter First Name'
                            value={formData.lastname}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                        />
                    </label>
                </div>

            {/* add email */}
            <div className='w-full mt-[20px]'>
                <label className='w-full'>
                        <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                        >Email Address<sup className='text-pink-200'>*</sup></p>
                        <input 
                            required
                            type='email'
                            name='email'
                            onChange={changeHandler}
                            placeholder='Enter email'
                            value={formData.email}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                        />
                    </label>
            </div>
                
            
            {/* create password & confirm password */}
                <div className='flex gap-x-4 mt-[20px]'>
                    <label className='relative'>
                        <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                        >Create Password<sup className='text-pink-200'>*</sup></p>
                        <input 
                            required
                            type={showPassword ? ("text") : ("password")}
                            name='password'
                            onChange={changeHandler}
                            placeholder='Enter password'
                            value={formData.password}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                        />
                        <span 
                        className='absolute right-3 top-[38px] cursor-pointer'
                        onClick={ () => setShowPassword( (prev) => !prev)}>
                            {showPassword ? 
                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />) }
                        </span>
                    </label>
                    <label className='relative'>
                        <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                        >Confirm Password<sup className='text-pink-200'>*</sup></p>
                        <input 
                            required
                            type={showConfirmPassword ? ("text") : ("password")}
                            name='confirmpassword'
                            onChange={changeHandler}
                            placeholder='Confirm password'
                            value={formData.confirmpassword}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                        />
                        <span 
                        className='absolute right-3 top-[38px] cursor-pointer'
                        onClick={ () => setshowConfirmPassword( (prev) => !prev)}>
                            {showConfirmPassword ? 
                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />) }
                        </span>
                    </label>
                </div>

            {/* create Account button */}
                <button className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 '>
                    Create Account
                </button>
        </form>

    </div>
  )
}

export default SignupForm
