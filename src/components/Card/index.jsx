import React from 'react';
import Icon from '../Icon';
import ReactCardFlip from 'react-card-flip';
import './style.scss';

class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            isFlipped: false,
            isWide: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isWide: window.innerWidth > 960 });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        const userSkills = [];
        const dev = this.props.dev;
        dev.skills.forEach(skill => {
            userSkills.push(
                <span key={dev.name + skill} className="uk-label uk-margin-right">{skill}</span>
            );
        });
        const profilesConfig = this.props.profilesConfig;
        const userProfiles = [];
        const profiles = dev.profiles;
        let profile, profileConfig;
        for (let profileName in profiles) {
            profile = profiles[profileName];
            profileConfig = profilesConfig[profileName];
            if (profile && profile !== "") {
                userProfiles.push(
                    <li key={profileName + dev.name}>
                        <a target="_blank" href={profileConfig.profileLink || profileConfig.profileLink === '' ? profileConfig.profileLink + profile : "/#"} className="uk-margin-right">
                            <Icon icon={profileConfig.icon} /> {profile}
                        </a>
                    </li>
                );
            }
        }
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection={this.state.isWide? 'vertical' : 'horizontal'}>
                <div className="uk-card uk-card-default uk-grid-collapse" uk-grid="" key="front">
                    <div className="uk-card-media-left uk-cover-container uk-width-1-4@m" onClick={this.handleClick}>
                        <img src={dev.photoURL} alt="" uk-cover="" />
                        <canvas width="600" height="400"></canvas>
                    </div>
                    <div className="uk-card-body uk-width-3-4@m uk-text-left uk-text-top uk-text-justify">
                        <div className="uk-card-badge">
                            <span className="uk-text-primary"><Icon icon="info" className="info-badge" /></span>
                            <div uk-dropdown="bottom-right">
                                <ul className="uk-nav uk-dropdown-nav">
                                    {userProfiles}
                                </ul>
                            </div>
                        </div>
                        <div onClick={this.handleClick}>
                            <div className="uk-card-title">
                                <h3>{dev.name}</h3>
                                <span className="uk-align-center uk-margin-small">{userSkills}</span>
                            </div>
                            <blockquote>
                                <p className="uk-margin-small-bottom">
                                    {dev.content}
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <div className="uk-card uk-card-default uk-grid-collapse" uk-grid="" key="back" onClick={this.handleClick}>
                    <div className="uk-card-media-left uk-cover-container uk-width-1-4@m">
                        <img src={dev.photoURL} alt="" uk-cover="" />
                        <canvas width="600" height="400"></canvas>
                    </div>
                    <div className="uk-card-body uk-width-3-4@m uk-text-left uk-text-top uk-text-justify">
                        <div>
                            <div className="uk-card-title">
                                <h3>THis is back</h3>
                            </div>
                            <blockquote>
                                <p className="uk-margin-small-bottom">
                                    {dev.content}
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </ReactCardFlip>
        );
    }
}

export default Card;