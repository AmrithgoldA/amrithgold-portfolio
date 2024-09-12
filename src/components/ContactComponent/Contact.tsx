'use client'

import { useEffect, useState } from "react";
import { MotionUp } from "../../assets/Animations/Motionup";
import setupImage from '../../assets/images/SetupImage.png';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { getSocialLinks, sendEmail } from "../../api/routes/ContactRoute";
import { IoSendSharp } from "react-icons/io5";
import { contactInfoType } from "../../types/contactType";
import { cn } from "../../lib/utils";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LabelInputContainer } from "./LabelInputContainer";
import { Label } from "./Label";
import { Input, Textarea } from "./Input";
import { Tooltip } from 'antd';

export default function Contact() {

    const contactObject: contactInfoType = {
        name: "",
        email: "",
        subject: "",
        message: ""
    }

    const [socialLinks, setsocialLinks] = useState([])
    const [contactDetails, setContactDetails] = useState<contactInfoType>(contactObject)
    const [enableSubmit, setEnableSubmit] = useState<boolean>(true)
    const [enableLoader, setEnableLoader] = useState<boolean>(false)

    useEffect(() => {

        const getSocialLinksData = async () => {

            const socialLinksResponse = await getSocialLinks()
            setsocialLinks(socialLinksResponse.data)

        }

        getSocialLinksData()
    }, [])

    const handleAddContact = (e: any) => {
        const { id, value } = e.target;
        setContactDetails(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    useEffect(() => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isValid = (
            contactDetails.name.trim() !== '' &&
            contactDetails.email.trim() !== '' &&
            contactDetails.message.trim() !== '' &&
            emailRegex.test(contactDetails.email.trim())
        );

        setEnableSubmit(!isValid);
        
    }, [contactDetails]);

    const handleSubmit = async() => {
        setEnableLoader(true)

        const promise = sendEmail(contactDetails);

        toast.promise(
            promise,
            {
                pending: 'Sending email...',
                success: 'Email sent successfully!',
                error: 'Failed to send email. Please try again. 🤯',
            }
        );
    
        const response = await promise

        if(response && response.status === 200) {
            setEnableLoader(false)
            setContactDetails({...contactObject});
        }
        
    }

    const getSocialIcons = (title: string) => {
        switch (title) {
            case "GitHub":
                return <FaGithub size={30} />;
            case "Twitter":
                return <FaTwitter size={30} />;
            case "Instagram":
                return <FaInstagram size={30} />;
            default:
                return <FaLinkedinIn size={30} />;
        }
    };

    const getIconColors = (title: string) => {
        switch (title) {
            case "GitHub":
                return "text-gray-200 hover:text-gray-700";
            case "Twitter":
                return "text-blue-500 hover:text-blue-700";
            case "Instagram":
                return "text-pink-500 hover:text-pink-700";
            default:
                return "text-blue-500 hover:text-blue-700";
        }
    };

    const BottomGradient = () => {
        return (
            <>
                <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </>
        );
    };

    const LoadingIcon = () => {
        return (
            <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-5 h-5 text-blue-100 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                ></path>
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                ></path>
            </svg>
        );
    };

    return (
        <div className="pb-10" id="contact">
            <div className="max-w-6xl w-full mx-auto px-4">
                <MotionUp delay={0.1}>
                    <h2 className="text-center font-bold text-3xl text-blue-100 relative z-20">
                        Let's Have a Chat
                    </h2>
                    <div className="flex sm:flex-nowrap flex-wrap mt-6 sm:mt-12">
                        <div
                            className="order-2 sm:order-1 w-full md:w-[60%]  rounded-lg overflow-hidden sm:mr-10 p-5 md:p-10 flex items-end justify-start relative"
                            style={{
                                background: `linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.70) 100%), url('${setupImage}')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="relative flex flex-wrap justify-center items-center w-full shadow-md">
                                <div className="w-full px-6">
                                    <h6 className="text-blue-100 italic font-bold text-xl uppercase">
                                        Persistence drives <span className="text-purple-400">success.</span>
                                    </h6>
                                </div>

                                <div className="w-full lg:w-1/2 px-6 mt-4">
                                    <h6 className="title-font font-semibold text-blue-100  tracking-widest text-xs">
                                        EMAIL
                                    </h6>
                                    <a
                                        href={`mailto:amrithgold1002@gmail.com`}
                                        className="text-blue-100 leading-relaxed"
                                    >
                                        amrithgold1002@gmail.com
                                    </a>
                                </div>

                                <div className="w-full lg:w-1/2 px-6 mt-4">
                                    <h6 className="title-font font-semibold text-blue-100 tracking-widest text-xs">
                                        WORKING HOURS
                                    </h6>
                                    <p className="text-blue-100 leading-relaxed">
                                        9:00 AM - 6:00 PM
                                    </p>
                                </div>

                                <div className="w-full lg:w-1/2 px-6 mt-4">
                                    <h6 className="title-font font-semibold text-blue-100  tracking-widest text-xs">
                                        ADDRESS
                                    </h6>
                                    <p className="mt-1 text-blue-100 leading-relaxed">
                                        TamilNadu, India
                                    </p>
                                </div>

                                <div className="w-full lg:w-1/2 px-6 mt-4 gap-2 sm:mt-8 flex items-center">
                                    {socialLinks.map((item: any) => (
                                        <a
                                            key={item.title}
                                            href={item.url}
                                            target="_blank"
                                            className={`inline-flex items-center mr-4 ${getIconColors(
                                                item.title
                                            )}`}
                                        >
                                            {getSocialIcons(item.title)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order-1 sm:order-2 w-full md:w-[40%] flex flex-col md:ml-auto mt-8 md:mt-0">
                            <div className="relative">
                                <h6 className="text-center text-blue-100 font-semibold mb-5">
                                    Leave your email and I will get back to you within 24 hours
                                </h6>

                                <LabelInputContainer>
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Amrith Gold"
                                        type="text"
                                        value={contactDetails.name}
                                        onChange={(e: any) => handleAddContact(e)}
                                    />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        placeholder="goldandgold1002@gmail.com"
                                        type="email"
                                        value={contactDetails.email}
                                        onChange={(e: any) => handleAddContact(e)}
                                    />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="subject">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        placeholder="Want to build a website"
                                        type="text"
                                        value={contactDetails.subject}
                                        onChange={(e: any) => handleAddContact(e)}
                                    />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="message">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        rows={3}
                                        className="resize-none"
                                        placeholder="Looking for a proficient software developer skilled in React and Node.js for a specific project"
                                        value={contactDetails.message}
                                        onChange={(e: any) => handleAddContact(e)}
                                    />
                                </LabelInputContainer>
                                
                                <Tooltip title={enableSubmit && "Enter data to enable the button...😊"} placement="top">
                                    <button
                                        className={cn("group/btn relative h-12 w-full shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none", 
                                        { "text-slate-500": enableSubmit, "text-slate-200": !enableSubmit,})}
                                        type="submit"
                                        disabled={enableSubmit}
                                        onClick={() => {
                                            handleSubmit()
                                        }}
                                    >
                                        <span className="flex w-full justify-center items-center gap-2">
                                            Submit 
                                            {!enableLoader ?
                                                <IoSendSharp />
                                                :
                                                <LoadingIcon />
                                            }
                                        </span>
                                        {!enableSubmit &&
                                            <BottomGradient />
                                        }   
                                    </button>
                                </Tooltip>

                                <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-10 sm:my-5 h-[1px] w-full" />
                            </div>
                        </div>
                    </div>
                </MotionUp>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
                transition= {Bounce}
            />
        </div>
    )
};
