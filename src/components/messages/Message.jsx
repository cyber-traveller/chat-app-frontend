import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { Box, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

	return (
		<motion.div
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0.5, opacity: 0 }}
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
			whileHover={{ scale: 1.02 }}
		>
			<Box
				component={motion.div}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: fromMe ? 'flex-end' : 'flex-start',
					my: 1,
					gap: 1
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flexDirection: fromMe ? 'row-reverse' : 'row' }}>
					<Avatar
						src={profilePic}
						alt="profile pic"
						component={motion.div}
						whileHover={{ scale: 1.1 }}
						sx={{ width: 30, height: 30 }}
					/>
					<motion.div
						whileHover={{ y: -2 }}
						style={{
							backgroundColor: fromMe ? '#2196f3' : '#f5f5f5',
							color: fromMe ? '#fff' : '#000',
							padding: '8px 16px',
							borderRadius: fromMe ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
							maxWidth: '70%',
							wordWrap: 'break-word',
							boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
						}}
					>
						<Typography variant="body1" sx={{ mb: 0.5 }}>
							{message.message}
						</Typography>
						<Typography
							variant="caption"
							color="text.secondary"
							sx={{
								display: 'block',
								textAlign: fromMe ? 'right' : 'left',
								mt: 0.5,
								fontSize: '0.75rem'
							}}
						>
							{formattedTime}
						</Typography>
					</motion.div>
				</Box>
			</Box>
		</motion.div>
	);
};

export default Message;
