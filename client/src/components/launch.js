import React from 'react';
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Query } from 'react-apollo';

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number:Int!){
        launch(flight_number:$flight_number){
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local
            rocket{
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }

`

function launch(props) {
    let { flight_number } = props.match.params
    flight_number = parseInt(flight_number)
    console.log(props);
    return (
        <>
            <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>loading...</h4>
                        if (error) return console.log(error);
                        const { mission_name, flight_number, launch_year, launch_success, rocket: {
                            rocket_id,rocket_name,rocket_type
                        } } = data.launch
                        console.log(data);
                        
                        return <div>
                            <h1 className="display-4 my-3">
                                <span className="text-dark">MISSION</span>{" "}
                                {mission_name}
                            </h1>
                            <h4 className="mb-3">LAUNCH_DETAILS</h4>
                            <ul className="list-group">
                                < li className = "list-group-item" >
                                    Flight Number:{flight_number}
                                </li> 
                                <li className = "list-group-item" >
                                    Launch Year:{launch_year}
                                </li> 
                                <li className = "list-group-item" >
                                    Launch Success:
                                    <span className={classNames({
                                        'text-success': launch_success,
                                        'text-danger' :!launch_success
                                    })}>
                                        {launch_success ? "YES" : "NO"}
                                    </span>
                                </li>
                            </ul>
                            <h4 className="my-3">ROCKET DETAILS</h4>
                            <ul className="list-group">
                                < li className="list-group-item" >
                                    ROCKET ID:{rocket_id}
                                </li>
                                < li className="list-group-item" >
                                    ROCKET NAME:{rocket_name}
                                </li>
                                < li className="list-group-item" >
                                    ROCKET TYPE: {rocket_type}
                                </li>
                            </ul>
                            <hr/>
                            <button className="btn btn-secondary">
                                <Link to="/">
                                    BACK
                                </Link>
                            </button>
                        </div>    
                    }
                }    
            </Query>
        </>
    );
}

export default launch;