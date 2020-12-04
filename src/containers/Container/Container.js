import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const Container = ({ children, size = 'md', style, ...rest }) => {
    const { siteWidth } = useContext(ThemeContext)
    let width
    switch (size) {
        case 'sm':
            width = (siteWidth * 326) / 1200
            break
        case 'md':
            width = (siteWidth * 672) / 1200
            break
        case 'lg':
        default:
            width = siteWidth
    }
    return (
        <StyledContainer width={width} style={style} {...rest}>
            {children}
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    max-width: ${(props) => props.width}px;
    padding: 0 0;
    width: 100%;

    .ETH,
    .CKB {
        padding: 0 24px;
        margin-top: 20px;
    }
`

export default Container
