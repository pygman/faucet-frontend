import React from 'react'
import styled from 'styled-components'

const Card = ({ children, ...rest }) => (
    <StyledCard {...rest}>{children}</StyledCard>
)

const StyledCard = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export default Card
