import React from 'react';
import { Link } from 'react-router-dom'

export function loadWarns(warns, user) {
    if (warns.length <= 0) {
        return (
            <span>No Warns</span>
        )
    } else {
        return (
            <ul>
                <h4 className="warn-title">{user.username} has {warns.length} {warns.length == 1 ? 'warning' : 'warns'}</h4>
                {
                    warns.map(warn => {
                        return (
                            <li className="warn-li">
                                <span>Punishment ID: <span className="bold">{warn.punishmentId}</span></span>
                                <span>Moderator: <a onClick={() => window.open(`/panel/users/${warn.moderator}`)}>{warn.moderator}</a></span>
                                <span>Date: {warn.date}</span>
                                <span>Type: <span className="bold">{warn.type}</span></span>
                                <span>Reason: {warn.reason}</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}