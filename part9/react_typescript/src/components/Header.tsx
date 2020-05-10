import React from 'react'

const Header: React.FC<{ name: string }> = ({ name }) => {
    return (
        <h2>
            {name}
        </h2>
    )
}
export default Header


