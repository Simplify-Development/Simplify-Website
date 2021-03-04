import React from "react";
import { getUserDetails } from "../../utils/api"

export function ApplicationPage( {
    history,
}) {
    const [user, setUser] = React.useState( null );
    const [loading, setLoading ] = React.useState( true )

    React.useEffect( () => {
        getUserDetails()
        .then( ( { data } ) => {
            setUser( data );
            setLoading(false);
        }).catch( (err) => {
            window.location.href = `http://localhost:${process.env.PORT || 5001}/api/auth/discord`
            setLoading(false);
        })
    }, [])

    return !loading && (
        <h1>Application Page</h1>
    )
}