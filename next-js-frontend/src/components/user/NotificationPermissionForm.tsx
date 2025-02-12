import { getMessaging, getToken } from "firebase/messaging";
import { motion } from "framer-motion";
import { useUpdateFcmToken } from "../../hooks/useAuth/useUpdateFcmToken";
import { setNotificationPermissionForm } from "../../lib/client/slices/uiSlice";
import { useAppDispatch } from "../../lib/client/store/hooks";
import { useEffect, useState } from "react";
import { useUpdateNotificationsFlag } from "../../hooks/useUser/useUpdateNotificationsFlag";
import toast from "react-hot-toast";

const NotificationPermissionForm = () => {
  const dispatch = useAppDispatch();

  const { updateFcmToken, isSuccess } = useUpdateFcmToken();
  const { updateNotificationsFlag } = useUpdateNotificationsFlag();

  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      handleDeny();
      setLoading(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (token) {
      updateFcmToken({ fcmToken: token });
      updateNotificationsFlag({ isEnabled: true });
    }
  }, [token]);

  useEffect(() => {
    if (loading) toast.loading("Please wait");
    else if (!loading) toast.dismiss();
  }, [loading]);

  const handleDeny = () => {
    dispatch(setNotificationPermissionForm(false));
  };

  const handleAllow = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setLoading(true);

      if (process.env.VITE_FIREBASE_VAPID_KEY) {
        try {
          const fcmToken = await getToken(getMessaging(), {
            vapidKey: process.env.VITE_FIREBASE_VAPID_KEY,
          });
          setToken(fcmToken);
        } catch (error) {
          console.error("Error obtaining FCM token:", error);
        }
      }
    } else {
      handleDeny();
    }
  };

  return (
    <div className="flex flex-col gap-y-7">
      <div className="flex flex-col gap-y-2">
        <h4 className="text-xl">
          hmm 💭 seems like you haven&apos;t been receiving notifications
        </h4>
        <div className="flex flex-col gap-y-1">
          <p className="text-secondary-darker">
            Even after allowing notifications you&apos;ll have full control to
            toggle them via settings{" "}
          </p>
          <p className="text-secondary-darker">Wanna allow notifications ? </p>
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAllow}
          className="bg-primary px-10 py-2 rounded-md"
        >
          Allow
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDeny}
          className="bg-secondary-darker px-10 py-2 rounded-md"
        >
          Deny
        </motion.button>
      </div>
    </div>
  );
};

export default NotificationPermissionForm;
