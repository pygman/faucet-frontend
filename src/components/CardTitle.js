import React from 'react'
import styled from 'styled-components'

const CardTitle = ({ text }) => <StyledCardTitle>{text}</StyledCardTitle>

const StyledCardTitle = styled.div`
    color: ${(props) => props.theme.color.black};
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    padding: 0 20px;
    margin-top: 20px;
    margin-bottom: 4px;
    text-align: left;
`

export default CardTitle
