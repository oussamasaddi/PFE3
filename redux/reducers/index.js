import { combineReducers } from 'redux'

import   {user}  from './user'
import {theme} from './theme'
import   {users}  from './users'


const Reducers = combineReducers({
    userState: user ,
    themeState : theme,
    usersState : users,
   
})

export default Reducers 