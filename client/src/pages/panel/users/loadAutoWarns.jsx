import React from 'react';

export function loadAutoWarns(warns, user) {
    if (warns.length <= 0) {
        return (
            <span>No Active Auto Warns</span>
        )
    } else {
        return (
            <ul>
                <h4 className="warn-title">{user.username} has {warns.length} {warns.length == 1 ? 'auto warning' : 'atuo warns'}</h4>
                {
                    warns.map(warn => {
                        return (
                            <li className="warn-li">
                                <span>Punishment ID: <span className="bold">{warn.punishmentId}</span></span>
                                <span>Expiers: {warn.expires}</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}