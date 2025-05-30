import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserNotifications = async (req, res) => {
	try {
		const notifications = await Notification.find({ recipient: req.user._id })
			.sort({ createdAt: -1 })
			.populate("relatedUser", "name username profilePicture")
			.populate("relatedPost", "content image");

		res.status(200).json(notifications);
	} catch (error) {
		console.error("Error in getUserNotifications controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const markNotificationAsRead = async (req, res) => {
	const notificationId = req.params.id;
	try {
		const notification = await Notification.findByIdAndUpdate(
			{ _id: notificationId, recipient: req.user._id },
			{ read: true },
			{ new: true }
		);

		res.json(notification);
	} catch (error) {
		console.error("Error in markNotificationAsRead controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteNotification = async (req, res) => {
	const notificationId = req.params.id;

	try {
		await Notification.findOneAndDelete({
			_id: notificationId,
			recipient: req.user._id,
		});

		res.json({ message: "Notification deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const sendSOSNotification = async (req, res) => {
  try {
    const sender = req.user; // The user who clicked SOS
    
    // Get all users except the sender
    const allUsers = await User.find({ _id: { $ne: sender._id } });
    
    // Create notifications for all other users
    const notifications = await Promise.all(
      allUsers.map(user => 
        Notification.create({
          recipient: user._id,
          type: "sos",
          relatedUser: sender._id,
          read: false
        })
      )
    );
    
    res.status(200).json({ message: "SOS notifications sent successfully" });
  } catch (error) {
    console.error("Error in sendSOSNotification controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
