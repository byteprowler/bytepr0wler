import { motion, AnimatePresence } from "framer-motion";
import { 
  BsArrowRight 
} from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import React, {useEffect} from "react";
import { fadeIn } from "@/variants";
import { 
  FiCheckSquare, 
  FiX 
} from "react-icons/fi";

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
    >
      <FiCheckSquare className="mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default function ContactForm() {
  const [notification, setNotifications] = React.useState([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_dee38br'
    const templateId = 'template_zszt5pj'
    const publicKey = 'S-qjrJXN9BeEZmDl3'

    const templateParams ={
      from_name: name,
      from_email: email,
      to_name: 'Byte Prowler',
      message: message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      console.log('Email Sent Successfully!', response);
      setName('');
      setEmail('');
      setMessage('');
    }).catch((error) => {
      console.error("Error sending email:", error);
    });
  }

    const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  return (
    <motion.form
           variants={fadeIn('up', 0.4)}
           initial='hidden'
           animate='show'
           onSubmit={handleSubmit}
           exit='hidden'
           className='flex-1 flex flex-col gap-6 w-full mx-auto'>
            <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='name' name='user_name' className='input'/>
             <input value={email} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email' name='user_email' className='input lowercase'/>
            <textarea id='message' value={message} onChange={(e) => setMessage(e.target.value)} name="message" placeholder='message' className='textarea' />
        <button
          onClick={() => {
            setNotifications((pv) => [
                { id: Math.random(), text: "Message sent!" },
                ...pv,
                ]);
              }} 
              type='submit'
              value="Send"
              className='btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hiwdden hover:border-[#F13024] group'>
            <span className=' group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500 '>Let&apos;s talk</span>
            <BsArrowRight className='-translate-x-[120%] opacity-0 group-hover:flex group-hover:-translate-x-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
        </button>
         <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
            {notification.map((n) => (
              <Notification removeNotif={removeNotif} {...n} key={n.id} />
           ))}
        </AnimatePresence>
        </div>
    </motion.form>
  )
}
