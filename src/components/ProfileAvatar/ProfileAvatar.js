import React from 'react'
import * as md5 from 'md5'
import { Avatar } from '@material-ui/core'
import { observe, streamProps } from 'frint-react'
import { fetchProfile } from "../../actions/Profile/profile";

const ProfileAvatar = ({ fetchProfile, user: {email, username}, profile , loadProfile = false }) => {
    React.useEffect(() => {
        if (loadProfile){
            fetchProfile(username)
        }
    }, [username, fetchProfile, loadProfile])
    const MemoizedAvatar = React.memo(({profile: {profile_picture} , email}) => {
        const profilePicSrc = profile_picture ? profile_picture : `https://s.gravatar.com/avatar/${md5(email)}`
        return <Avatar src={profilePicSrc} />
    }, [profile, email])
    return <MemoizedAvatar profile={profile} email={email} />
}

export default observe(app => streamProps().set(
    app.get('store').getState$(),
    state => ({
        profile: state.profile.details,
        error: state.profile.fetchingProfileFailed,
    }))
    .setDispatch({
        fetchProfile: username => fetchProfile(username)
    }, app.get('store'))
    .get$()
)(ProfileAvatar)
