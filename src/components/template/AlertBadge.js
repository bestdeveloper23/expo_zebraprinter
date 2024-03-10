import React from 'react'

export const AlertBadge = ({ count }) => {
    return (
        <div
            className={`alertsBadge bg-red-500 ${(count ===
                0 ? 'none' : 'block')}`}
        >
            {count}
        </div>
    )
}
