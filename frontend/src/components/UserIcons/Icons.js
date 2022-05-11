import { avatars } from "../../context/Avatar";
import './Icons.css';

export const Icons = ({ avatarId, setAvatarId, avatarError, setAvatarError }) => {

    const updateAvatarId = (e) => {
        setAvatarId(e.target.value);
    };

    return (
        <div className='radio__div'>
            <div className="justify__right__label" >
                <div className="avatar__label">CHOOSE YOUR CHICKEN</div>
                {/* <div>
                    <i className="fa-solid fa-circle-check avatar-check" id={avatarError}></i>
                </div> */}
            </div>
            <div className='icon__loop'>
                {Object.values(avatars).map((avatar, i) => (
                    <div id='radio__jello__div' key={i}>
                        <label>
                            <input
                                type='radio'
                                name='avatarId'
                                onChange={updateAvatarId}
                                value={i + 1}
                            ></input>
                            <img
                                src={`${avatar.imageUrl}`}
                                id="radio__icon"
                                className="avatar__selector"
                                alt="avatar"
                                style={{ backgroundColor: +avatarId === i + 1 ? 'var(--selected-color)' : '' }}
                            />
                        </label>
                    </div>
                ))}
            </div>

        </div>

    )
}
