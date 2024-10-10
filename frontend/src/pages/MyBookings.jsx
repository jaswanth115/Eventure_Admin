import { motion } from "framer-motion";

const MyBookings = () => {

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-600 bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl '
		>
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
				My Bookings...
			</h2>
		</motion.div>
	);
};
export default MyBookings;