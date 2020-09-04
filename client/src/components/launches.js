import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import LaunchItem from './launchitem'
import MissionKey from './missionkey'
const Launches_query = gql`
     query LaunchesQuery{
         launches {
             flight_number
             mission_name
             launch_date_local
             launch_success
         }
     }
`;

function launches(props) {
    return (
        <>
            <h1 className="display-4 my-3">Launches</h1>
            <MissionKey/>
            <Query query={Launches_query}>
                {
                    ({loading,error,data}) => {
                        if(loading) return <h4>Loading ...</h4>
                        if (error) console.log(error)
                        
                        return <>
                            {
                                data.launches.map(launch => (
                                    <LaunchItem key={launch.flight_number} launch={launch} />
                                ))
                            }
                        </>
                        
                    }
               } 
            </Query>
        </>
    );
}

export default launches;