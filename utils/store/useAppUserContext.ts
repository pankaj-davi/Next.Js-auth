import { useContext } from "react"
import {AppContext} from './context'
 
export const useAppUserContext = () => {
   const {state , dispatch}: any = useContext(AppContext);

   return {state ,dispatch }
}