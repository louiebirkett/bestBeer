import '../styles/styles.css'



function ResultWidget({name, rating, hours, cost, distance}){
    return (
    <div className="resultWrapper">
        <h1 className='resultTitle'>{name}</h1>
        <div className='partition'>
            <svg viewBox="0 0 415 36" fill="none" xmlns="http://www.w3.org/2000/svg"> <line y1="0.5" x2="415" y2="0.5" stroke="white"/> <line x1="270.5" y1="10" x2="270.5" y2="36" stroke="white"/></svg>
        </div>
        <div className='HCDWrapper'> {/* Hours, Cost, Distance*/ }
            <table>
                <tr>
                    <th scope='col'>Hours</th>
                    <th scope='col'>Cost</th>
                    <th scope='col'>Distance</th>
                </tr>
                <tr>
                    <td>{hours}</td>
                    <td>{cost}</td>
                    <td className="bold">{distance}mi</td>
                </tr>
            </table>

            {/* <table>
                <tr>
                    <th scope='col'></th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                </tr>
            </table> */}
        </div>
        <h1 className="resultRating">{rating}</h1>
    </div>
    );
};

export default ResultWidget;