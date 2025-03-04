import { useEffect, useState } from "react";
import { checkSubscription } from "../services/userService";

const useSubscriptionCheck = (userInfo) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifySubscription = async () => {
            if(userInfo?.isSubscribed !== undefined) {
                setIsSubscribed(userInfo.isSubscribed);
            } else if (userInfo &&  userInfo?.email ) {
                const subscriptionValid = await checkSubscription(userInfo.email);
                setIsSubscribed(subscriptionValid);
            } else {
                setIsSubscribed(false);
            }
            setLoading(false);
        }

        verifySubscription();

    }, [userInfo]);

    return { isSubscribed, loading };
    
}

export default useSubscriptionCheck;