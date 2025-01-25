import { useForgotPasswordMutation } from "@/services/api/auth.api"
import { useToast } from "../useUI/useToast"

export const useForgotPassword = () => {

    const [forgotPassword,{error,isError,isLoading,isSuccess,isUninitialized}] = useForgotPasswordMutation()
    useToast({error,isError,isLoading,isSuccess,isUninitialized,successMessage:"We have sent an email, please check spam if not received",successToast:true})

    return {
        forgotPassword,
        isLoading,
    }
}
