import { Switch, Route } from 'react-router'
import Wrapper from './Components/Home/Wrapper'
import Landing from './Components/Home/Landing'
import Post from './Components/Home/Post'
import Login from './Components/Home/Login'
import Register from './Components/Home/Register'
import MyAccount from './Components/Home/MyAccount'
import Notification from './Components/Notifications'
import Discover from './Components/Discover'
import PostReply from './Components/Home/PostReply'
import CreatePost from './Components/CreatePost'
import Inbox from './Components/Inbox'
import UpdateProfile from './Components/UpdateProfile'
import Profile from './Components/Profile'
import Category from './Components/Category'
import Verification from './Components/Verification'
import UpdateProfileImage from './Components/UpdateProfileImage'

function App() {
  return (
    <Switch>
      <Route path="/update-profile-image">
        <Wrapper component={UpdateProfileImage} />
      </Route>
      <Route path="/category/:category">
        <Wrapper component={Category} />
      </Route>
      <Route path="/profile/:username">
        <Wrapper component={Profile} />
      </Route>
      <Route path="/update-profile">
        <Wrapper component={UpdateProfile} />
      </Route>
      <Route path="/inbox">
        <Wrapper component={Inbox} />
      </Route>
      <Route path="/new-post">
        <Wrapper component={CreatePost} />
      </Route>
      <Route path="/discover">
        <Wrapper component={Discover} />
      </Route>
      <Route path="/notification">
        <Wrapper component={Notification} />
      </Route>
      <Route path="/my-account">
        <Wrapper component={MyAccount} />
      </Route>
      <Route path="/register">
        <Wrapper component={Register} />
      </Route>
      <Route path="/login">
        <Wrapper component={Login} />
      </Route>
      <Route path="/verify-account/:code">
        <Wrapper component={Verification} />
      </Route>
      <Route path="/:slug">
        <Wrapper component={Post} />
      </Route>
      <Route path="/">
        <Wrapper component={Landing} />
      </Route>
    </Switch>
  )
}

export default App
