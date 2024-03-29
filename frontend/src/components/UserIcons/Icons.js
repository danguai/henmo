import { avatars } from "../../context/Avatar";
import './Icons.css';

import { validateAvatar } from "../../utils/validation";

export const Icons = ({ avatarId, setAvatarId, avatarError, setAvatarError }) => {

    const updateAvatarId = (e) => setAvatarId(e.target.value);

    return (
        <div className='radio__div'>
            <div className="justify__right__label" >
                <div className="avatar__label">
                    CHOOSE YOUR CHICKEN
                    <span> *</span>
                </div>
            </div>
            <div className='icon__loop'>
                {Object.values(avatars).map((avatar, i) => (
                    <div id='radio__jello__div' key={i}>
                        <label>
                            <input
                                type='radio'
                                name='avatarId'
                                onChange={updateAvatarId}
                                onBlur={() => {
                                    const error = validateAvatar(avatarId)
                                    if (error) setAvatarError(error)
                                }}
                                onFocus={() => { setAvatarError('') }}
                                value={i + 1}
                            />
                            <div
                                className="mouse__change__avatars"
                                style={{ backgroundColor: +avatarId === i + 1 ? 'var(--selected-color)' : 'white' }}>
                                <img
                                    src={`${avatar.imageUrl}`}
                                    id="radio__icon"
                                    className="avatar__selector"
                                    alt="avatar"
                                />
                            </div>
                            {avatarError && <div className='error_style names__error'>{avatarError}</div>}
                        </label>
                    </div>
                ))}
            </div>

        </div>

    )
}
