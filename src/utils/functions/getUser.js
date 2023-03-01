import User from '@/utils/models/User';

export default function getUser(){
    if (typeof window !== 'undefined') {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user) return new User(user._id, user.pseudo, user.email);
        return undefined;
    }
}