import React, { useMemo } from 'react'
import styled from 'styled-components'

const SHADOW_ASSET_COLOR = '#FCF0E6'
const ETH_COLOR = '#E7EAFE'
const CKB_COLOR = '#D9E8E2'

const Token = ({ tokenName, logo, className }) => {
    const color = useMemo(() => {
        return ETH_COLOR
    }, [tokenName])

    return (
        <TokenContainer color={color} className={className ?? ''}>
            <span className="icon">
                <img alt={tokenName} src={logo} />
            </span>
            <div className="text">{tokenName}</div>
        </TokenContainer>
    )
}

export const TokenContainer = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon {
        background-color: ${(props) => props.color};
        height: 24px;
        width: 24px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
        img {
            max-width: 18px;
            max-height: 18px;
        }
    }
    &.small {
        .text {
            font-size: 20px;
            line-height: 24px;
            position: relative;
            top: 0;
        }
    }
    .text {
        font-size: 24px;
        font-weight: bold;
        line-height: 29px;
        color: #000000;
        position: relative;
        top: -1.5px;
    }
`

export default Token
