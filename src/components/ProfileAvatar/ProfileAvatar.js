import React from 'react'
import * as md5 from 'md5'
import { Avatar } from '@material-ui/core'
import { observe, streamProps } from 'frint-react'
import { fetchProfile } from "../../actions/Profile/profile";

const ProfileAvatar = ({ fetchProfile, user: {email}, user: {username}, profile, loadProfile = false }) => {
    React.useEffect(() => {
        if (loadProfile) {
            fetchProfile(username)
        } 
    }, [fetchProfile, username, loadProfile])
    const profilePic = React.useMemo(() => {
        const { profile_picture: profilePic } = profile
        return profilePic === '' ? `https://s.gravatar.com/avatar/${md5(email)}` : profilePic
    }, [profile, email])
    return <Avatar src={profilePic} />
}

export default observe(app => streamProps().set(
    app.get('store').getState$(),
    state => ({
        profile: state.profile.details,
        error: state.profile.fetchingProfileFailed
    }))
    .setDispatch({
        fetchProfile: username => fetchProfile(username)
    }, app.get('store'))
    .get$()
)(ProfileAvatar)
