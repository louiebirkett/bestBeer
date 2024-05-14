import FostersImg from '../images/beers/fosters.svg';
import GuinnessImg from '../images/beers/guinness.svg';
import HeinekenImg from '../images/beers/heineken.svg';
import MorettiImg from '../images/beers/moretti.svg';
import StrongbowImg from '../images/beers/strongbow.svg';
import NoImg from '../images/beers/unknown.svg';

function PubInfo({pubObject}) {
    return (
        <div className="pub-info">
            <p className="info-title">{pubObject.name}</p>
            <div className="on-tap">
                <ul>
                    <li>
                        <div className="beer-info">
                            <img src={FostersImg} />
                            <p className="beer-name">Fosters</p>
                            <p className="beer-price">£5</p>
                        </div>
                    </li>
                    <li>
                        <div className="beer-info">
                            <img src={GuinnessImg} />
                            <p className="beer-name">Guinness</p>
                            <p className="beer-price">£5.90</p>
                        </div>
                    </li>
                    <li>
                        <div className="beer-info">
                            <img src={HeinekenImg} />
                            <p className="beer-name">Heineken</p>
                            <p className="beer-price">£5</p>
                        </div>
                    </li>
                    <li>
                        <div className="beer-info">
                            <img src={MorettiImg} />
                            <p className="beer-name">Moretti</p>
                            <p className="beer-price">£6.30</p>
                        </div></li>
                    <li>
                        <div className="beer-info">
                            <img src={StrongbowImg} />
                            <p className="beer-name">Strongbow</p>
                            <p className="beer-price">£5.50</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="extras"></div>
        </div>
    );
}

export default PubInfo;