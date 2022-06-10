import { avatars } from "../../context/Avatar";
import './Icons.css';

import { validateAvatar } from "../../utils/validation";

export const IconsTwoLines = ({ avatarId, setAvatarId, avatarError, setAvatarError }) => {

    const updateAvatarId = (e) => setAvatarId(e.target.value);

    return (
        <div className='update__avatar'>
            <div className='icon__two__lines'>
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
                            ></input>
                            <div
                                className="mouse__change__avatars"
                                style={{ backgroundColor: +avatarId === i + 1 ? 'var(--selected-color)' : '' }}>
                                <img
                                    src={`${avatar.imageUrl}`}
                                    id="radio__icon"
                                    className="avatar__selector"
                                    alt="avatar"
                                />
                            </div>
                            {avatarError && <div className='error_style first__name__error'>{avatarError}</div>}
                        </label>
                    </div>
                ))}
            </div>

        </div>

    )
}
