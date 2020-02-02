import React from 'react';
import Menu from './menu'

export default function Layout({
    title = 'Title',
    description = 'Description',
    className,
    children
}) {
    return (
        <div>
            <Menu />
            <div className="jumbotron" style={{'padding' : '0'}}>
                <h2>{title}</h2>
                {/* <p className="lead">{description}</p> */}
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}
